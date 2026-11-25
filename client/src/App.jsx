import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import TopDestinations from './components/TopDestinations';
import SalesAnalyticsChart from './components/SalesAnalyticsChart';
import ProductSalesTable from './components/ProductSalesTable';
import AnalyticsView from './components/AnalyticsView';
import OrdersView from './components/OrdersView';
import ProductsView from './components/ProductsView';
import StockCheckView from './components/StockCheckView';
import TransactionsView from './components/TransactionsView';
import ShippingView from './components/ShippingView';
import UsersView from './components/UsersView';
import LoginView from './components/LoginView';
import SearchModal from './components/SearchModal';
import NotificationsPopover from './components/NotificationsPopover';
import ExportModal from './components/ExportModal';
import NewOrderModal from './components/NewOrderModal';
import NewProductModal from './components/NewProductModal';
import { Lock, ArrowLeftRight } from 'lucide-react';

function DashboardContent() {
  const { user, isAuthenticated, isAdmin, isEmployee, switchRole } = useAuth();
  const { products, addProduct, lowStockCount, totalRevenue } = useInventory();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const [overviewData, setOverviewData] = useState(null);
  const [orders, setOrders] = useState([]);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);

  // Fetch initial data if backend is running (graceful fallback if offline)
  const fetchData = async () => {
    try {
      const ovRes = await fetch('/api/overview').catch(() => null);
      if (ovRes && ovRes.ok) {
        const ovJson = await ovRes.json();
        setOverviewData(ovJson);
      }

      const ordRes = await fetch('/api/orders').catch(() => null);
      if (ordRes && ordRes.ok) {
        const ordJson = await ordRes.json();
        setOrders(ordJson);
      }
    } catch {
      // Standalone frontend mode
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When switching to employee, if on an admin-only tab, gently redirect to stock-check
  useEffect(() => {
    if (isEmployee && (activeTab === 'analytics' || activeTab === 'transactions' || activeTab === 'users' || activeTab === 'products')) {
      setActiveTab('stock-check');
    }
  }, [isEmployee, activeTab]);

  // Handle adding order in frontend
  const handleAddOrder = (newOrderData) => {
    const fakeOrder = {
      id: `ORD-${7415 + orders.length}`,
      ...newOrderData,
      date: 'Just now'
    };
    setOrders(prev => [fakeOrder, ...prev]);
  };

  // If unauthenticated, display Login View
  if (!isAuthenticated) {
    return <LoginView />;
  }

  // Title calculation
  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Overview';
      case 'analytics': return 'Analytics & AI Forecasting';
      case 'orders': return 'Orders & Fulfillment';
      case 'products': return 'Catalog & Inventory Control (Admin)';
      case 'stock-check': return 'Stock Availability & Floor Locator';
      case 'transactions': return 'Financial Ledger';
      case 'shipping': return 'Shipping & Logistics';
      case 'users': return 'Customer Directory';
      default: return 'Overview';
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f5f9] p-2 sm:p-4 md:p-6 flex justify-center font-sans">
      {/* Clean Full Application Container (No Browser Frame / No fitshop.com) */}
      <div className="w-full max-w-[1440px] bg-white rounded-3xl shadow-sm border border-slate-200/80 p-4 sm:p-6 md:p-8 flex flex-col transition-all">
        
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orderCount={orders.length > 0 ? orders.length : 5}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        {/* Subheader with title and export */}
        <Header
          title={getTabTitle()}
          subtitle={
            isEmployee
              ? 'Store associate portal • Stock availability check & operational inventory'
              : 'Detailed retail business intelligence, stock control, and financial operations'
          }
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
          onExport={() => setIsExportOpen(true)}
        />

        {/* Role Access Restriction Banner for Employee on Admin Views */}
        {isEmployee && (activeTab === 'analytics' || activeTab === 'transactions' || activeTab === 'users' || activeTab === 'products') ? (
          <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 text-center max-w-md mx-auto my-8 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-amber-950 mb-1">
              Admin Privilege Required
            </h3>
            <p className="text-xs text-amber-800 mb-4 leading-relaxed">
              This section contains sensitive business intelligence, pricing configurations, or financial ledgers reserved for Administrators.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setActiveTab('stock-check')}
                className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-black transition cursor-pointer"
              >
                Return to Stock Check
              </button>
              <button
                onClick={switchRole}
                className="px-4 py-2 rounded-full bg-purple-100 text-purple-900 text-xs font-bold hover:bg-purple-200 transition cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Switch to Admin</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Views */}
            {activeTab === 'overview' && (
              <div className="space-y-5 animate-fade-in">
                {/* Row 1: Top 4 Metric Cards */}
                <MetricCards
                  kpis={overviewData?.kpis}
                  totalRevenue={totalRevenue}
                  lastActivity={overviewData?.lastActivity}
                  onSeeAllActivity={() => setActiveTab('users')}
                />

                {/* Row 2: Top Destinations, Sales Analytics Stacked Chart, Product Sales Table */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* 1. Top destinations (left column) */}
                  <div className="lg:col-span-3">
                    <TopDestinations
                      destinations={overviewData?.topDestinations}
                      onSeeAll={() => setActiveTab('shipping')}
                    />
                  </div>

                  {/* 2. Sales Analytics (middle column) */}
                  <div className="lg:col-span-6">
                    <SalesAnalyticsChart
                      data={overviewData?.salesAnalytics}
                    />
                  </div>

                  {/* 3. Product sales (right column) */}
                  <div className="lg:col-span-3">
                    <ProductSalesTable
                      products={products}
                      onSeeAll={() => setActiveTab(isAdmin ? 'products' : 'stock-check')}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stock-check' && <StockCheckView />}

            {activeTab === 'products' && (
              <ProductsView
                onOpenNewProductModal={() => setIsNewProductOpen(true)}
              />
            )}

            {activeTab === 'analytics' && <AnalyticsView />}

            {activeTab === 'orders' && (
              <OrdersView
                orders={orders.length > 0 ? orders : []}
                onOpenNewOrderModal={() => setIsNewOrderOpen(true)}
              />
            )}

            {activeTab === 'transactions' && <TransactionsView />}

            {activeTab === 'shipping' && <ShippingView />}

            {activeTab === 'users' && <UsersView />}
          </>
        )}
      </div>

      {/* Popovers & Modals */}
      <NotificationsPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        activities={overviewData?.lastActivity || []}
        onClear={() => setIsNotificationsOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        orders={orders}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={overviewData}
        orders={orders}
        products={products}
      />

      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        products={products}
        onAddOrder={handleAddOrder}
      />

      <NewProductModal
        isOpen={isNewProductOpen}
        onClose={() => setIsNewProductOpen(false)}
        onAddProduct={addProduct}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <DashboardContent />
      </InventoryProvider>
    </AuthProvider>
  );
}
