import React, { useState, useEffect } from 'react';
import { Search, X, Package, ShoppingCart, User, ArrowRight } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  products = [],
  orders = [],
  onSelectTab
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // handled in parent or toggle
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const matchedProducts = query
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(query.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  const matchedOrders = query
    ? orders.filter(o => o.customer.toLowerCase().includes(query.toLowerCase()) || o.id.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type to search products, orders, or customers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium focus:outline-none placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-4 text-xs">
          {query === '' ? (
            <div className="py-6 text-center text-gray-400">
              <p className="font-semibold text-gray-600 mb-1">Quick Search</p>
              <p className="text-[11px]">Search through all inventory items, transactions, and store customers</p>
            </div>
          ) : (
            <>
              {matchedProducts.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-2">Products</span>
                  <div className="space-y-1">
                    {matchedProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => { onSelectTab('products'); onClose(); }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-purple-600" />
                          <span className="font-mono text-[10px] bg-gray-100 text-gray-700 font-bold px-1.5 py-0.2 rounded">
                            {p.sku}
                          </span>
                          <span className="font-bold">{p.name}</span>
                          <span className="text-gray-400 font-semibold">₹{p.price}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedOrders.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-2">Orders</span>
                  <div className="space-y-1">
                    {matchedOrders.map(o => (
                      <div
                        key={o.id}
                        onClick={() => { onSelectTab('orders'); onClose(); }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <ShoppingCart className="w-4 h-4 text-purple-600" />
                          <span className="font-bold">{o.id}</span>
                          <span className="text-gray-500">{o.customer}</span>
                          <span className="font-bold text-gray-800">₹{o.amount}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedProducts.length === 0 && matchedOrders.length === 0 && (
                <div className="py-6 text-center text-gray-400">
                  No results found for "{query}".
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-5 py-2.5 bg-gray-50 text-[11px] text-gray-400 border-t border-gray-100 flex justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
