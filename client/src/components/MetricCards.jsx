import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

export default function MetricCards({
  kpis,
  totalRevenue,
  lastActivity = [],
  onSeeAllActivity
}) {
  const [hoveredBar, setHoveredBar] = useState(null);

  const displayRevenue = totalRevenue > 0
    ? `₹ ${totalRevenue.toLocaleString('en-IN')}`
    : '₹ 14,29,900';

  const revenueData = kpis?.totalRevenue?.chart || [
    { month: 'Mar', value: 38 },
    { month: 'Apr', value: 48 },
    { month: 'May', value: 42 },
    { month: 'Jun', value: 65 },
    { month: 'Jul', value: 32 },
    { month: 'Aug', value: 55 },
    { month: 'Sep', value: 72 },
    { month: 'Oct', value: 60 },
    { month: 'Nov', value: 92 },
    { month: 'Dec', value: 85 }
  ];

  // Indian customer activities with initials avatars (No photos)
  const indianActivities = [
    {
      id: 1,
      name: 'Rahul Verma',
      initials: 'RV',
      color: 'bg-blue-100 text-blue-700',
      item: 'Wireless Earbuds',
      time: '2 mins ago'
    },
    {
      id: 2,
      name: 'Sneha Kulkarni',
      initials: 'SK',
      color: 'bg-purple-100 text-purple-700',
      item: 'Non-Slip Yoga Mat',
      time: '14 mins ago'
    },
    {
      id: 3,
      name: 'Rohan Mehta',
      initials: 'RM',
      color: 'bg-emerald-100 text-emerald-700',
      item: 'Running Sneakers',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
      {/* 1. Total Revenue Card */}
      <div className="bg-[#f5f7fc] rounded-[26px] p-5 flex flex-col justify-between transition-all hover:shadow-sm">
        <div>
          <span className="text-sm font-medium text-gray-600">Total Revenue</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[26px] font-bold text-gray-900 tracking-tight">
              {displayRevenue}
            </span>
            <span className="bg-[#18181b] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              +29,5%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">
            ₹ 13,85,400 last month
          </p>
        </div>

        {/* Revenue Bars Chart */}
        <div className="mt-6 pt-2">
          <div className="h-24 flex items-end justify-between gap-1.5 px-1 relative">
            {revenueData.map((item, idx) => {
              const heightPercent = `${item.value}%`;
              const isHovered = hoveredBar === idx;
              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center group relative cursor-pointer"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {isHovered && (
                    <div className="absolute -top-7 bg-neutral-900 text-white text-[10px] font-medium py-0.5 px-1.5 rounded-md shadow-md pointer-events-none z-10 whitespace-nowrap">
                      ₹ {(item.value * 15500).toLocaleString('en-IN')}
                    </div>
                  )}
                  <div className="w-full flex justify-center">
                    <div
                      style={{ height: heightPercent }}
                      className={`w-full max-w-[14px] bg-[#6c5ce7] rounded-t-sm transition-all duration-200 ${
                        isHovered ? 'brightness-110 scale-y-105' : 'opacity-90'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Month labels */}
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 font-medium px-0.5">
            {revenueData.map((item) => (
              <span key={item.month} className="text-center flex-1">
                {item.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Total Customers Card */}
      <div className="bg-[#f5f7fc] rounded-[26px] p-5 flex flex-col justify-between transition-all hover:shadow-sm">
        <div>
          <span className="text-sm font-medium text-gray-600">Total Customers</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[26px] font-bold text-gray-900 tracking-tight">
              9,706
            </span>
            <span className="bg-[#18181b] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              +32,4%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">
            819 customers last month
          </p>
        </div>

        {/* Gender Demographics Split Blocks */}
        <div className="mt-6 pt-2">
          <div className="flex gap-2 h-20 items-stretch">
            {/* Men Segment (63%) */}
            <div
              className="bg-[#6c5ce7] text-white rounded-2xl flex flex-col items-center justify-center font-bold text-sm shadow-sm transition hover:brightness-105 cursor-pointer"
              style={{ width: '63%' }}
              title="6,115 Men customers (63%)"
            >
              <span>63%</span>
            </div>

            {/* Women Segment (37%) */}
            <div
              className="bg-[#f35bb1] text-white rounded-2xl flex flex-col items-center justify-center font-bold text-sm shadow-sm transition hover:brightness-105 cursor-pointer"
              style={{ width: '37%' }}
              title="3,591 Women customers (37%)"
            >
              <span>37%</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-5 mt-4 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6c5ce7]" />
              <span>Men</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f35bb1]" />
              <span>Women</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Total Orders Card */}
      <div className="bg-[#f5f7fc] rounded-[26px] p-5 flex flex-col justify-between transition-all hover:shadow-sm">
        <div>
          <span className="text-sm font-medium text-gray-600">Total Orders</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[26px] font-bold text-gray-900 tracking-tight">
              7,412
            </span>
            <span className="bg-[#18181b] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              +8,9%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">
            13,590 store visits this month
          </p>
        </div>

        {/* Smooth Spline Area Chart */}
        <div className="mt-6 pt-2">
          <div className="h-20 w-full relative">
            <svg
              viewBox="0 0 280 90"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path
                d="M 0 45 C 50 48, 100 80, 160 70 C 210 60, 240 25, 270 20 L 270 90 L 0 90 Z"
                fill="url(#orderGrad)"
              />

              {/* Stroke line */}
              <path
                d="M 0 45 C 50 48, 100 80, 160 70 C 210 60, 240 25, 270 20"
                fill="none"
                stroke="#6c5ce7"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Dot indicator */}
              <circle
                cx="270"
                cy="20"
                r="4.5"
                fill="#6c5ce7"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Dates labels */}
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 font-medium">
            <span>1 Jul</span>
            <span>8 Jul</span>
            <span>16 Jul</span>
            <span>20 Jul</span>
            <span>25 Jul</span>
          </div>
        </div>
      </div>

      {/* 4. Last Activity Card (Indian Names + Initials Avatar Badges, No Photos) */}
      <div className="bg-[#f5f7fc] rounded-[26px] p-5 flex flex-col justify-between transition-all hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">Last activity</span>
          <button
            onClick={onSeeAllActivity}
            className="text-xs font-semibold text-gray-600 hover:text-black underline cursor-pointer"
          >
            See all
          </button>
        </div>

        {/* Activity Items List with Initials Circles */}
        <div className="mt-4 space-y-3.5">
          {indianActivities.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">
                    Purchased <span className="font-semibold text-gray-700 underline decoration-gray-300">{item.item}</span>
                  </p>
                </div>
              </div>

              <button
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200/60 transition cursor-pointer shrink-0"
                title="Options"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom hint */}
        <div className="text-[10px] text-gray-400 text-right mt-2 font-medium">
          Live store transactions
        </div>
      </div>
    </div>
  );
}
