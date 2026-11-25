import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';

export default function NewOrderModal({
  isOpen,
  onClose,
  products = [],
  onAddOrder
}) {
  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [item, setItem] = useState(products[0]?.name || 'Sony WH-1000XM5 Wireless Headphones');
  const [amount, setAmount] = useState(products[0]?.price || 24999);
  const [destination, setDestination] = useState('Karnataka (Bengaluru)');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer) return;

    onAddOrder({
      customer,
      email: email || `${customer.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      item,
      amount: parseFloat(amount),
      destination,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Record New Order</h3>
              <p className="text-xs text-gray-400">Add an order to the live transactions ledger</p>
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
          <div>
            <label className="block font-bold text-gray-700 mb-1">Customer Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Rahul Verma"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Customer Email</label>
            <input
              type="email"
              placeholder="e.g. rahul.verma@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Purchased Item</label>
              <select
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                  const found = products.find(p => p.name === e.target.value);
                  if (found) setAmount(found.price);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
              >
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Amount (₹)</label>
              <input
                required
                type="number"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Delivery Destination / City</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
            >
              <option value="Karnataka (Bengaluru)">Karnataka (Bengaluru)</option>
              <option value="Maharashtra (Mumbai)">Maharashtra (Mumbai)</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Telangana (Hyderabad)">Telangana (Hyderabad)</option>
              <option value="Maharashtra (Pune)">Maharashtra (Pune)</option>
              <option value="Tamil Nadu (Chennai)">Tamil Nadu (Chennai)</option>
              <option value="Gujarat (Ahmedabad)">Gujarat (Ahmedabad)</option>
            </select>
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
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
