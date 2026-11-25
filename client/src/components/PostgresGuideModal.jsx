import React, { useState } from 'react';
import { X, Database, CheckCircle2, AlertCircle, Copy, Check, Terminal, ExternalLink, RefreshCw } from 'lucide-react';

export default function PostgresGuideModal({
  isOpen,
  onClose,
  dbStatus,
  onRefreshStatus
}) {
  const [activeTab, setActiveTab] = useState('windows');
  const [copiedKey, setCopiedKey] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshStatus();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              dbStatus?.connected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                PostgreSQL Backend Setup Guide
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  dbStatus?.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {dbStatus?.connected ? 'Connected to PostgreSQL' : 'Fallback Mode Active'}
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                How to configure and run your relational database for OmniAnalytics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200/70 flex items-center justify-center text-gray-500 cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="bg-neutral-900 text-white px-6 py-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dbStatus?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>Target: {dbStatus?.host || 'localhost'}:{dbStatus?.port || 5432}/{dbStatus?.database || 'omnianalytics'}</span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md transition text-[11px] cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Check Connection</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-3 gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('windows')}
            className={`pb-3 px-2 border-b-2 transition cursor-pointer ${
              activeTab === 'windows' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Option 1: Windows (Local)
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`pb-3 px-2 border-b-2 transition cursor-pointer ${
              activeTab === 'cloud' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Option 2: Cloud (Supabase / Neon - Instant)
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 px-2 border-b-2 transition cursor-pointer ${
              activeTab === 'schema' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Database Schema & Tables
          </button>
          <button
            onClick={() => setActiveTab('todo')}
            className={`pb-3 px-2 border-b-2 transition cursor-pointer ${
              activeTab === 'todo' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Project Checklist (What To Do)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-gray-700 flex-1">
          {activeTab === 'windows' && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <h4 className="font-bold text-purple-900 mb-1">Step 1: Install PostgreSQL on Windows</h4>
                <p className="text-gray-600 mb-3">You can install PostgreSQL directly using PowerShell or download the installer:</p>
                <div className="bg-neutral-900 text-neutral-200 p-2.5 rounded-xl font-mono flex items-center justify-between">
                  <code>winget install PostgreSQL.PostgreSQL</code>
                  <button
                    onClick={() => copyToClipboard('winget install PostgreSQL.PostgreSQL', 'winget')}
                    className="p-1 hover:text-white"
                  >
                    {copiedKey === 'winget' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 mt-2">
                  Or download from <a href="https://www.postgresql.org/download/windows/" target="_blank" rel="noreferrer" className="text-purple-700 underline font-semibold">postgresql.org/download/windows</a>
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Step 2: Configure `server/.env`</h4>
                <p className="text-gray-600 mb-2">Set your PostgreSQL superuser password in <code className="bg-gray-200 px-1 py-0.5 rounded">server/.env</code>:</p>
                <div className="bg-neutral-900 text-neutral-200 p-2.5 rounded-xl font-mono text-[11px]">
                  PGHOST=localhost<br/>
                  PGPORT=5432<br/>
                  PGDATABASE=omnianalytics<br/>
                  PGUSER=postgres<br/>
                  PGPASSWORD=your_postgres_password
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-950 mb-1">Step 3: Run Database Auto-Initializer</h4>
                <p className="text-emerald-800 mb-2">OmniAnalytics has a built-in automated script that creates the database, schema, and sample data:</p>
                <div className="bg-neutral-900 text-neutral-200 p-2.5 rounded-xl font-mono flex items-center justify-between">
                  <code>cd server && npm run db:init</code>
                  <button
                    onClick={() => copyToClipboard('cd server && npm run db:init', 'initdb')}
                    className="p-1 hover:text-white"
                  >
                    {copiedKey === 'initdb' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-1">Recommended for quick setup (Zero local installs!)</h4>
                <p className="text-blue-800 mb-2">
                  You can get a free, hosted PostgreSQL database in under 60 seconds with <strong>Neon</strong> or <strong>Supabase</strong>:
                </p>
                <ol className="list-decimal pl-4 space-y-1.5 text-gray-700">
                  <li>Go to <a href="https://neon.tech" target="_blank" rel="noreferrer" className="text-blue-700 font-bold underline">neon.tech</a> or <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-blue-700 font-bold underline">supabase.com</a>.</li>
                  <li>Click "Create Free Project" and copy your connection string URI.</li>
                  <li>Paste it into <code className="bg-gray-200 px-1 py-0.5 rounded">server/.env</code>:</li>
                </ol>
                <div className="bg-neutral-900 text-neutral-200 p-2.5 rounded-xl font-mono mt-3 text-[11px] flex items-center justify-between">
                  <code>DATABASE_URL=postgresql://user:pass@ep-host.neon.tech/neondb?sslmode=require</code>
                  <button
                    onClick={() => copyToClipboard('DATABASE_URL=postgresql://user:pass@ep-host.neon.tech/neondb?sslmode=require', 'dburi')}
                    className="p-1 hover:text-white"
                  >
                    {copiedKey === 'dburi' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Populate Cloud Tables</h4>
                <p className="text-gray-600 mb-2">Once your `DATABASE_URL` is set, simply run the init script or copy paste `database/schema.sql` and `database/seed.sql` into the Supabase/Neon SQL editor!</p>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <p className="text-gray-600">The relational model designed in <code className="bg-gray-100 px-1.5 py-0.5 rounded font-bold">database/schema.sql</code> includes 7 connected tables:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-mono font-bold text-purple-700">customers</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Demographics, gender (Men/Women 63/37 ratio), emails, country</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-mono font-bold text-purple-700">products</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Inventory stock, unit prices, total sold counters, product pictures</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-mono font-bold text-purple-700">orders</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Transaction amounts, fulfillment status, foreign key to customer</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-mono font-bold text-purple-700">sales_analytics_daily</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Daily time-series: products sold vs return counts for visual graphs</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-mono font-bold text-purple-700">top_destinations</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Country market penetration (Germany 42%, France 28%, China 15%...)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-mono font-bold text-purple-700">activities</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Audit log of customer purchases and actions</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'todo' && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900">What You Should Do (Roadmap for Your Project)</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950">1. Website Frontend (Done!):</strong>
                    <p className="text-emerald-800 text-[11px]">The UI exactly matches UI.webp with responsive cards, sales charts, order table, and export.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-950">2. Express & PostgreSQL Backend API (Done!):</strong>
                    <p className="text-purple-800 text-[11px]">Configured with REST endpoints and automatic fallback so it never crashes during demos.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0 mt-0.5">3</div>
                  <div>
                    <strong className="text-blue-950">3. Connect PostgreSQL:</strong>
                    <p className="text-blue-800 text-[11px]">Install PostgreSQL or create a free Neon/Supabase DB, update `server/.env`, and run `npm run db:init`.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0 mt-0.5">4</div>
                  <div>
                    <strong className="text-gray-900">4. Optional Python Analytics Script:</strong>
                    <p className="text-gray-600 text-[11px]">As noted in `Basic plan.txt`, you can add a simple Python script (`python/forecast.py`) using Pandas/NumPy to generate trend predictions.</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#18181b] hover:bg-black text-white text-xs font-semibold cursor-pointer transition"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
