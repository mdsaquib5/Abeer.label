"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './dashboard.css';
import { 
  FiUsers, 
  FiPieChart, 
  FiTag, 
  FiSettings, 
  FiLogOut,
  FiSend
} from 'react-icons/fi';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('crm_token');
    const userData = localStorage.getItem('crm_user');

    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    router.push('/login');
  };

  if (!user) return null; // Loading state could go here

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiPieChart className="nav-icon" /> },
    { name: 'Customers', path: '/dashboard/customers', icon: <FiUsers className="nav-icon" /> },
    { name: 'Campaigns', path: '/dashboard/campaigns', icon: <FiSend className="nav-icon" /> },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <FiPieChart />
          <span>CRM Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className={`nav-item ${pathname === item.path || pathname.startsWith(item.path + '/') ? 'active' : ''}`}>
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-title">
            {navItems.find(n => pathname === n.path || pathname.startsWith(n.path + '/'))?.name || 'Dashboard'}
          </div>
          <div className="topbar-user">
            <span>Welcome, {user.name}</span>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
}
