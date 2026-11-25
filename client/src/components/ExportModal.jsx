import React, { useState } from 'react';
import { X, FileJson, FileSpreadsheet, Printer, Download, Check } from 'lucide-react';

export default function ExportModal({
  isOpen,
  onClose,
  data,
  orders = [],
  products = []
}) {
  const [downloaded, setDownloaded] = useState(null);

  if (!isOpen) return null;

  const downloadJSON = () => {
    const payload = {
      store: 'OmniAnalytics Retail BI',
      exportDate: new Date().toISOString(),
      kpis: data?.kpis,
      products,
      orders,
      destinations: data?.topDestinations,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnianalytics_report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded('json');
    setTimeout(() => setDownloaded(null), 2500);
  };

  const downloadCSV = () => {
    let csv = 'Order ID,Customer,Email,Item,Amount (INR),Status,Destination,Date\n';
    orders.forEach(o => {
      csv += `"${o.id}","${o.customer}","${o.email}","${o.item}",${o.amount},"${o.status}","${o.destination}","${o.date}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnianalytics_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded('csv');
    setTimeout(() => setDownloaded(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Export Analytics Data</h3>
            <p className="text-xs text-gray-400 mt-0.5">Select your preferred export format</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-3">
          {/* JSON Option */}
          <button
            onClick={downloadJSON}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50/50 transition cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <FileJson className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-gray-900 block group-hover:text-purple-700">
                  Full BI Dataset (JSON)
                </span>
                <span className="text-[11px] text-gray-400">
                  KPIs, daily sales, destinations, and inventory
                </span>
              </div>
            </div>
            {downloaded === 'json' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Download className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
            )}
          </button>

          {/* CSV Option */}
          <button
            onClick={downloadCSV}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-gray-900 block group-hover:text-emerald-700">
                  Orders Spreadsheet (CSV)
                </span>
                <span className="text-[11px] text-gray-400">
                  Compatible with Microsoft Excel & Google Sheets
                </span>
              </div>
            </div>
            {downloaded === 'csv' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Download className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
            )}
          </button>

          {/* Print/PDF Option */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-gray-900 block group-hover:text-blue-700">
                  Print or Save as PDF
                </span>
                <span className="text-[11px] text-gray-400">
                  Generate print-ready executive summary
                </span>
              </div>
            </div>
            <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </button>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
