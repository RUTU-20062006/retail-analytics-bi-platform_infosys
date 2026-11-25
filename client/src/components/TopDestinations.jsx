import React from 'react';

export default function TopDestinations({ destinations = [], onSeeAll }) {
  // Flag images or circular emojis matching UI.webp
  const defaultDestinations = [
    { country: 'Maharashtra', code: 'MH', percentage: 42, color: '#6c5ce7' },
    { country: 'Karnataka', code: 'KA', percentage: 28, color: '#6c5ce7' },
    { country: 'Delhi NCR', code: 'DL', percentage: 15, color: '#6c5ce7' },
    { country: 'Tamil Nadu', code: 'TN', percentage: 9, color: '#6c5ce7' },
    { country: 'Telangana', code: 'TS', percentage: 6, color: '#6c5ce7' },
  ];

  const list = destinations.length > 0 ? destinations : defaultDestinations;

  return (
    <div className="bg-[#f5f7fc] rounded-[26px] p-5 flex flex-col justify-between transition-all hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Top destinations</h3>
          <p className="text-[11px] text-gray-400 font-medium">Pan-India retail order volume</p>
        </div>
        <button
          onClick={onSeeAll}
          className="text-xs font-semibold text-gray-600 hover:text-black underline cursor-pointer"
        >
          See all
        </button>
      </div>

      {/* Destinations List */}
      <div className="space-y-4 my-auto">
        {list.map((item) => (
          <div key={item.country} className="flex items-center gap-3">
            {/* Region Code Circle */}
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 shadow-xs border border-purple-200/60 flex items-center justify-center text-xs font-bold shrink-0">
              <span>{item.code || 'IN'}</span>
            </div>

            {/* Region Name */}
            <div className="w-24 shrink-0">
              <span className="text-xs font-bold text-gray-800">
                {item.country}
              </span>
            </div>

            {/* Progress Bar matching UI.webp */}
            <div className="flex-1 bg-transparent">
              <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#6c5ce7] h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>

            {/* Percentage */}
            <div className="w-10 text-right shrink-0">
              <span className="text-xs font-bold text-gray-800">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 text-[11px] text-gray-400 font-medium">
        Calculated from 7,412 total orders
      </div>
    </div>
  );
}
