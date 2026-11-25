import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@omnianalytics.com',
    password: 'admin123',
    name: 'Rutu',
    role: 'admin',
    initials: 'RK',
    title: 'Operations & BI Administrator',
    badge: 'Admin (Full Access)'
  },
  employee: {
    email: 'staff@omnianalytics.com',
    password: 'staff123',
    name: 'Priya Patel',
    role: 'employee',
    initials: 'PP',
    title: 'Retail Store Associate & Inventory Staff',
    badge: 'Employee (Stock Check)'
  }
};

export function AuthProvider({ children }) {
  // Always start unauthenticated so the login screen appears first
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [targetRole, setTargetRole] = useState('admin');

  // Login with credentials verification
  const login = (role, email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Verify credentials
    if (role === 'admin') {
      if (cleanEmail !== DEMO_CREDENTIALS.admin.email.toLowerCase() || cleanPass !== DEMO_CREDENTIALS.admin.password) {
        return {
          success: false,
          error: 'Invalid Administrator credentials. Please verify your email and password.'
        };
      }
      setUser(DEMO_CREDENTIALS.admin);
      setIsAuthenticated(true);
      return { success: true };
    }

    if (role === 'employee') {
      if (cleanEmail !== DEMO_CREDENTIALS.employee.email.toLowerCase() || cleanPass !== DEMO_CREDENTIALS.employee.password) {
        return {
          success: false,
          error: 'Invalid Store Associate credentials. Please verify your email and password.'
        };
      }
      setUser(DEMO_CREDENTIALS.employee);
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, error: 'Unknown role selected.' };
  };

  // Logout returns to login screen
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Switch role prompts for credentials on login screen
  const switchRole = (newRole) => {
    const nextRole = newRole || (user?.role === 'admin' ? 'employee' : 'admin');
    setTargetRole(nextRole);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        targetRole,
        setTargetRole,
        isAdmin: user?.role === 'admin',
        isEmployee: user?.role === 'employee',
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
