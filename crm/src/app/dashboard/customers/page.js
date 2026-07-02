"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardTitles from '@/components/shared/DashboardTitle';
import CutomerFilter from '@/components/shared/CutomerFilter';
import { FiFilter } from 'react-icons/fi';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const hasActiveFilters = Object.values(filters).some(val => val !== '');

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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crm/customers?${buildQueryString()}`, {
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crm/customers/preview?${qs}`, {
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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crm/customers/${customerId}`, {
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

  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (startPage === 1) {
      endPage = Math.min(totalPages, maxVisible);
    }
    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxVisible + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button key="1" className="page-number-btn" onClick={() => setPage(1)}>1</button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className="ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number-btn ${i === page ? 'active' : ''}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className="ellipsis">...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} className="page-number-btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
      );
    }

    return pageNumbers;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <DashboardTitles title={'Customers Analytics'} />
        <button className='crm-btn' onClick={() => setIsFilterOpen(true)}>
          <FiFilter /> Filter
        </button>
      </div>
      <div className='customer-layout'>

        {isFilterOpen && (
          <CutomerFilter
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleApplyFilters={handleApplyFilters}
            previewCount={previewCount}
            onClose={() => setIsFilterOpen(false)}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        <div className='dashboard-content'>
          <div className="card table-area">

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
                          <div className="customer-name">{c.name}</div>
                          <div className="customer-email">{c.email}</div>
                        </td>
                        <td>
                          <span className={`status-${c.status}`}>{c.status}</span>
                        </td>
                        <td>
                          <span className={`tier-badge tier-${c.valueTier}`}>{c.valueTier}</span>
                        </td>
                        <td className="customer-spend">{formatCurrency(c.totalSpend)}</td>
                        <td>{c.totalOrders}</td>
                        <td>
                          <div className="score-cell">
                            <span className="score-text">{c.score}</span>
                            <div className="score-bar-bg">
                              <div
                                className={`score-bar-fill score-${c.score > 70 ? 'high' : c.score > 40 ? 'medium' : 'low'}`}
                                style={{ width: `${c.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>{formatDate(c.lastActivity)}</td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr>
                        <td colSpan="7" className="empty-state">No customers found. Run the Analytics Engine.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </button>

                <div className="page-numbers">
                  {renderPaginationNumbers()}
                </div>

                <button
                  className="page-btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
