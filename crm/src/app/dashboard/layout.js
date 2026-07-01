"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './layout.css'; // Will be the copied admin layout.css
import './responsive.css'; // Copied responsive
import { 
  FiUsers, 
  FiPieChart, 
  FiSend
} from 'react-icons/fi';
import { CiLogout } from "react-icons/ci";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) return null; // Loading state

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiPieChart },
    { name: 'Customers', path: '/dashboard/customers', icon: FiUsers },
    { name: 'Campaigns', path: '/dashboard/campaigns', icon: FiSend },
  ];

  return (
    <div className="admin-layout">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      
      {/* Sidebar matching Admin */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h2 style={{color: 'var(--primary)', fontFamily: 'var(--font-cinzel)', margin: 0}}>ABEER.LABEL</h2>
          <span style={{color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px'}}>CRM PANEL</span>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (window.innerWidth < 992) toggleSidebar();
                    }}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span>Logout</span>
            <CiLogout />
          </button>
        </div>
      </aside>

      {/* Main Content matching Admin */}
      <div className="admin-content">
        {/* Mobile toggle button if needed */}
        <div className="mobile-header" style={{ display: 'none', padding: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
           <button onClick={toggleSidebar} style={{background: 'none', border: 'none', color: 'var(--primary)', fontSize: '1.5rem'}}>☰</button>
        </div>
        {children}
      </div>
    </div>
  );
}
