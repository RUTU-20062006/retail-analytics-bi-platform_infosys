import React, { useState } from 'react';
import { X, PackagePlus, DollarSign } from 'lucide-react';

export default function NewProductModal({
  isOpen,
  onClose,
  onAddProduct
}) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Electronics & Accessories');
  const [price, setPrice] = useState('2499');
  const [cost, setCost] = useState('999');
  const [stock, setStock] = useState('50');
  const [reorderLevel, setReorderLevel] = useState('15');
  const [solds, setSolds] = useState('0');
  const [location, setLocation] = useState('Aisle E-05');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    onAddProduct({
      name,
      sku: sku || `SKU-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      category,
      price: parseFloat(price),
      cost: parseFloat(cost) || 0,
      stock: parseInt(stock, 10),
      reorderLevel: parseInt(reorderLevel, 10) || 15,
      solds: parseInt(solds, 10) || 0,
      location: location || 'Aisle 1 - Bay A',
      image: imageUrl,
    });

    // Reset fields
    setName('');
    setSku('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <PackagePlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Add New Inventory Item</h3>
              <p className="text-xs text-gray-400">Admin Control • Register SKU, price & reorder threshold</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Product Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Ergonomic Bluetooth Mouse"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">SKU / ID (e.g. ELEC-105)</label>
              <input
                type="text"
                placeholder="e.g. ELEC-105"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Retail Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
            >
              <option value="Electronics & Accessories">Electronics & Accessories</option>
              <option value="Apparel & Footwear">Apparel & Footwear</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Sports & Fitness">Sports & Fitness</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Retail Price (₹)</label>
              <input
                required
                type="number"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Unit Cost (₹ - for Margins)</label>
              <input
                required
                type="number"
                step="1"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Initial Stock</label>
              <input
                required
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Reorder Point</label>
              <input
                required
                type="number"
                value={reorderLevel}
                onChange={(e) => setReorderLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Units Sold</label>
              <input
                type="number"
                value={solds}
                onChange={(e) => setSolds(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Floor / Aisle Location</label>
              <input
                type="text"
                placeholder="e.g. Aisle E-05"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Product Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#18181b] hover:bg-black text-white font-semibold shadow-sm cursor-pointer"
            >
              Add to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
