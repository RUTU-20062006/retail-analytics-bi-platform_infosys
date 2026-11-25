import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { TrendingUp, Zap } from 'lucide-react';

export default function AnalyticsView() {
  const { categorySummary, totalRevenue, grossMarginPct, totalSKUs, totalStockUnits } = useInventory();

  // Dynamic forecast trend based on live catalog revenue
  const baseMonthly = totalRevenue > 0 ? Math.round(totalRevenue / 3) : 14299;
  const forecastData = [
    { month: 'Sep', actual: Math.round(baseMonthly * 0.85), predicted: Math.round(baseMonthly * 0.84) },
    { month: 'Oct', actual: Math.round(baseMonthly * 0.92), predicted: Math.round(baseMonthly * 0.90) },
    { month: 'Nov', actual: Math.round(baseMonthly * 0.98), predicted: Math.round(baseMonthly * 0.97) },
    { month: 'Dec (Curr)', actual: baseMonthly, predicted: Math.round(baseMonthly * 1.01) },
    { month: 'Jan', actual: null, predicted: Math.round(baseMonthly * 1.12) },
    { month: 'Feb', actual: null, predicted: Math.round(baseMonthly * 1.24) },
    { month: 'Mar', actual: null, predicted: Math.round(baseMonthly * 1.30) }
  ];

  const categoryColors = {
    'Electronics & Accessories': '#6c5ce7',
    'Apparel & Footwear': '#8b5cf6',
    'Home & Kitchen': '#a855f7',
    'Beauty & Personal Care': '#d946ef',
    'Sports & Fitness': '#ec4899'
  };

  // Find top yielding category
  const sortedCategories = [...categorySummary].sort((a, b) => b.margin - a.margin);
  const topYieldCategory = sortedCategories[0]?.name || 'Electronics & Accessories';
  const topYieldMargin = sortedCategories[0]?.margin || 58;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner: Predictive Analytics Model Status */}
      <div className="bg-linear-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg shadow-purple-900/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Predictive Forecasting Model Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Revenue Projected to Reach ₹{Math.round(baseMonthly * 1.30).toLocaleString('en-IN')} by Q1
          </h2>
          <p className="text-purple-200/80 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
            Dynamic business intelligence engine analyzing {totalSKUs} active retail SKUs and {totalStockUnits} warehouse units across 5 core departments.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 min-w-[120px]">
            <span className="text-xs text-purple-200 block font-medium">Blended Margin</span>
            <span className="text-2xl font-bold text-white">{grossMarginPct}%</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 min-w-[120px]">
            <span className="text-xs text-purple-200 block font-medium">Catalog Sales</span>
            <span className="text-2xl font-bold text-emerald-300">₹{totalRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* 4 Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#f5f7fc] rounded-[24px] p-5">
          <span className="text-xs font-semibold text-gray-500">Average Order Value (AOV)</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">₹2,850</span>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">+12.4%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Target: ₹2,500 (Exceeded)</p>
        </div>

        <div className="bg-[#f5f7fc] rounded-[24px] p-5">
          <span className="text-xs font-semibold text-gray-500">Repeat Customer Rate</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">41.8%</span>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">+4.2%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Benchmark: 38%</p>
        </div>

        <div className="bg-[#f5f7fc] rounded-[24px] p-5">
          <span className="text-xs font-semibold text-gray-500">Product Return Rate</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">6.4%</span>
            <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full">-1.2%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Industry avg: 9.8%</p>
        </div>

        <div className="bg-[#f5f7fc] rounded-[24px] p-5">
          <span className="text-xs font-semibold text-gray-500">Inventory Turnover Ratio</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">4.2x</span>
            <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2 py-0.5 rounded-full">Optimal</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Days to sell: 26 days</p>
        </div>
      </div>

      {/* Main Forecasting Graph & Dynamic Margins Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Trend Forecast Chart */}
        <div className="lg:col-span-8 bg-[#f5f7fc] rounded-[26px] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                Revenue Trend & Time-Series Forecast
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Comparison of actual performance vs predictive analytics
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#6c5ce7]" />
                <span>Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-dashed border-2 border-[#f35bb1]" />
                <span>AI Forecast</span>
              </div>
            </div>
          </div>

          {/* Forecast Visual Bars */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-gray-200/50 pb-4">
            {forecastData.map((item) => {
              const maxVal = Math.max(...forecastData.map(f => f.predicted)) * 1.15 || 25000;
              const actualH = item.actual ? (item.actual / maxVal) * 100 : 0;
              const predictedH = (item.predicted / maxVal) * 100;
              const isFuture = item.actual === null;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 bg-neutral-900 text-white text-[11px] font-medium py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-md">
                    {item.month}: {item.actual ? `₹${item.actual.toLocaleString('en-IN')}` : `Predicted: ₹${item.predicted.toLocaleString('en-IN')}`}
                  </div>

                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Actual Bar */}
                    {item.actual && (
                      <div
                        style={{ height: `${actualH}%` }}
                        className="w-1/2 max-w-[20px] bg-[#6c5ce7] rounded-t-md group-hover:brightness-110 transition-all"
                      />
                    )}
                    {/* Forecast Bar */}
                    <div
                      style={{ height: `${predictedH}%` }}
                      className={`w-1/2 max-w-[20px] rounded-t-md transition-all ${
                        isFuture
                          ? 'bg-[#f35bb1]/80 border-2 border-dashed border-[#f35bb1]'
                          : 'bg-purple-200'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Month labels */}
          <div className="flex justify-between items-center text-xs text-gray-500 font-semibold mt-3 px-2">
            {forecastData.map((item) => (
              <span key={item.month} className="text-center flex-1">
                {item.month}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Category Profitability by Vertical */}
        <div className="lg:col-span-4 bg-[#f5f7fc] rounded-[26px] p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Category Profitability</h3>
            <p className="text-xs text-gray-400 font-medium mb-4">Gross margins calculated live from unit costs & retail prices</p>

            <div className="space-y-4">
              {categorySummary.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="text-purple-700 shrink-0">{cat.margin}% Margin</span>
                  </div>
                  <div className="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(10, cat.margin))}%`,
                        backgroundColor: categoryColors[cat.name] || '#6c5ce7'
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>{cat.sales} units sold ({cat.itemCount} SKUs)</span>
                    <span className="font-semibold text-gray-700">₹{cat.revenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200/50 text-xs text-gray-500">
            Highest net yield: <span className="font-bold text-gray-900">{topYieldCategory} ({topYieldMargin}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
