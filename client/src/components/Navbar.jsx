import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, LogOut, ArrowLeftRight } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  orderCount = 5,
  onOpenSearch,
  onOpenNotifications,
  unreadCount = 3
}) {
  const { user, isAdmin, isEmployee, logout, switchRole } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Tabs configured by Role
  const adminTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'orders', label: 'Order', badge: orderCount },
    { id: 'products', label: 'Product (Admin)' },
    { id: 'stock-check', label: 'Stock Check' },
    { id: 'transactions', label: 'Transaction' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'users', label: 'Users' },
  ];

  const employeeTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stock-check', label: 'Stock Check' },
    { id: 'orders', label: 'Order', badge: orderCount },
    { id: 'shipping', label: 'Shipping' },
  ];

  const tabs = isAdmin ? adminTabs : employeeTabs;
  const initials = user?.initials || (isAdmin ? 'RK' : 'PP');

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-3 px-2 sm:px-4 border-b border-slate-100 mb-2">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => setActiveTab('overview')}
          className="w-11 h-11 rounded-2xl bg-[#6c5ce7] flex items-center justify-center text-white shadow-md shadow-purple-200 cursor-pointer transition-transform hover:scale-105"
        >
          {/* Barbell / Dumbbell icon */}
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 8h2v8H4zm14 0h2v8h-2zM2 10h2v4H2zm18 0h2v4h-2zM7 11h10v2H7z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 tracking-tight text-lg">OmniAnalytics</span>
            <span
              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                isAdmin
                  ? 'bg-purple-100 text-purple-800 border-purple-200'
                  : 'bg-blue-100 text-blue-800 border-blue-200'
              }`}
            >
              {isAdmin ? 'Admin' : 'Employee'}
            </span>
          </div>
          <span className="block text-[11px] text-gray-400 font-medium -mt-0.5">
            Retail BI Platform • Team C
          </span>
        </div>
      </div>

      {/* Center Navigation Pills */}
      <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 max-w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#18181b] text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100/80'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full font-bold leading-none ${
                    isActive
                      ? 'bg-white text-black'
                      : 'bg-[#18181b] text-white'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
        {/* Role Switcher */}
        <button
          onClick={switchRole}
          title={`Switch between Administrator and Store Associate`}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
            isAdmin
              ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Switch to {isAdmin ? 'Employee' : 'Admin'}</span>
        </button>

        {/* Search Button */}
        <button
          onClick={onOpenSearch}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
          title="Search products, orders, or customers (Ctrl+K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
          title="Activity & Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* User Initials Avatar with Dropdown (No Photo) */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xs cursor-pointer ring-2 transition ${
              isAdmin
                ? 'bg-linear-to-tr from-[#6c5ce7] to-[#8b5cf6] ring-purple-200 hover:ring-purple-400'
                : 'bg-linear-to-tr from-blue-600 to-indigo-600 ring-blue-200 hover:ring-blue-400'
            }`}
            title="Profile & Options"
          >
            {initials}
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setProfileDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-40 animate-fade-in text-xs">
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900 text-sm">{user?.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {isAdmin ? 'Admin' : 'Employee'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                  <p className="text-[10px] text-gray-500 font-medium mt-1">{user?.title}</p>
                </div>

                {/* Switch Role option */}
                <button
                  onClick={() => {
                    switchRole();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-900 font-medium transition cursor-pointer"
                >
                  <ArrowLeftRight className="w-4 h-4 text-purple-600" />
                  <span>Switch to {isAdmin ? 'Employee' : 'Admin'} Mode</span>
                </button>

                {/* Logout option */}
                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-bold transition cursor-pointer border-t border-gray-100 mt-1"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
