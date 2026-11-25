import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import dns from 'dns';
import { fileURLToPath } from 'url';

dotenv.config();

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

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Configuration options
const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432', 10),
      database: process.env.PGDATABASE || 'omnianalytics',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      connectionTimeoutMillis: 5000,
    };

export const pool = new Pool(connectionConfig);

let isPostgresConnected = false;
let connectionError = null;

// Initial connection test
export async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    client.release();
    isPostgresConnected = true;
    connectionError = null;
    console.log('✅ [OmniAnalytics] Successfully connected to PostgreSQL Database!');
    console.log(`📦 Server Time: ${result.rows[0].current_time}`);
    return true;
  } catch (err) {
    isPostgresConnected = false;
    connectionError = err.message;
    console.warn('⚠️ [OmniAnalytics] PostgreSQL not detected or connection failed.');
    console.warn(`👉 Details: ${err.message}`);
    console.info('💡 Note: Operating in high-fidelity mock/fallback mode so your website works right away.');
    console.info('💡 Follow the PostgreSQL Setup Guide in the documentation to link your local or cloud database.');
    return false;
  }
}

export function getDbStatus() {
  return {
    connected: isPostgresConnected,
    type: isPostgresConnected ? 'PostgreSQL' : 'In-Memory / Live Fallback',
    database: process.env.PGDATABASE || 'omnianalytics',
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    error: connectionError
  };
}

export async function query(text, params) {
  if (!isPostgresConnected) {
    return null;
  }
  return pool.query(text, params);
}
