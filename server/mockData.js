// OmniAnalytics Mock & Initial Data Source (Indian Retail Context in INR ₹)

export const overviewData = {
  kpis: {
    totalRevenue: {
      value: 268490,
      formatted: "₹ 2,68,490",
      growth: "+29,5%",
      lastMonthFormatted: "₹ 2,14,080 last month",
      lastMonthValue: 214080,
      chart: [
        { month: 'Mar', value: 38 },
        { month: 'Apr', value: 48 },
        { month: 'May', value: 42 },
        { month: 'Jun', value: 65 },
        { month: 'Jul', value: 32 },
        { month: 'Aug', value: 55 },
        { month: 'Sep', value: 72 },
        { month: 'Oct', value: 60 },
        { month: 'Nov', value: 92 },
        { month: 'Dec', value: 85 }
      ]
    },
    totalCustomers: {
      value: 9706,
      formatted: "9,706",
      growth: "+32,4%",
      lastMonthFormatted: "819 users last month",
      lastMonthValue: 819,
      breakdown: {
        men: { percentage: 63, count: 6115 },
        women: { percentage: 37, count: 3591 }
      }
    },
    totalOrders: {
      value: 7412,
      formatted: "7,412",
      growth: "+8,9%",
      lastMonthFormatted: "13,590 users last month",
      sparkline: [
        { date: '1 Jul', orders: 120, baseline: 110 },
        { date: '8 Jul', orders: 105, baseline: 108 },
        { date: '16 Jul', orders: 98, baseline: 104 },
        { date: '20 Jul', orders: 155, baseline: 135 },
        { date: '25 Jul', orders: 172, baseline: 148 }
      ]
    }
  },
  lastActivity: [
    {
      id: 1,
      name: 'Rahul Verma',
      action: 'Purchased',
      item: 'Sony WH-1000XM5 Wireless Headphones',
      time: '12m ago',
      initials: 'RV',
      badgeBg: 'bg-purple-100 text-purple-700'
    },
    {
      id: 2,
      name: 'Sneha Kulkarni',
      action: 'Purchased',
      item: 'Heavyweight Cotton Pullover Hoodie',
      time: '25m ago',
      initials: 'SK',
      badgeBg: 'bg-pink-100 text-pink-700'
    },
    {
      id: 3,
      name: 'Rohan Mehta',
      action: 'Purchased',
      item: 'Digital 6-Quart Vortex Air Fryer',
      time: '1h ago',
      initials: 'RM',
      badgeBg: 'bg-blue-100 text-blue-700'
    }
  ],
  topDestinations: [
    { country: 'Maharashtra', code: 'MH', percentage: 42, color: '#6c5ce7' },
    { country: 'Karnataka', code: 'KA', percentage: 28, color: '#6c5ce7' },
    { country: 'Delhi NCR', code: 'DL', percentage: 15, color: '#6c5ce7' },
    { country: 'Tamil Nadu', code: 'TN', percentage: 9, color: '#6c5ce7' },
    { country: 'Telangana', code: 'TS', percentage: 6, color: '#6c5ce7' },
  ],
  salesAnalytics: [
    { date: '12 Nov', label: 'November, 12', sold: 45, returns: 3 },
    { date: '13 Nov', label: 'November, 13', sold: 52, returns: 4 },
    { date: '14 Nov', label: 'November, 14', sold: 68, returns: 2 },
    { date: '15 Nov', label: 'November, 15', sold: 74, returns: 5 },
    { date: '16 Nov', label: 'November, 16', sold: 81, returns: 6 },
    { date: '17 Nov', label: 'November, 17', sold: 63, returns: 3 },
    { date: '18 Nov', label: 'November, 18', sold: 89, returns: 4 }
  ],
  productSales: [
    { id: 1, sku: 'ELEC-101', name: 'Sony WH-1000XM5 Wireless Headphones', category: 'Electronics & Accessories', price: 24999.00, cost: 16500.00, stock: 45, reorderLevel: 20, solds: 140, location: 'Aisle E-01', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&h=150&fit=crop' },
    { id: 2, sku: 'ELEC-102', name: '65W USB-C GaN Fast Charger', category: 'Electronics & Accessories', price: 2499.00, cost: 900.00, stock: 8, reorderLevel: 15, solds: 520, location: 'Aisle E-02', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&h=150&fit=crop' },
    { id: 3, sku: 'ELEC-103', name: 'Mechanical RGB Gaming Keyboard', category: 'Electronics & Accessories', price: 6499.00, cost: 2800.00, stock: 0, reorderLevel: 10, solds: 115, location: 'Aisle E-03', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&h=150&fit=crop' },
    { id: 4, sku: 'ELEC-104', name: 'AMOLED Smartwatch Fitness Tracker', category: 'Electronics & Accessories', price: 8999.00, cost: 3800.00, stock: 42, reorderLevel: 15, solds: 210, location: 'Aisle E-04', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' },
    { id: 5, sku: 'APRL-201', name: 'Heavyweight Cotton Pullover Hoodie', category: 'Apparel & Footwear', price: 2499.00, cost: 850.00, stock: 84, reorderLevel: 25, solds: 430, location: 'Aisle A-01', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=150&h=150&fit=crop' }
  ]
};

export const ordersList = [
  { id: 'ORD-7421', customer: 'Rahul Verma', email: 'rahul.verma@gmail.com', item: 'Sony WH-1000XM5 Headphones', destination: 'Bengaluru, Karnataka', amount: 24999.00, status: 'Delivered', date: '2 hours ago' },
  { id: 'ORD-7420', customer: 'Sneha Kulkarni', email: 'sneha.k@outlook.com', item: 'Cotton Fleece Oversized Hoodie', destination: 'Mumbai, Maharashtra', amount: 2499.00, status: 'Shipped', date: '5 hours ago' },
  { id: 'ORD-7419', customer: 'Rohan Mehta', email: 'rohan.m@gmail.com', item: 'Smart Digital Air Fryer 5.5L', destination: 'Delhi NCR', amount: 6999.00, status: 'Processing', date: 'Today, 11:20 AM' },
  { id: 'ORD-7418', customer: 'Pooja Deshmukh', email: 'pooja.d@yahoo.com', item: 'Organic Vitamin C Radiance Serum', destination: 'Pune, Maharashtra', amount: 899.00, status: 'Delivered', date: 'Yesterday' },
  { id: 'ORD-7417', customer: 'Arjun Nair', email: 'arjun.nair@corp.in', item: 'Pro High-Density Yoga Mat', destination: 'Hyderabad, Telangana', amount: 1999.00, status: 'Delivered', date: 'Yesterday' },
  { id: 'ORD-7416', customer: 'Neha Gupta', email: 'neha.gupta@gmail.com', item: 'Mechanical Gaming Keyboard RGB', destination: 'Chennai, Tamil Nadu', amount: 6499.00, status: 'Shipped', date: '2 days ago' }
];

export const shipmentsList = [
  { trackingId: 'TRK-982143', carrier: 'BlueDart Express', orderId: 'ORD-7421', destination: 'Bengaluru, Karnataka', eta: 'Delivered', status: 'Delivered', progress: 100 },
  { trackingId: 'TRK-982142', carrier: 'Delhivery Air', orderId: 'ORD-7420', destination: 'Mumbai, Maharashtra', eta: 'Tomorrow, 2:00 PM', status: 'In Transit', progress: 75 },
  { trackingId: 'TRK-982141', carrier: 'DTDC Priority', orderId: 'ORD-7419', destination: 'Delhi NCR', eta: 'Nov 20, 2026', status: 'Dispatched', progress: 45 },
  { trackingId: 'TRK-982140', carrier: 'Shadowfax Express', orderId: 'ORD-7418', destination: 'Pune, Maharashtra', eta: 'Delivered', status: 'Delivered', progress: 100 },
  { trackingId: 'TRK-982139', carrier: 'Ekart Logistics', orderId: 'ORD-7417', destination: 'Hyderabad, Telangana', eta: 'Nov 21, 2026', status: 'Processing', progress: 20 },
];
