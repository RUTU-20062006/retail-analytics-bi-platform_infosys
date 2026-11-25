import React from 'react';
import { Package } from 'lucide-react';

export default function ProductSalesTable({ products = [], onSeeAll }) {
  return (
    <div className="bg-[#f5f7fc] rounded-[26px] p-5 flex flex-col justify-between transition-all hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-gray-900">Product sales</h3>
        <button
          onClick={onSeeAll}
          className="text-xs font-semibold text-gray-600 hover:text-black underline cursor-pointer"
        >
          See all
        </button>
      </div>

      {/* Table Column Headers matching UI.webp */}
      <div className="flex items-center justify-between text-xs text-gray-400 font-medium px-1 py-1 border-b border-gray-200/50">
        <span className="flex-1">Item</span>
        <span className="w-16 text-right">Stock</span>
        <span className="w-16 text-right">Solds</span>
      </div>

      {/* Product Rows or Clean Empty State */}
      {products.length > 0 ? (
        <div className="divide-y divide-gray-200/30">
          {products.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2.5 px-1 hover:bg-gray-100/50 rounded-xl transition group"
            >
              {/* Item info */}
              <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0 bg-white shadow-xs"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate group-hover:text-purple-700 transition">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    ₹{parseFloat(item.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Stock count */}
              <div className="w-16 text-right">
                <span className={`text-xs font-bold ${item.stock <= (item.reorderLevel || 15) ? 'text-amber-600 font-extrabold' : 'text-gray-800'}`}>
                  {item.stock}
                </span>
              </div>

              {/* Solds count */}
              <div className="w-16 text-right">
                <span className="text-xs font-bold text-gray-800">
                  {item.solds || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400 my-auto">
          <div className="w-10 h-10 rounded-2xl bg-gray-200/50 text-gray-400 flex items-center justify-center mx-auto mb-2">
            <Package className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-gray-600">No items in catalog yet</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Register new products in the Product tab to see live sales.
          </p>
        </div>
      )}

      <div className="pt-2 text-[11px] text-gray-400 font-medium">
        {products.length > 0 ? `${products.length} products on file` : 'Milestone 1 clean state'}
      </div>
    </div>
  );
}
