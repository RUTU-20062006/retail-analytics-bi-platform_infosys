import React from 'react';
import { X, ShoppingBag, AlertTriangle, CheckCircle2 } from 'lucide-react';

const defaultIndianActivities = [
  { id: 1, name: 'Rahul Verma', initials: 'RV', badgeBg: 'bg-purple-100 text-purple-700', item: 'Sony WH-1000XM5 Headphones', time: '12m ago' },
  { id: 2, name: 'Sneha Kulkarni', initials: 'SK', badgeBg: 'bg-pink-100 text-pink-700', item: 'Cotton Fleece Oversized Hoodie', time: '25m ago' },
  { id: 3, name: 'Rohan Mehta', initials: 'RM', badgeBg: 'bg-blue-100 text-blue-700', item: 'Smart Digital Air Fryer', time: '1h ago' }
];

export default function NotificationsPopover({
  isOpen,
  onClose,
  activities = [],
  onClear
}) {
  if (!isOpen) return null;

  const displayActivities = activities.length > 0 ? activities : defaultIndianActivities;

  return (
    <div className="absolute right-4 sm:right-10 top-16 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-gray-900">Notifications & Alerts</h4>
          <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
            3 New
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-200/60 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 max-h-80 overflow-y-auto space-y-2 text-xs">
        {/* Low Stock Warning */}
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-200/60 flex items-center justify-center text-amber-800 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-amber-950">Low Inventory Alert</h5>
            <p className="text-amber-800 text-[11px] mt-0.5">
              USB-C Fast Charging Cable stock dropped to 8 units. Automated reorder suggested.
            </p>
            <span className="text-[10px] text-amber-600 block mt-1">10 mins ago</span>
          </div>
        </div>

        {/* Live Purchase Events */}
        {displayActivities.slice(0, 3).map((act) => {
          const initials = act.initials || (act.name ? act.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'CU');
          return (
            <div key={act.id} className="p-3 rounded-2xl hover:bg-gray-50 flex gap-3 transition items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${act.badgeBg || 'bg-purple-100 text-purple-700'}`}>
                {initials}
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-gray-900 text-xs">
                  {act.name} placed an order
                </h5>
                <p className="text-[11px] text-gray-500 truncate">
                  Purchased <span className="font-semibold text-gray-700">{act.item}</span>
                </p>
                <span className="text-[10px] text-gray-400 block mt-0.5">{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs">
        <button
          onClick={onClear}
          className="text-purple-700 font-bold hover:underline cursor-pointer"
        >
          Mark all as read
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black font-semibold cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
