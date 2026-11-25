import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Ensure resilient DNS resolution for cloud PostgreSQL hosts (e.g. Neon, Supabase)
const { Resolver } = dns;
const publicResolver = new Resolver();
publicResolver.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
const originalLookup = dns.lookup;
dns.lookup = function(hostname, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  if (hostname && (hostname.includes('neon.tech') || hostname.includes('supabase.co'))) {
    publicResolver.resolve4(hostname, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return originalLookup(hostname, options, callback);
      }
      if (options && options.all) {
        return callback(null, addresses.map(ip => ({ address: ip, family: 4 })));
      }
      callback(null, addresses[0], 4);
    });
  } else {
    originalLookup(hostname, options, callback);
  }
};

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbName = process.env.PGDATABASE || 'omnianalytics';
const user = process.env.PGUSER || 'postgres';
const password = process.env.PGPASSWORD || 'postgres';
const host = process.env.PGHOST || 'localhost';
const port = parseInt(process.env.PGPORT || '5432', 10);

async function init() {
  console.log('🔄 Initializing OmniAnalytics Database...');

  const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
  const seedPath = path.resolve(__dirname, '../../database/seed.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const seedSql = fs.readFileSync(seedPath, 'utf8');

  // If a cloud DATABASE_URL is provided, connect directly to it
  if (process.env.DATABASE_URL) {
    console.log('Connecting via DATABASE_URL...');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    });

    try {
      await client.connect();
      console.log('Connected to PostgreSQL database!');

      console.log('Applying schema.sql...');
      await client.query(schemaSql);
      console.log('✅ Tables created successfully!');

      console.log('Applying seed.sql...');
      await client.query(seedSql);
      console.log('✅ Seed data inserted successfully!');

      console.log('\n🎉 Cloud Database setup complete! OmniAnalytics is ready with live relational data.');
      await client.end();
      return;
    } catch (err) {
      console.error('❌ Error executing schema or seed on cloud database:', err.message);
      await client.end();
      process.exit(1);
    }
  }

  // Local PostgreSQL flow
  console.log(`Connecting to local PostgreSQL host=${host}:${port} as user=${user}...`);

  // First connect to default 'postgres' database to ensure omnianalytics database exists
  const rootClient = new Client({
    host,
    port,
    database: 'postgres',
    user,
    password,
    connectionTimeoutMillis: 5000,
  });

  try {
    await rootClient.connect();
    console.log('Connected to PostgreSQL root server.');

    const checkDb = await rootClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb.rowCount === 0) {
      console.log(`Creating database "${dbName}"...`);
      await rootClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully!`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }

    await rootClient.end();
  } catch (err) {
    console.error('❌ Could not connect to default PostgreSQL database:');
    console.error(err.message);
    console.log('\nMake sure:');
    console.log('1. PostgreSQL service is started.');
    console.log('2. Password in server/.env matches your PostgreSQL superuser password.');
    console.log('3. Port 5432 is accessible.\n');
    process.exit(1);
  }

  // Now connect to omnianalytics and run schema.sql + seed.sql
  const targetClient = new Client({
    host,
    port,
    database: dbName,
    user,
    password,
  });

  try {
    await targetClient.connect();
    console.log(`Connected to target database "${dbName}".`);

    console.log(`Applying schema from: ${schemaPath}`);
    await targetClient.query(schemaSql);
    console.log('✅ Tables created successfully!');

    console.log(`Applying seed data from: ${seedPath}`);
    await targetClient.query(seedSql);
    console.log('✅ Seed data inserted successfully!');

    console.log('\n🎉 Database setup complete! OmniAnalytics is ready with full relational data.');
    await targetClient.end();
  } catch (err) {
    console.error('❌ Error executing schema or seed scripts:', err.message);
    await targetClient.end();
    process.exit(1);
  }
}

init();
