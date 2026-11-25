import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';

const defaultSampleOrders = [
  { id: 'ORD-7421', customer: 'Rahul Verma', email: 'rahul.verma@gmail.com', item: 'Sony WH-1000XM5 Headphones', destination: 'Bengaluru, Karnataka', amount: 24999, status: 'Delivered', date: '2 hours ago' },
  { id: 'ORD-7420', customer: 'Sneha Kulkarni', email: 'sneha.k@outlook.com', item: 'Cotton Fleece Oversized Hoodie', destination: 'Mumbai, Maharashtra', amount: 2499, status: 'Shipped', date: '5 hours ago' },
  { id: 'ORD-7419', customer: 'Rohan Mehta', email: 'rohan.m@gmail.com', item: 'Smart Digital Air Fryer 5.5L', destination: 'Delhi NCR', amount: 6499, status: 'Processing', date: 'Today, 11:20 AM' },
  { id: 'ORD-7418', customer: 'Pooja Deshmukh', email: 'pooja.d@yahoo.com', item: 'Organic Vitamin C Radiance Serum', destination: 'Pune, Maharashtra', amount: 899, status: 'Delivered', date: 'Yesterday' },
  { id: 'ORD-7417', customer: 'Arjun Nair', email: 'arjun.nair@corp.in', item: 'Pro High-Density Yoga Mat', destination: 'Hyderabad, Telangana', amount: 1499, status: 'Delivered', date: 'Yesterday' },
  { id: 'ORD-7416', customer: 'Neha Gupta', email: 'neha.g@gmail.com', item: 'Mechanical Gaming Keyboard RGB', destination: 'Chennai, Tamil Nadu', amount: 3999, status: 'Shipped', date: '2 days ago' },
  { id: 'ORD-7415', customer: 'Aditya Rao', email: 'aditya.rao@tech.com', item: 'Stainless Steel Insulated Tumbler', destination: 'Bengaluru, Karnataka', amount: 1199, status: 'Delivered', date: '3 days ago' },
  { id: 'ORD-7414', customer: 'Kavita Joshi', email: 'kavita.j@gmail.com', item: 'Ultra Running Lightweight Sneakers', destination: 'Ahmedabad, Gujarat', amount: 4299, status: 'Returned', date: '4 days ago' }
];

export default function OrdersView({
  orders = [],
  onOpenNewOrderModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const displayOrders = orders && orders.length > 0 ? orders : defaultSampleOrders;

  const filteredOrders = displayOrders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || o.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'returned':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-[#f5f7fc] rounded-[26px] p-6 animate-fade-in">
      {/* Top Bar: Search, Filters, and Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Order Management</h2>
          <p className="text-xs text-gray-400 font-medium">
            Total of {displayOrders.length} active and completed orders recorded
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search order ID, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white rounded-full text-xs font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 w-56 sm:w-64"
            />
          </div>

          {/* New Order Button */}
          <button
            onClick={onOpenNewOrderModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#18181b] hover:bg-black text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* Status Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 border-b border-gray-200/50">
        {['All', 'Delivered', 'Shipped', 'Processing', 'Returned'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              statusFilter === status
                ? 'bg-[#6c5ce7] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-400 font-semibold border-b border-gray-200/40">
              <th className="py-3 px-3">Order ID</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Item</th>
              <th className="py-3 px-3">Destination</th>
              <th className="py-3 px-3 text-right">Amount</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/30">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-white/60 transition group">
                <td className="py-3 px-3 font-bold text-gray-900">{order.id}</td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-gray-900">{order.customer}</div>
                  <div className="text-[11px] text-gray-400">{order.email}</div>
                </td>
                <td className="py-3 px-3 text-gray-700 font-medium">{order.item}</td>
                <td className="py-3 px-3 text-gray-600">{order.destination}</td>
                <td className="py-3 px-3 text-right font-bold text-gray-900">
                  ₹{parseFloat(order.amount).toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-gray-400 font-medium">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-xs font-medium">
            No matching orders found.
          </div>
        )}
      </div>
    </div>
  );
}
