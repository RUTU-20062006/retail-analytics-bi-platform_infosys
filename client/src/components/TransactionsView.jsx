import React from 'react';
import { CreditCard, ArrowDownLeft, ShieldCheck, CheckCircle } from 'lucide-react';

export default function TransactionsView() {
  const transactions = [
    { id: 'TXN-884912', order: 'ORD-7421', method: 'UPI / Google Pay', customer: 'Rahul Verma', amount: 24999.00, fee: 49.00, status: 'Completed', date: 'Nov 18, 18:24' },
    { id: 'TXN-884911', order: 'ORD-7420', method: 'PhonePe', customer: 'Sneha Kulkarni', amount: 2499.00, fee: 5.00, status: 'Completed', date: 'Nov 18, 18:12' },
    { id: 'TXN-884910', order: 'ORD-7419', method: 'Razorpay PG', customer: 'Rohan Mehta', amount: 6499.00, fee: 13.00, status: 'Completed', date: 'Nov 18, 17:30' },
    { id: 'TXN-884909', order: 'ORD-7418', method: 'Paytm UPI', customer: 'Pooja Deshmukh', amount: 899.00, fee: 2.00, status: 'Completed', date: 'Nov 18, 15:45' },
    { id: 'TXN-884908', order: 'ORD-7417', method: 'HDFC NetBanking', customer: 'Arjun Nair', amount: 1499.00, fee: 3.00, status: 'Processing', date: 'Nov 18, 12:10' },
    { id: 'TXN-884907', order: 'ORD-7416', method: 'ICICI Credit Card', customer: 'Neha Gupta', amount: 3999.00, fee: 8.00, status: 'Completed', date: 'Nov 17, 21:05' },
  ];

  return (
    <div className="bg-[#f5f7fc] rounded-[26px] p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Transaction Ledger</h2>
          <p className="text-xs text-gray-400 font-medium">
            Financial reconciliation and UPI / NetBanking payment logs
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>RBI / PCI-DSS Compliant Gateway</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-400 font-semibold border-b border-gray-200/40">
              <th className="py-3 px-3">Transaction ID</th>
              <th className="py-3 px-3">Order Ref</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Payment Method</th>
              <th className="py-3 px-3 text-right">Gross Amount</th>
              <th className="py-3 px-3 text-right">Gateway Fee</th>
              <th className="py-3 px-3 text-right">Net Payout</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/30">
            {transactions.map((txn) => {
              const net = (txn.amount - txn.fee).toFixed(2);
              return (
                <tr key={txn.id} className="hover:bg-white/60 transition">
                  <td className="py-3 px-3 font-bold text-gray-900">{txn.id}</td>
                  <td className="py-3 px-3 text-purple-600 font-semibold">{txn.order}</td>
                  <td className="py-3 px-3 text-gray-800 font-medium">{txn.customer}</td>
                  <td className="py-3 px-3 text-gray-600">
                    <span className="inline-flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-md border border-gray-200 text-[11px] font-medium">
                      <CreditCard className="w-3 h-3 text-gray-500" />
                      {txn.method}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-gray-900">
                    ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-right text-rose-500 font-medium">
                    -₹{txn.fee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-emerald-700">
                    ₹{parseFloat(net).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-gray-400 font-medium">
                    {txn.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
