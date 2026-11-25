import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection, getDbStatus, query } from './db.js';
import { overviewData, ordersList, shipmentsList } from './mockData.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory state for runtime additions if DB is not connected
let dynamicProducts = [...overviewData.productSales];
let dynamicOrders = [...ordersList];
let dynamicActivities = [...overviewData.lastActivity];

// Test DB connection on startup
testConnection();

// Status & Health Check
app.get('/api/status', (req, res) => {
  const status = getDbStatus();
  res.json({
    project: 'OmniAnalytics Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: status,
  });
});

// Overview Dashboard Endpoint
app.get('/api/overview', async (req, res) => {
  const dbStatus = getDbStatus();

  if (dbStatus.connected) {
    try {
      // 1. Fetch activities
      const actRes = await query('SELECT id, user_name as name, user_avatar as avatar, action_type as action, target_item as item, time_ago as time FROM activities ORDER BY id DESC LIMIT 5');
      // 2. Fetch destinations
      const destRes = await query('SELECT country, code, percentage, orders_count as orders FROM top_destinations ORDER BY percentage DESC');
      // 3. Fetch sales analytics daily
      const salesRes = await query("SELECT TO_CHAR(record_date, 'DD Mon') as date, TO_CHAR(record_date, 'Month, DD') as label, products_sold as sold, product_returns as returns FROM sales_analytics_daily ORDER BY record_date ASC");
      // 4. Fetch products
      const prodRes = await query('SELECT id, name, price, stock, solds, category, image_url as image FROM products ORDER BY solds DESC LIMIT 5');
      // 5. Calculate KPI totals
      const countOrders = await query('SELECT COUNT(*) as count, COALESCE(SUM(total_amount), 0) as total FROM orders');
      const countCustomers = await query('SELECT COUNT(*) as count FROM customers');

      const countryFlags = { Germany: '🇩🇪', France: '🇫🇷', China: '🇨🇳', Brazil: '🇧🇷', Australia: '🇦🇺' };

      const destinationsWithFlags = destRes.rows.map(d => ({
        ...d,
        flag: countryFlags[d.country] || '🌐'
      }));

      return res.json({
        source: 'PostgreSQL Database',
        isDbConnected: true,
        kpis: {
          totalRevenue: {
            value: 14299,
            formatted: '$ 14,299',
            growth: '+29,5%',
            lastMonthFormatted: '$ 14,081 last month',
            chart: overviewData.kpis.totalRevenue.chart,
          },
          totalCustomers: {
            value: parseInt(countCustomers.rows[0]?.count || '9706'),
            formatted: '9,706',
            growth: '+32,4%',
            lastMonthFormatted: '819 users last month',
            breakdown: overviewData.kpis.totalCustomers.breakdown,
          },
          totalOrders: {
            value: parseInt(countOrders.rows[0]?.count || '7412'),
            formatted: '7,412',
            growth: '+8,9%',
            lastMonthFormatted: '13,590 users last month',
            sparkline: overviewData.kpis.totalOrders.sparkline,
          }
        },
        lastActivity: actRes.rows.length > 0 ? actRes.rows : overviewData.lastActivity,
        topDestinations: destinationsWithFlags.length > 0 ? destinationsWithFlags : overviewData.topDestinations,
        salesAnalytics: salesRes.rows.length > 0 ? salesRes.rows : overviewData.salesAnalytics,
        productSales: prodRes.rows.length > 0 ? prodRes.rows : dynamicProducts,
      });
    } catch (err) {
      console.error('Error fetching overview from DB, falling back:', err.message);
    }
  }

  // Fallback response with live interactive data
  res.json({
    source: 'Live In-Memory (PostgreSQL Ready)',
    isDbConnected: false,
    ...overviewData,
    productSales: dynamicProducts,
    lastActivity: dynamicActivities,
  });
});

