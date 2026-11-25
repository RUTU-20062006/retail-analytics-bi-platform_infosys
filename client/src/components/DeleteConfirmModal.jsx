import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  product,
  onConfirm
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <Trash2 className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-gray-950 mb-1">
          Delete Inventory Item?
        </h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Are you sure you want to delete <strong className="text-gray-900">{product.name}</strong> ({product.sku})? This SKU will be permanently removed from the retail catalog.
        </p>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(product.id);
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
