import React, { useState } from 'react';
import { Upload, ChevronDown, Check } from 'lucide-react';

export default function Header({
  title = 'Overview',
  subtitle = 'Detailed information about your store',
  selectedPeriod = 'This month',
  onSelectPeriod,
  onExport
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const periods = ['Today', 'Last 7 days', 'This month', 'Last quarter', 'This year'];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 mb-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-400 text-sm mt-0.5 font-medium">
          {subtitle}
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Period Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50/80 transition shadow-sm cursor-pointer"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-30 animate-fade-in">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      onSelectPeriod(period);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <span>{period}</span>
                    {selectedPeriod === period && (
                      <Check className="w-3.5 h-3.5 text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181b] hover:bg-black text-white text-sm font-medium transition shadow-sm cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
