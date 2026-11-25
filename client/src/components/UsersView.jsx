import React, { useState } from 'react';
import { Users, Mail, MapPin, Search } from 'lucide-react';

export default function UsersView() {
  const [filterGender, setFilterGender] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const usersList = [
    { id: 1, name: 'Rahul Verma', email: 'rahul.verma@gmail.com', gender: 'Men', city: 'Bengaluru, Karnataka', orders: 14, totalSpend: 54990, initials: 'RV', badgeBg: 'bg-purple-100 text-purple-700' },
    { id: 2, name: 'Sneha Kulkarni', email: 'sneha.k@outlook.com', gender: 'Women', city: 'Mumbai, Maharashtra', orders: 9, totalSpend: 34500, initials: 'SK', badgeBg: 'bg-pink-100 text-pink-700' },
    { id: 3, name: 'Rohan Mehta', email: 'rohan.m@gmail.com', gender: 'Men', city: 'Delhi NCR', orders: 16, totalSpend: 78200, initials: 'RM', badgeBg: 'bg-blue-100 text-blue-700' },
    { id: 4, name: 'Pooja Deshmukh', email: 'pooja.d@yahoo.com', gender: 'Women', city: 'Pune, Maharashtra', orders: 8, totalSpend: 24800, initials: 'PD', badgeBg: 'bg-amber-100 text-amber-700' },
    { id: 5, name: 'Arjun Nair', email: 'arjun.nair@corp.in', gender: 'Men', city: 'Hyderabad, Telangana', orders: 12, totalSpend: 42900, initials: 'AN', badgeBg: 'bg-emerald-100 text-emerald-700' },
    { id: 6, name: 'Neha Gupta', email: 'neha.gupta@gmail.com', gender: 'Women', city: 'Chennai, Tamil Nadu', orders: 10, totalSpend: 39600, initials: 'NG', badgeBg: 'bg-rose-100 text-rose-700' },
  ];

  const filtered = usersList.filter((u) => {
    const matchesGender = filterGender === 'All' || u.gender === filterGender;
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGender && matchesSearch;
  });

  return (
    <div className="bg-[#f5f7fc] rounded-[26px] p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Customer Directory (9,706 Total)</h2>
          <p className="text-xs text-gray-400 font-medium">
            Demographic breakdown: 63% Men (6,115) • 37% Women (3,591)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white rounded-full text-xs font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 w-52"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {['All', 'Men', 'Women'].map((gender) => (
          <button
            key={gender}
            onClick={() => setFilterGender(gender)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              filterGender === gender
                ? 'bg-[#6c5ce7] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {gender}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-gray-100 ${user.badgeBg}`}>
                {user.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{user.name}</h4>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      user.gender === 'Men'
                        ? 'bg-purple-100 text-[#6c5ce7]'
                        : 'bg-pink-100 text-[#f35bb1]'
                    }`}
                  >
                    {user.gender}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{user.city}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 pl-3">
              <span className="text-xs font-extrabold text-gray-900 block">
                ₹{user.totalSpend.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {user.orders} orders
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
