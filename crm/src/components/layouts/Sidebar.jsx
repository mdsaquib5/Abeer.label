"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiUsers, FiPieChart, FiSend } from 'react-icons/fi';
import { CiLogout } from "react-icons/ci";
import Logo from "../shared/Logo";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FiPieChart, exact: true },
    { name: 'Customers', href: '/dashboard/customers', icon: FiUsers, exact: false },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: FiSend, exact: false },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <Logo />
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
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
    </>
  );
};

export default Sidebar;