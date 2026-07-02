import React from 'react';
import { FiX, FiRefreshCcw } from 'react-icons/fi';

const CutomerFilter = ({ filters, handleFilterChange, handleApplyFilters, previewCount, onClose, clearFilters, hasActiveFilters }) => {
    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="drawer" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h2>Filter Customers</h2>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                title="Clear Filters"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-light)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '1.1rem',
                                    transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
                            >
                                <FiRefreshCcw />
                            </button>
                        )}
                    </div>
                    <button className="close-btn" onClick={onClose}><FiX /></button>
                </div>

                <div className="drawer-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

                    <div className="filter-actions" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <div className="preview-count">
                            {previewCount !== null ? `${previewCount} customers match` : 'Calculating...'}
                        </div>
                        <button
                            className="btn-primary"
                            style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--primary)', color: 'var(--secondary)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                            onClick={() => { handleApplyFilters(); onClose(); }}
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CutomerFilter;