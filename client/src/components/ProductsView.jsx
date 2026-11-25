import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Package, AlertTriangle, CheckCircle2, XCircle, IndianRupee, Edit, Trash2, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import EditProductModal from './EditProductModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function ProductsView({ onOpenNewProductModal }) {
  const {
    products,
    editProduct,
    deleteProduct,
    adjustStock,
    getProductStatus,
    totalValuation,
    lowStockCount,
    outOfStockCount
  } = useInventory();
  const { isAdmin } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals state
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const categories = [
    'All',
    'Electronics & Accessories',
    'Apparel & Footwear',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Sports & Fitness'
  ];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredProducts = products.filter((p) => {
    const status = getProductStatus(p);
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Low Stock':
        return 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse';
      case 'Out of Stock':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Inventory Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#f5f7fc] rounded-[24px] p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500">Active SKUs</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">{products.length} Products</div>
            <p className="text-[11px] text-gray-400 mt-0.5">Across 5 retail verticals</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#f5f7fc] rounded-[24px] p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500">Inventory Valuation</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ₹{totalValuation.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Retail value on hand</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={() => setSelectedStatus(selectedStatus === 'Low Stock' ? 'All' : 'Low Stock')}
          className="bg-[#f5f7fc] hover:bg-amber-50/50 rounded-[24px] p-5 flex items-center justify-between cursor-pointer transition border border-transparent hover:border-amber-200"
        >
          <div>
            <span className="text-xs font-semibold text-gray-500">Low Stock Alert</span>
            <div className="text-2xl font-bold text-amber-700 mt-1">{lowStockCount} Items</div>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">Needs reordering</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={() => setSelectedStatus(selectedStatus === 'Out of Stock' ? 'All' : 'Out of Stock')}
          className="bg-[#f5f7fc] hover:bg-rose-50/50 rounded-[24px] p-5 flex items-center justify-between cursor-pointer transition border border-transparent hover:border-rose-200"
        >
          <div>
            <span className="text-xs font-semibold text-gray-500">Out of Stock</span>
            <div className="text-2xl font-bold text-rose-700 mt-1">{outOfStockCount} Items</div>
            <p className="text-[11px] text-rose-600 font-medium mt-0.5">Urgent restock needed</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="bg-[#f5f7fc] rounded-[26px] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>Catalog & Inventory Control</span>
              {isAdmin && (
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                  Admin Full Control
                </span>
              )}
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Manage product pricing, SKU codes, shelf locations, and adjust stock counts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search product or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white rounded-full text-xs font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 w-52 shadow-xs"
            />
            {isAdmin && (
              <button
                onClick={onOpenNewProductModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#18181b] hover:bg-black text-white text-xs font-semibold shadow-sm transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-2 mb-6">
          {/* Status filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-bold text-gray-400 mr-1">Status:</span>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-full font-bold transition cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-[#18181b] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200/50 text-xs">
            <span className="font-bold text-gray-400 mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6c5ce7] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {products.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-gray-100 p-8">
            <div className="w-14 h-14 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Product Catalog is Empty
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mb-5 leading-relaxed">
              Tables have been kept clean for Milestone 1 so you can show live progress. Click the button below to register your first product SKU with price, stock, and reorder levels.
            </p>
            {isAdmin && (
              <button
                onClick={onOpenNewProductModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181b] hover:bg-black text-white text-xs font-bold shadow-md transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Item</span>
              </button>
            )}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs font-medium">
            No matching items found for the current search/filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((p) => {
              const status = getProductStatus(p);
              const statusClass = getStatusBadge(status);

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition group"
                >
                  <div>
                    {/* Top Bar: SKU and Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                        {p.sku}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${statusClass}`}>
                        {status}
                      </span>
                    </div>

                    {/* Image and Title */}
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-50 border border-gray-100"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                          {p.category}
                        </span>
                        <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-purple-700 transition">
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-xs">
                          <span className="font-extrabold text-gray-900">
                            ₹{parseFloat(p.price).toLocaleString('en-IN')}
                          </span>
                          {p.cost !== undefined && (
                            <span className="text-[11px] text-gray-400 font-medium">
                              (Cost: ₹{parseFloat(p.cost).toLocaleString('en-IN')})
                            </span>
                          )}
                          {p.price > 0 && p.cost !== undefined && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              {Math.round(((p.price - p.cost) / p.price) * 100)}% margin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Location & Reorder Spec */}
                    <div className="mt-4 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100 text-[11px] flex items-center justify-between text-gray-500">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-purple-600" />
                        {p.location || 'Aisle 1'}
                      </span>
                      <span>Reorder Min: <strong className="text-gray-800">{p.reorderLevel || 15}</strong></span>
                    </div>

                    {/* Stock Information */}
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px] font-medium">On-Hand Stock</span>
                        <span className={`text-base font-extrabold ${
                          p.stock === 0
                            ? 'text-rose-600'
                            : p.stock <= (p.reorderLevel || 15)
                            ? 'text-amber-600'
                            : 'text-emerald-700'
                        }`}>
                          {p.stock} units
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-gray-400 block text-[10px] font-medium">Total Sold</span>
                        <span className="font-bold text-gray-800">{p.solds || 0} units</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Stock Adjuster & Action Toolbar */}
                  {isAdmin ? (
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      {/* Quick Stock Controls */}
                      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-0.5">
                        <button
                          onClick={() => adjustStock(p.id, -1)}
                          className="px-2 py-1 rounded-lg bg-white hover:bg-gray-200 text-gray-700 font-bold text-xs shadow-xs cursor-pointer"
                          title="Reduce stock by 1"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => adjustStock(p.id, +1)}
                          className="px-2 py-1 rounded-lg bg-white hover:bg-gray-200 text-gray-700 font-bold text-xs shadow-xs cursor-pointer"
                          title="Add 1 unit to stock"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => adjustStock(p.id, +5)}
                          className="px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[11px] shadow-xs cursor-pointer"
                          title="Add 5 units"
                        >
                          +5
                        </button>
                      </div>

                      {/* Edit & Delete Action Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-xl border border-gray-200 text-gray-600 hover:text-purple-700 hover:bg-purple-50 hover:border-purple-200 transition cursor-pointer"
                          title="Edit product details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingProduct(p)}
                          className="p-1.5 rounded-xl border border-gray-200 text-gray-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 text-center font-medium">
                      Employee view • Read-only inventory parameters
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={editProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingProduct}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={deleteProduct}
      />
    </div>
  );
}
