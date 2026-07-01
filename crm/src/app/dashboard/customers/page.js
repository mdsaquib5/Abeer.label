"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiX } from 'react-icons/fi';
import './customers.css';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Filter States
  const [filters, setFilters] = useState({
    search: '',
    inactiveDays: '',
    minSpend: '',
    maxSpend: '',
    minOrders: '',
    tier: '',
    city: '',
    segment: ''
  });
  const [previewCount, setPreviewCount] = useState(null);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append('page', page);
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return params.toString();
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('crm_token');
      const res = await axios.get(`http://localhost:4000/api/crm/customers?${buildQueryString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setCustomers(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  useEffect(() => {
    // Debounce preview fetch
    const timeoutId = setTimeout(async () => {
      try {
        const token = localStorage.getItem('crm_token');
        const qs = buildQueryString().replace(/page=\d+&?/, ''); // remove page for count
        const res = await axios.get(`http://localhost:4000/api/crm/customers/preview?${qs}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setPreviewCount(res.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch preview count", error);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // Reset to first page on filter change
  };

  const handleApplyFilters = () => {
    fetchCustomers();
  };

  const clearFilters = () => {
    setFilters({
      search: '', inactiveDays: '', minSpend: '', maxSpend: '', minOrders: '', tier: '', city: '', segment: ''
    });
    setPage(1);
  };

  const handleRowClick = async (customerId) => {
    try {
      const token = localStorage.getItem('crm_token');
      const res = await axios.get(`http://localhost:4000/api/crm/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setSelectedCustomer(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch customer details", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="customers-layout">
      {/* Filter Sidebar */}
      <div className="filter-sidebar card">
        <div className="filter-header">
          <h3>Advanced Filters</h3>
          <button onClick={clearFilters} className="clear-btn">Clear All</button>
        </div>

        <div className="filter-group">
          <label>Search (Name/Email/Phone)</label>
          <input type="text" name="search" value={filters.search} onChange={handleFilterChange} placeholder="Search..." />
        </div>

        <div className="filter-group">
          <label>Activity</label>
          <select name="inactiveDays" value={filters.inactiveDays} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="30">Inactive &gt; 30 Days</option>
            <option value="60">Inactive &gt; 60 Days</option>
            <option value="90">Inactive &gt; 90 Days</option>
            <option value="180">Inactive &gt; 6 Months</option>
            <option value="365">Inactive &gt; 1 Year</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Spending Range (₹)</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="number" name="minSpend" value={filters.minSpend} onChange={handleFilterChange} placeholder="Min" />
            <input type="number" name="maxSpend" value={filters.maxSpend} onChange={handleFilterChange} placeholder="Max" />
          </div>
        </div>

        <div className="filter-group">
          <label>Minimum Orders</label>
          <input type="number" name="minOrders" value={filters.minOrders} onChange={handleFilterChange} placeholder="e.g. 5" />
        </div>

        <div className="filter-group">
          <label>Value Tier</label>
          <select name="tier" value={filters.tier} onChange={handleFilterChange}>
            <option value="">All Tiers</option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="VIP">VIP</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Segment</label>
          <select name="segment" value={filters.segment} onChange={handleFilterChange}>
            <option value="">All Segments</option>
            <option value="VIP Customers">VIP Customers</option>
            <option value="High Spending">High Spending</option>
            <option value="Premium Customers">Premium Customers</option>
            <option value="Low Spending">Low Spending</option>
            <option value="Inactive">Inactive</option>
            <option value="New Customers">New Customers</option>
            <option value="Frequent Buyers">Frequent Buyers</option>
            <option value="One Time Buyers">One Time Buyers</option>
            <option value="Never Purchased">Never Purchased</option>
          </select>
        </div>

        <div className="filter-group">
          <label>City</label>
          <input type="text" name="city" value={filters.city} onChange={handleFilterChange} placeholder="e.g. Delhi" />
        </div>

        <div className="filter-actions">
          <div className="preview-count">
            {previewCount !== null ? `${previewCount} customers match` : 'Calculating...'}
          </div>
          <button className="btn-primary" style={{ width: '100%' }} onClick={handleApplyFilters}>Apply Filters</button>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="card table-area">
        <div className="customers-header">
          <h1>Customers Analytics</h1>
        </div>

        <div className="table-container">
        {loading ? (
          <p>Loading customers data...</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Status</th>
                <th>Tier</th>
                <th>Total Spend</th>
                <th>Orders</th>
                <th>Score</th>
                <th>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c._id} onClick={() => handleRowClick(c.userId)}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.email}</div>
                  </td>
                  <td>
                    <span className={`status-${c.status}`}>{c.status}</span>
                  </td>
                  <td>
                    <span className={`tier-badge tier-${c.valueTier}`}>{c.valueTier}</span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{formatCurrency(c.totalSpend)}</td>
                  <td>{c.totalOrders}</td>
                  <td>
                    <div className="score-cell">
                      <span style={{ fontWeight: 600 }}>{c.score}</span>
                      <div className="score-bar-bg">
                        <div className="score-bar-fill" style={{ width: `${c.score}%`, backgroundColor: c.score > 70 ? '#16a34a' : c.score > 40 ? '#eab308' : '#dc2626' }}></div>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(c.lastActivity)}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No customers found. Run the Analytics Engine.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button 
          className="page-btn" 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button 
          className="page-btn" 
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>

      </div>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="drawer-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Customer Analytics</h2>
              <button className="close-btn" onClick={() => setSelectedCustomer(null)}><FiX /></button>
            </div>
            
            <div className="drawer-content">
              <div className="detail-section">
                <h3>Profile</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <p>Name</p>
                    <p>{selectedCustomer.name}</p>
                  </div>
                  <div className="detail-item">
                    <p>Email</p>
                    <p>{selectedCustomer.email}</p>
                  </div>
                  <div className="detail-item">
                    <p>Phone</p>
                    <p>{selectedCustomer.phone || 'N/A'}</p>
                  </div>
                  <div className="detail-item">
                    <p>Location</p>
                    <p>{selectedCustomer.city ? `${selectedCustomer.city}, ${selectedCustomer.state}` : 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Value & Activity</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <p>Tier</p>
                    <p><span className={`tier-badge tier-${selectedCustomer.valueTier}`}>{selectedCustomer.valueTier}</span></p>
                  </div>
                  <div className="detail-item">
                    <p>Status</p>
                    <p><span className={`status-${selectedCustomer.status}`}>{selectedCustomer.status}</span></p>
                  </div>
                  <div className="detail-item">
                    <p>Total Spend</p>
                    <p>{formatCurrency(selectedCustomer.totalSpend)}</p>
                  </div>
                  <div className="detail-item">
                    <p>Average Order Value</p>
                    <p>{formatCurrency(selectedCustomer.averageOrderValue)}</p>
                  </div>
                  <div className="detail-item">
                    <p>Total Orders</p>
                    <p>{selectedCustomer.totalOrders} ({selectedCustomer.completedOrders} completed)</p>
                  </div>
                  <div className="detail-item">
                    <p>Last Activity</p>
                    <p>{formatDate(selectedCustomer.lastActivity)}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Score Breakdown ({selectedCustomer.score}/100)</h3>
                <div className="detail-grid">
                  <div className="detail-item"><p>Purchase Score</p><p>{selectedCustomer.scoreBreakdown?.purchase}/30</p></div>
                  <div className="detail-item"><p>Activity Score</p><p>{selectedCustomer.scoreBreakdown?.activity}/20</p></div>
                  <div className="detail-item"><p>Login Score</p><p>{selectedCustomer.scoreBreakdown?.login}/5</p></div>
                  <div className="detail-item"><p>Return Score</p><p>{selectedCustomer.scoreBreakdown?.return}/10</p></div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Segments</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedCustomer.segments?.map(s => (
                    <span key={s} style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>{s}</span>
                  ))}
                  {(!selectedCustomer.segments || selectedCustomer.segments.length === 0) && <p>No segments</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
