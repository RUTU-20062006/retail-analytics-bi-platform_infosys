import React, { useState, useEffect } from 'react';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginView() {
  const { login, targetRole, setTargetRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState(targetRole || 'admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with targetRole if switching from within the app
  useEffect(() => {
    if (targetRole) {
      setSelectedRole(targetRole);
      setEmail('');
      setPassword('');
      setErrorMessage('');
    }
  }, [targetRole]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setTargetRole(role);
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(selectedRole, email, password);
      setIsSubmitting(false);
      if (!result.success) {
        setErrorMessage(result.error);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f8] p-4 sm:p-8 flex items-center justify-center font-sans">
      {/* Outer Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-8 sm:p-10 relative overflow-hidden transition-all">
        {/* Subtle accent line at top */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-[#6c5ce7] via-[#8b5cf6] to-[#f472b6]" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#6c5ce7] flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-purple-200">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 8h2v8H4zm14 0h2v8h-2zM2 10h2v4H2zm18 0h2v4h-2zM7 11h10v2H7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">OmniAnalytics</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Retail & E-Commerce Business Intelligence
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Sign In Portal
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60">
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Administrator</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('employee')}
              className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'employee'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Store Associate</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'admin' ? 'admin@company.com' : 'employee@company.com'}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition shadow-xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold text-slate-700">Password</label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-purple-600 hover:text-purple-800 font-semibold">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your account password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500 border-slate-300 w-3.5 h-3.5" />
              <span className="text-[11px] text-slate-600 font-medium">Keep me signed in</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 rounded-xl bg-[#18181b] hover:bg-black text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to {selectedRole === 'admin' ? 'Admin Portal' : 'Floor Portal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            Protected by enterprise RBAC security • OmniAnalytics Team C
          </p>
        </div>
      </div>
    </div>
  );
}
