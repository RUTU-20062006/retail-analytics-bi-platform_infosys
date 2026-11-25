import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext();

export const INITIAL_PRODUCTS = [
  // 1. Electronics & Accessories
  {
    id: 1,
    sku: 'ELEC-101',
    name: 'Wireless Noise-Canceling Earbuds',
    category: 'Electronics & Accessories',
    price: 9999.00,
    cost: 4200.00,
    stock: 65,
    reorderLevel: 20,
    solds: 340,
    location: 'Aisle E-01',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&h=150&fit=crop'
  },
  {
    id: 2,
    sku: 'ELEC-102',
    name: '65W USB-C GaN Fast Charger',
    category: 'Electronics & Accessories',
    price: 2499.00,
    cost: 900.00,
    stock: 8,
    reorderLevel: 15,
    solds: 520,
    location: 'Aisle E-02',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&h=150&fit=crop'
  },
  {
    id: 3,
    sku: 'ELEC-103',
    name: 'Mechanical RGB Gaming Keyboard',
    category: 'Electronics & Accessories',
    price: 6499.00,
    cost: 2800.00,
    stock: 0,
    reorderLevel: 10,
    solds: 115,
    location: 'Aisle E-03',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&h=150&fit=crop'
  },
  {
    id: 4,
    sku: 'ELEC-104',
    name: 'AMOLED Smartwatch Fitness Tracker',
    category: 'Electronics & Accessories',
    price: 8999.00,
    cost: 3800.00,
    stock: 42,
    reorderLevel: 15,
    solds: 210,
    location: 'Aisle E-04',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop'
  },

  // 2. Apparel & Footwear
  {
    id: 5,
    sku: 'APRL-201',
    name: 'Heavyweight Cotton Pullover Hoodie',
    category: 'Apparel & Footwear',
    price: 2499.00,
    cost: 850.00,
    stock: 84,
    reorderLevel: 25,
    solds: 430,
    location: 'Aisle A-01',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=150&h=150&fit=crop'
  },
  {
    id: 6,
    sku: 'APRL-202',
    name: 'Breathable Mesh Running Sneakers',
    category: 'Apparel & Footwear',
    price: 4299.00,
    cost: 1600.00,
    stock: 6,
    reorderLevel: 15,
    solds: 280,
    location: 'Aisle A-02',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop'
  },
  {
    id: 7,
    sku: 'APRL-203',
    name: 'Vintage Canvas Commuter Backpack',
    category: 'Apparel & Footwear',
    price: 1999.00,
    cost: 700.00,
    stock: 32,
    reorderLevel: 15,
    solds: 195,
    location: 'Aisle A-03',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'
  },
  {
    id: 8,
    sku: 'APRL-204',
    name: 'Classic Sherpa Denim Jacket',
    category: 'Apparel & Footwear',
    price: 3999.00,
    cost: 1500.00,
    stock: 0,
    reorderLevel: 10,
    solds: 85,
    location: 'Aisle A-04',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=150&h=150&fit=crop'
  },

  // 3. Home & Kitchen
  {
    id: 9,
    sku: 'HOME-301',
    name: '32oz Insulated Stainless Steel Tumbler',
    category: 'Home & Kitchen',
    price: 1199.00,
    cost: 390.00,
    stock: 110,
    reorderLevel: 30,
    solds: 620,
    location: 'Aisle H-01',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&h=150&fit=crop'
  },
  {
    id: 10,
    sku: 'HOME-302',
    name: 'Digital 6-Quart Vortex Air Fryer',
    category: 'Home & Kitchen',
    price: 6999.00,
    cost: 2900.00,
    stock: 7,
    reorderLevel: 12,
    solds: 165,
    location: 'Aisle H-02',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=150&h=150&fit=crop'
  },
  {
    id: 11,
    sku: 'HOME-303',
    name: 'Artisanal Ceramic Coffee Mugs (Set of 4)',
    category: 'Home & Kitchen',
    price: 1499.00,
    cost: 490.00,
    stock: 45,
    reorderLevel: 15,
    solds: 240,
    location: 'Aisle H-03',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=150&h=150&fit=crop'
  },
  {
    id: 12,
    sku: 'HOME-304',
    name: 'Minimalist Touch LED Desk Lamp',
    category: 'Home & Kitchen',
    price: 1899.00,
    cost: 650.00,
    stock: 28,
    reorderLevel: 10,
    solds: 130,
    location: 'Aisle H-04',
    image: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=150&h=150&fit=crop'
  },

  // 4. Beauty & Personal Care
  {
    id: 13,
    sku: 'BEAU-401',
    name: 'Pure Vitamin C 20% Brightening Serum',
    category: 'Beauty & Personal Care',
    price: 899.00,
    cost: 220.00,
    stock: 95,
    reorderLevel: 25,
    solds: 510,
    location: 'Aisle B-01',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&h=150&fit=crop'
  },
  {
    id: 14,
    sku: 'BEAU-402',
    name: 'Gentle Hydrating Foaming Cleanser',
    category: 'Beauty & Personal Care',
    price: 599.00,
    cost: 150.00,
    stock: 12,
    reorderLevel: 20,
    solds: 380,
    location: 'Aisle B-02',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&h=150&fit=crop'
  },
  {
    id: 15,
    sku: 'BEAU-403',
    name: 'Ceramic Ionic Hair Styling Wand',
    category: 'Beauty & Personal Care',
    price: 3299.00,
    cost: 1100.00,
    stock: 38,
    reorderLevel: 10,
    solds: 145,
    location: 'Aisle B-03',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&h=150&fit=crop'
  },
  {
    id: 16,
    sku: 'BEAU-404',
    name: 'Shea Butter Deep Moisture Body Lotion',
    category: 'Beauty & Personal Care',
    price: 499.00,
    cost: 120.00,
    stock: 70,
    reorderLevel: 20,
    solds: 290,
    location: 'Aisle B-04',
    image: 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=150&h=150&fit=crop'
  },

  // 5. Sports & Fitness
  {
    id: 17,
    sku: 'SPRT-501',
    name: 'Non-Slip Eco Alignment Yoga Mat',
    category: 'Sports & Fitness',
    price: 1999.00,
    cost: 650.00,
    stock: 58,
    reorderLevel: 20,
    solds: 410,
    location: 'Aisle S-01',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=150&h=150&fit=crop'
  },
  {
    id: 18,
    sku: 'SPRT-502',
    name: 'Heavy-Duty Resistance Loop Bands (Set of 5)',
    category: 'Sports & Fitness',
    price: 899.00,
    cost: 200.00,
    stock: 14,
    reorderLevel: 25,
    solds: 680,
    location: 'Aisle S-02',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=150&h=150&fit=crop'
  },
  {
    id: 19,
    sku: 'SPRT-503',
    name: '40oz Wide-Mouth Insulated Chug Bottle',
    category: 'Sports & Fitness',
    price: 1299.00,
    cost: 400.00,
    stock: 52,
    reorderLevel: 15,
    solds: 310,
    location: 'Aisle S-03',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150&h=150&fit=crop'
  },
  {
    id: 20,
    sku: 'SPRT-504',
    name: 'Water-Resistant Gym & Travel Duffle',
    category: 'Sports & Fitness',
    price: 2499.00,
    cost: 850.00,
    stock: 0,
    reorderLevel: 12,
    solds: 95,
    location: 'Aisle S-04',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'
  }
];

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('omni_retail_catalog_inr_v3');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Fetch from backend API if active on mount
  useEffect(() => {
    async function loadFromBackend() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
          }
        }
      } catch {
        // Backend offline, fallback to local state
      }
    }
    loadFromBackend();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('omni_retail_catalog_inr_v3', JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [products]);

  // Determine stock availability state
  const getProductStatus = (item) => {
    if (item.stock === 0) return 'Out of Stock';
    if (item.stock <= (item.reorderLevel || 15)) return 'Low Stock';
    return 'In Stock';
  };

  // Add Product (Admin Action) - instantly recalculates entire dashboard & syncs with backend
  const addProduct = (newProduct) => {
    const itemWithId = {
      id: Date.now(),
      sku: newProduct.sku ? newProduct.sku.trim().toUpperCase() : `SKU-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      name: newProduct.name,
      category: newProduct.category || 'Electronics & Accessories',
      price: parseFloat(newProduct.price) || 0,
      cost: parseFloat(newProduct.cost) || Math.round((parseFloat(newProduct.price) || 0) * 0.4),
      stock: parseInt(newProduct.stock, 10) || 0,
      reorderLevel: parseInt(newProduct.reorderLevel, 10) || 15,
      solds: parseInt(newProduct.solds, 10) || 0,
      location: newProduct.location || 'Aisle E-01',
      image: newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop'
    };

    setProducts(prev => [itemWithId, ...prev]);

    // Async sync with backend API
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemWithId)
    }).catch(() => {});

    return itemWithId;
  };

  // Edit Product (Admin Action)
  const editProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : item.price,
            cost: updatedFields.cost !== undefined ? parseFloat(updatedFields.cost) : item.cost,
            stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : item.stock,
            reorderLevel: updatedFields.reorderLevel !== undefined ? parseInt(updatedFields.reorderLevel, 10) : item.reorderLevel,
          };

          // Async sync with backend API
          fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
          }).catch(() => {});

          return updated;
        }
        return item;
      })
    );
  };

  // Delete Product (Admin Action)
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(item => item.id !== id));

    // Async sync with backend API
    fetch(`/api/products/${id}`, {
      method: 'DELETE'
    }).catch(() => {});
  };

  // Adjust stock on the fly (+ or -)
  const adjustStock = (id, delta) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          return { ...item, stock: newStock };
        }
        return item;
      })
    );

    // Async sync with backend API
    fetch(`/api/products/${id}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta })
    }).catch(() => {});
  };

  // Reset to the standard 20 product catalog
  const resetToSampleProducts = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  // --- Dynamic Dashboard Metrics Computed Directly from Catalog ---
  const totalSKUs = products.length;
  const totalStockUnits = products.reduce((acc, curr) => acc + curr.stock, 0);
  const totalValuation = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const totalRevenue = products.reduce((acc, curr) => acc + (curr.price * curr.solds), 0);
  const totalCost = products.reduce((acc, curr) => acc + (curr.cost * curr.solds), 0);
  const grossMarginPct = totalRevenue > 0 ? (((totalRevenue - totalCost) / totalRevenue) * 100).toFixed(1) : '0.0';

  const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= (p.reorderLevel || 15));
  const outOfStockItems = products.filter(p => p.stock === 0);
  const healthyStockItems = products.filter(p => p.stock > (p.reorderLevel || 15));

  // Category insights computed live
  const categorySummary = [
    'Electronics & Accessories',
    'Apparel & Footwear',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Sports & Fitness'
  ].map(cat => {
    const items = products.filter(p => p.category === cat);
    const catSales = items.reduce((acc, curr) => acc + curr.solds, 0);
    const catRevenue = items.reduce((acc, curr) => acc + (curr.price * curr.solds), 0);
    const catCost = items.reduce((acc, curr) => acc + (curr.cost * curr.solds), 0);
    const margin = catRevenue > 0 ? Math.round(((catRevenue - catCost) / catRevenue) * 100) : 55;
    return {
      name: cat,
      itemCount: items.length,
      sales: catSales,
      revenue: catRevenue,
      margin: margin,
      lowCount: items.filter(p => p.stock > 0 && p.stock <= (p.reorderLevel || 15)).length,
      outCount: items.filter(p => p.stock === 0).length,
    };
  });

  return (
    <InventoryContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        adjustStock,
        resetToSampleProducts,
        getProductStatus,
        totalSKUs,
        totalStockUnits,
        totalValuation,
        totalRevenue,
        grossMarginPct,
        categorySummary,
        lowStockItems,
        lowStockCount: lowStockItems.length,
        outOfStockItems,
        outOfStockCount: outOfStockItems.length,
        healthyStockCount: healthyStockItems.length
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
