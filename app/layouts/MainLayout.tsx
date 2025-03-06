'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/start-up-ai', label: 'Start-up AI' },
    { path: '/promo-ai', label: 'Promo AI' },
    { path: '/ai-podcast-studio', label: 'AI Podcast Studio' },
    { path: '/marketing-funnels', label: 'Marketing Funnels' },
    { path: '/invoices-quotes', label: 'Invoices & Quotes' },
    { path: '/tax-compliance', label: 'Tax Compliance' },
    { path: '/expenses', label: 'Expenses' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/forecasting', label: 'Forecasting' },
    { path: '/users', label: 'Users' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        } min-h-screen fixed left-0 top-0`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full text-center mb-4"
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
          <nav>
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block py-2 px-4 mb-2 rounded ${
                  pathname === item.path
                    ? 'bg-blue-600'
                    : 'hover:bg-gray-700'
                }`}
              >
                {isSidebarCollapsed ? item.label[0] : item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-md p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <input
                type="search"
                placeholder="Zoeken..."
                className="w-64 px-4 py-2 rounded-lg border"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2">🔔</button>
              <button className="p-2">👤</button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        <footer className="bg-gray-100 p-4 text-center">
          <div className="flex justify-center space-x-4">
            <Link href="/help">Help</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MainLayout; 