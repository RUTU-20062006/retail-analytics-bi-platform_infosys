import React from 'react';
import { Truck, Navigation, CheckCircle2, Clock } from 'lucide-react';

export default function ShippingView() {
  const shipments = [
    { trackingId: 'TRK-982143', carrier: 'BlueDart Express', orderId: 'ORD-7421', destination: 'Bengaluru, Karnataka', eta: 'Delivered', status: 'Delivered', progress: 100 },
    { trackingId: 'TRK-982142', carrier: 'Delhivery Air', orderId: 'ORD-7420', destination: 'Mumbai, Maharashtra', eta: 'Tomorrow, 2:00 PM', status: 'In Transit', progress: 75 },
    { trackingId: 'TRK-982141', carrier: 'DTDC Priority', orderId: 'ORD-7419', destination: 'Delhi NCR', eta: 'Nov 20, 2026', status: 'Dispatched', progress: 45 },
    { trackingId: 'TRK-982140', carrier: 'Shadowfax Express', orderId: 'ORD-7418', destination: 'Pune, Maharashtra', eta: 'Delivered', status: 'Delivered', progress: 100 },
    { trackingId: 'TRK-982139', carrier: 'Ekart Logistics', orderId: 'ORD-7417', destination: 'Hyderabad, Telangana', eta: 'Nov 21, 2026', status: 'Processing', progress: 20 },
  ];

  return (
    <div className="bg-[#f5f7fc] rounded-[26px] p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Domestic Shipping & Logistics</h2>
          <p className="text-xs text-gray-400 font-medium">
            Pan-India fulfillment tracking across key commercial distribution hubs
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-purple-200">
          <Truck className="w-4 h-4" />
          <span>Average Delivery SLA: 2.1 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shipments.map((shipment) => {
          const isDelivered = shipment.status === 'Delivered';
          return (
            <div
              key={shipment.trackingId}
              className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 text-xs">{shipment.carrier}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDelivered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {shipment.status}
                  </span>
                </div>

                <div className="text-xs text-gray-500 font-mono mb-3">
                  {shipment.trackingId}
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-800 font-medium mb-1">
                  <Navigation className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{shipment.destination}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>ETA: {shipment.eta}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
                  <span>Transit Progress</span>
                  <span>{shipment.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isDelivered ? 'bg-emerald-500' : 'bg-[#6c5ce7]'
                    }`}
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
