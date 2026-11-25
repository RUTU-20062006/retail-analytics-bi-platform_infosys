import React, { useState } from 'react';

export default function SalesAnalyticsChart({ data = [] }) {
  // Default data matching UI.webp
  const defaultData = [
    { date: '12 Aug', label: 'August, 12', sold: 88, returns: 14 },
    { date: '13 Aug', label: 'August, 13', sold: 95, returns: 10 },
    { date: '14 Aug', label: 'August, 14', sold: 104, returns: 12 },
    { date: '15 Aug', label: 'August, 15', sold: 78, returns: 12 },
    { date: '16 Aug', label: 'August, 16', sold: 50, returns: 8 },
    { date: '17 Aug', label: 'August, 17', sold: 82, returns: 11 },
    { date: '18 Aug', label: 'August, 18', sold: 92, returns: 15 },
    { date: '19 Aug', label: 'August, 19', sold: 58, returns: 9 },
    { date: '20 Aug', label: 'August, 20', sold: 48, returns: 6 },
    { date: '21 Aug', label: 'August, 21', sold: 75, returns: 13 },
    { date: '22 Aug', label: 'August, 22', sold: 85, returns: 11 },
    { date: '23 Aug', label: 'August, 23', sold: 68, returns: 9 },
    { date: '24 Aug', label: 'August, 24', sold: 72, returns: 14 },
    { date: '25 Aug', label: 'August, 25', sold: 80, returns: 10 },
    { date: '26 Aug', label: 'August, 26', sold: 52, returns: 7 },
    { date: '27 Aug', label: 'August, 27', sold: 62, returns: 15 }
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const [activeItem, setActiveItem] = useState(chartData[2] || defaultData[2]); // August 14 by default

  const yTicks = [105, 90, 80, 65, 55, 45, 10, 0];
  const maxY = 120; // scale factor

  return (
    <div className="bg-[#f5f7fc] rounded-[26px] p-5 flex flex-col justify-between transition-all hover:shadow-sm">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h3 className="text-base font-bold text-gray-900">Sales Analytics</h3>
        
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6c5ce7]" />
            <span>Products sold</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f35bb1]" />
            <span>Product returns</span>
          </div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="flex gap-3 items-stretch relative h-56 pt-2">
        {/* Y Axis Ticks */}
        <div className="flex flex-col justify-between items-end text-[11px] text-gray-400 font-medium pb-6 select-none pr-1">
          {yTicks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        {/* Chart Bars Grid */}
        <div className="flex-1 flex flex-col justify-between relative">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-6">
            {yTicks.map((tick) => (
              <div key={tick} className="border-b border-gray-200/40 w-full" />
            ))}
          </div>

          {/* Bars Container */}
          <div className="h-full flex items-end justify-between gap-1 sm:gap-2 px-1 relative z-10 pb-6">
            {chartData.map((item, idx) => {
              const total = item.sold + item.returns;
              const soldHeight = (item.sold / maxY) * 100;
              const returnHeight = (item.returns / maxY) * 100;
              const isSelected = activeItem?.date === item.date;

              return (
                <div
                  key={item.date}
                  className="flex-1 flex flex-col items-center group relative cursor-pointer h-full justify-end"
                  onMouseEnter={() => setActiveItem(item)}
                >
                  {/* Floating Tooltip matching UI.webp */}
                  {isSelected && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#18181b] text-white text-[11px] font-medium py-2 px-3 rounded-xl shadow-xl z-30 whitespace-nowrap animate-fade-in pointer-events-none">
                      <div className="font-bold text-gray-200 text-xs mb-1">
                        {item.label || item.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#6c5ce7]" />
                        <span>Sold {item.sold}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#f35bb1]" />
                        <span>Return {item.returns}</span>
                      </div>
                      {/* Triangle pointer */}
                      <div className="w-2 h-2 bg-[#18181b] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>
                  )}

                  {/* Stacked Bar */}
                  <div className="w-full max-w-[16px] flex flex-col justify-end transition-transform duration-200 group-hover:scale-y-105">
                    {/* Pink Cap (Returns) */}
                    <div
                      style={{ height: `${returnHeight}%` }}
                      className="w-full bg-[#f35bb1] rounded-t-sm transition-all"
                    />
                    {/* Purple Base (Sold) */}
                    <div
                      style={{ height: `${soldHeight}%` }}
                      className="w-full bg-[#6c5ce7] rounded-b-sm transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* X Axis Labels matching UI.webp (12 Aug, 15 Aug, 18 Aug, 21 Aug, 24 Aug, 27 Aug) */}
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold px-2">
            <span>12 Aug</span>
            <span>15 Aug</span>
            <span>18 Aug</span>
            <span>21 Aug</span>
            <span>24 Aug</span>
            <span>27 Aug</span>
          </div>
        </div>
      </div>
    </div>
  );
}
