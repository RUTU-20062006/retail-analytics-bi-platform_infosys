import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Search, MapPin, AlertTriangle, CheckCircle2, XCircle, RefreshCw, Filter, Layers, Bell } from 'lucide-react';

export default function StockCheckView() {
  const { products, getProductStatus, lowStockCount, outOfStockCount } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [flaggedItems, setFlaggedItems] = useState({});

  const categories = [
    'All',
    'Electronics & Accessories',
    'Apparel & Footwear',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Sports & Fitness'
  ];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredProducts = products.filter((item) => {
    const status = getProductStatus(item);
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleFlagRestock = (id, name) => {
    setFlaggedItems(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: 'In Stock'
        };
      case 'Low Stock':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500 animate-pulse',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
          label: 'Low Stock • Reorder Alert'
        };
      case 'Out of Stock':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: 'Out of Stock'
        };
      default:
        return {
          bg: 'bg-gray-100 text-gray-800 border-gray-200',
          dot: 'bg-gray-400',
          icon: null,
          label: status
        };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Employee Operational Banner */}
      <div className="bg-linear-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-blue-950/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-2.5">
            <Layers className="w-3.5 h-3.5 text-blue-300" />
            <span>Employee Mode • Real-Time Stock & Floor Inventory Lookup</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Store Availability & Shelf Locator
          </h2>
          <p className="text-blue-200/80 text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
            Quickly check stock availability for retail shoppers, verify shelf locations, and notify the warehouse for low-stock reorders.
          </p>
        </div>

        {/* Quick KPI summary pills */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => setStatusFilter('Low Stock')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-3.5 text-center border border-white/15 min-w-[110px] cursor-pointer transition"
          >
            <span className="text-[11px] text-amber-300 block font-bold">Low Stock</span>
            <span className="text-2xl font-black text-amber-300">{lowStockCount}</span>
          </div>
          <div
            onClick={() => setStatusFilter('Out of Stock')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-3.5 text-center border border-white/15 min-w-[110px] cursor-pointer transition"
          >
            <span className="text-[11px] text-rose-300 block font-bold">Out of Stock</span>
            <span className="text-2xl font-black text-rose-300">{outOfStockCount}</span>
          </div>
        </div>
      </div>

      {/* Main Stock Check Controls */}
      <div className="bg-[#f5f7fc] rounded-[26px] p-5 sm:p-6">
        {/* Search & Top Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, SKU (e.g. SKU-YOG-001), or Aisle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full text-xs font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <span>Showing {filteredProducts.length} items</span>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3">
          <span className="text-xs font-bold text-gray-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#18181b] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-gray-200/50">
          <span className="text-xs font-bold text-gray-400 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#6c5ce7] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid or Empty State */}
        {products.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-gray-100 p-8">
            <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Store Inventory is Empty
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mb-3 leading-relaxed">
              Tables have been kept empty for Milestone 1. Once the Administrator adds products to the catalog, stock availability counts, shelf locations, and reorder alerts will appear here for store associates.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs font-medium">
            No matching items found for the current search/filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((p) => {
              const status = getProductStatus(p);
              const badge = getStatusBadge(status);
              const isFlagged = flaggedItems[p.id];

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    {/* Top info & SKU */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                        {p.sku}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
                      >
                        {badge.icon}
                        {badge.label}
                      </span>
                    </div>

                    {/* Thumbnail & Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-50 border border-gray-100"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wide">
                          {p.category}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {p.name}
                        </h4>
                        <div className="text-xs font-extrabold text-gray-700 mt-0.5">
                          ₹{parseFloat(p.price).toLocaleString('en-IN')} retail
                        </div>
                      </div>
                    </div>

                    {/* Stock Metrics and Floor Location */}
                    <div className="p-3 rounded-xl bg-[#f8f9fc] border border-gray-100 space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">On-Hand Stock:</span>
                        <span className={`text-sm font-extrabold ${
                          p.stock === 0
                            ? 'text-rose-600'
                            : p.stock <= (p.reorderLevel || 15)
                            ? 'text-amber-600'
                            : 'text-emerald-700'
                        }`}>
                          {p.stock} units
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">Reorder Threshold:</span>
                        <span className="text-gray-700 font-bold">{p.reorderLevel || 15} units</span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/40">
                        <span className="text-gray-500 font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-purple-600" />
                          Shelf Location:
                        </span>
                        <span className="text-gray-900 font-bold font-mono text-[11px]">
                          {p.location || 'Aisle 1 - Bay A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Employee Action: Flag for restock */}
                  <div className="pt-2">
                    {status !== 'In Stock' && (
                      <button
                        onClick={() => handleFlagRestock(p.id, p.name)}
                        disabled={isFlagged}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isFlagged
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                        }`}
                      >
                        {isFlagged ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Restock Request Sent</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-3.5 h-3.5" />
                            <span>Flag for Warehouse Restock</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