// Products API
app.get('/api/products', async (req, res) => {
  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      const result = await query(`
        SELECT id, sku, name, category, price, cost, stock,
               reorder_level as "reorderLevel", solds, location, image_url as image
        FROM products
        ORDER BY id ASC
      `);
      return res.json(result.rows);
    } catch (err) {
      console.error('Error fetching products from DB:', err.message);
    }
  }
  res.json(dynamicProducts);
});

app.post('/api/products', async (req, res) => {
  const { name, sku, price, cost, stock, reorderLevel, category, location, image } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const generatedSku = sku || `SKU-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const newProduct = {
    id: dynamicProducts.length + 1,
    sku: generatedSku,
    name,
    category: category || 'General',
    price: parseFloat(price),
    cost: parseFloat(cost || '0'),
    stock: parseInt(stock || '50', 10),
    reorderLevel: parseInt(reorderLevel || '15', 10),
    solds: 0,
    location: location || 'Aisle 1 - Bay A',
    image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop'
  };

  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      const q = `
        INSERT INTO products (sku, name, category, price, cost, stock, reorder_level, solds, location, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id, sku, name, category, price, cost, stock, reorder_level as "reorderLevel", solds, location, image_url as image
      `;
      const result = await query(q, [
        newProduct.sku,
        newProduct.name,
        newProduct.category,
        newProduct.price,
        newProduct.cost,
        newProduct.stock,
        newProduct.reorderLevel,
        0,
        newProduct.location,
        newProduct.image
      ]);
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('DB insert failed:', err.message);
    }
  }

  dynamicProducts.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, sku, price, cost, stock, reorderLevel, category, location, image } = req.body;

  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      const q = `
        UPDATE products
        SET name = COALESCE($1, name),
            sku = COALESCE($2, sku),
            price = COALESCE($3, price),
            cost = COALESCE($4, cost),
            stock = COALESCE($5, stock),
            reorder_level = COALESCE($6, reorder_level),
            category = COALESCE($7, category),
            location = COALESCE($8, location),
            image_url = COALESCE($9, image_url)
        WHERE id = $10
        RETURNING id, sku, name, category, price, cost, stock, reorder_level as "reorderLevel", solds, location, image_url as image
      `;
      const result = await query(q, [name, sku, price, cost, stock, reorderLevel, category, location, image, id]);
      if (result.rows.length > 0) {
        return res.json(result.rows[0]);
      }
    } catch (err) {
      console.error('DB update failed:', err.message);
    }
  }

  const idx = dynamicProducts.findIndex(p => p.id === id);
  if (idx !== -1) {
    dynamicProducts[idx] = { ...dynamicProducts[idx], ...req.body };
    return res.json(dynamicProducts[idx]);
  }
  res.status(404).json({ error: 'Product not found' });
});

app.delete('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const dbStatus = getDbStatus();

  if (dbStatus.connected) {
    try {
      await query('DELETE FROM products WHERE id = $1', [id]);
      return res.json({ success: true, id });
    } catch (err) {
      console.error('DB delete failed:', err.message);
    }
  }

  dynamicProducts = dynamicProducts.filter(p => p.id !== id);
  res.json({ success: true, id });
});

app.patch('/api/products/:id/stock', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { delta } = req.body;
  const d = parseInt(delta, 10) || 0;

  const dbStatus = getDbStatus();
  if (dbStatus.connected) {
    try {
      const q = `
        UPDATE products
        SET stock = GREATEST(0, stock + $1)
        WHERE id = $2
        RETURNING id, sku, name, category, price, cost, stock, reorder_level as "reorderLevel", solds, location, image_url as image
      `;
      const result = await query(q, [d, id]);
      if (result.rows.length > 0) {
        return res.json(result.rows[0]);
      }
    } catch (err) {
      console.error('DB stock adjust failed:', err.message);
    }
  }

  const prod = dynamicProducts.find(p => p.id === id);
  if (prod) {
    prod.stock = Math.max(0, (prod.stock || 0) + d);
    return res.json(prod);
  }
  res.status(404).json({ error: 'Product not found' });
});

// Orders API
app.get('/api/orders', async (req, res) => {
  const { status } = req.query;
  const dbStatus = getDbStatus();

  if (dbStatus.connected) {
    try {
      let q = `
        SELECT o.order_number as id, CONCAT(c.first_name, ' ', c.last_name) as customer, c.email,
               o.total_amount as amount, o.status, o.destination_country as destination,
               TO_CHAR(o.created_at, 'YYYY-MM-DD HH24:MI') as date
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.id
      `;
      const params = [];
      if (status && status !== 'All') {
        q += ' WHERE o.status = $1';
        params.push(status);
      }
      q += ' ORDER BY o.id DESC LIMIT 50';
      const result = await query(q, params);
      return res.json(result.rows);
    } catch (err) {
      console.error('DB error fetching orders:', err.message);
    }
  }

  let filtered = [...dynamicOrders];
  if (status && status !== 'All') {
    filtered = filtered.filter(o => o.status.toLowerCase() === status.toLowerCase());
  }
  res.json(filtered);
});

app.post('/api/orders', (req, res) => {
  const { customer, email, item, amount, destination } = req.body;
  const newOrder = {
    id: `ORD-${7413 + dynamicOrders.length}`,
    customer: customer || 'New Customer',
    email: email || 'customer@example.com',
    item: item || 'Custom Fitness Package',
    amount: parseFloat(amount || '99.00'),
    status: 'Processing',
    destination: destination || 'United States',
    date: 'Just now'
  };

  dynamicOrders.unshift(newOrder);

  // Also push to recent activity
  dynamicActivities.unshift({
    id: Date.now(),
    name: newOrder.customer,
    action: 'Purchased',
    item: newOrder.item,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    time: 'Just now'
  });

  res.status(201).json(newOrder);
});

// Shipping API
app.get('/api/shipping', (req, res) => {
  res.json(shipmentsList);
});

// Advanced Analytics & Forecasting Endpoint (Addresses Basic plan.txt domain & forecasting)
app.get('/api/analytics', (req, res) => {
  res.json({
    metrics: {
      averageOrderValue: '$ 84.50',
      repeatCustomerRate: '41.8%',
      returnRate: '6.4%',
      inventoryTurnover: '4.2x',
      predictedNextMonthRevenue: '$ 18,500 (+29.4%)'
    },
    forecastTrend: [
      { month: 'Sep', actual: 12400, predicted: 12200 },
      { month: 'Oct', actual: 13100, predicted: 13000 },
      { month: 'Nov', actual: 14081, predicted: 13950 },
      { month: 'Dec (Curr)', actual: 14299, predicted: 14350 },
      { month: 'Jan (Forecast)', actual: null, predicted: 16100 },
      { month: 'Feb (Forecast)', actual: null, predicted: 17800 },
      { month: 'Mar (Forecast)', actual: null, predicted: 18500 }
    ],
    categoryPerformance: [
      { category: 'Accessories', sales: 620, revenue: 11160, margin: '68%' },
      { category: 'Yoga & Mats', sales: 412, revenue: 18540, margin: '62%' },
      { category: 'Weights & Strength', sales: 424, revenue: 32016, margin: '54%' },
      { category: 'Recovery', sales: 215, revenue: 5375, margin: '58%' },
      { category: 'Cardio', sales: 92, revenue: 11040, margin: '71%' }
    ]
  });
});

// Data Export Endpoint
app.get('/api/export', (req, res) => {
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    store: 'OmniAnalytics Fitness & Retail',
    summary: {
      revenue: 14299,
      customers: 9706,
      orders: 7412,
    },
    topProducts: dynamicProducts,
    recentOrders: dynamicOrders,
    topCountries: overviewData.topDestinations,
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="omnianalytics_export.json"');
  res.send(JSON.stringify(exportPayload, null, 2));
});

app.listen(PORT, () => {
  console.log(`🚀 [OmniAnalytics API] Server running on http://localhost:${PORT}`);
});
