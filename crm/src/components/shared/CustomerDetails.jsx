import React from 'react';
import { FiX } from 'react-icons/fi';

const CustomerDetails = ({ selectedCustomer, onClose, formatCurrency, formatDate }) => {
  if (!selectedCustomer) return null;

  return (
    <div className="customer-sidebar-overlay" onClick={onClose}>
      <div className="customer-sidebar" onClick={e => e.stopPropagation()}>
        <div className="customer-sidebar-header">
          <h2>Customer Analytics</h2>
          <button className="customer-sidebar-close" onClick={onClose}><FiX /></button>
        </div>

        <div className="customer-sidebar-content">
          <div className="cs-section">
            <h3>Profile</h3>
            <div className="cs-grid">
              <div className="cs-item">
                <p>Name</p>
                <p>{selectedCustomer.name}</p>
              </div>
              <div className="cs-item">
                <p>Email</p>
                <p>{selectedCustomer.email}</p>
              </div>
              <div className="cs-item">
                <p>Phone</p>
                <p>{selectedCustomer.phone || 'N/A'}</p>
              </div>
              <div className="cs-item">
                <p>Location</p>
                <p>{selectedCustomer.city ? `${selectedCustomer.city}, ${selectedCustomer.state}` : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="cs-section">
            <h3>Value & Activity</h3>
            <div className="cs-grid">
              <div className="cs-item">
                <p>Tier</p>
                <p><span className={`tier-badge tier-${selectedCustomer.valueTier}`}>{selectedCustomer.valueTier}</span></p>
              </div>
              <div className="cs-item">
                <p>Status</p>
                <p><span className={`status-${selectedCustomer.status}`}>{selectedCustomer.status}</span></p>
              </div>
              <div className="cs-item">
                <p>Total Spend</p>
                <p>{formatCurrency ? formatCurrency(selectedCustomer.totalSpend) : selectedCustomer.totalSpend}</p>
              </div>
              <div className="cs-item">
                <p>Average Order Value</p>
                <p>{formatCurrency ? formatCurrency(selectedCustomer.averageOrderValue) : selectedCustomer.averageOrderValue}</p>
              </div>
              <div className="cs-item">
                <p>Total Orders</p>
                <p>{selectedCustomer.totalOrders} ({selectedCustomer.completedOrders} completed)</p>
              </div>
              <div className="cs-item">
                <p>Last Activity</p>
                <p>{formatDate ? formatDate(selectedCustomer.lastActivity) : selectedCustomer.lastActivity}</p>
              </div>
            </div>
          </div>

          <div className="cs-section">
            <h3>Score Breakdown ({selectedCustomer.score}/100)</h3>
            <div className="cs-grid">
              <div className="cs-item"><p>Purchase Score</p><p>{selectedCustomer.scoreBreakdown?.purchase}/30</p></div>
              <div className="cs-item"><p>Activity Score</p><p>{selectedCustomer.scoreBreakdown?.activity}/20</p></div>
              <div className="cs-item"><p>Login Score</p><p>{selectedCustomer.scoreBreakdown?.login}/5</p></div>
              <div className="cs-item"><p>Return Score</p><p>{selectedCustomer.scoreBreakdown?.return}/10</p></div>
            </div>
          </div>

          <div className="cs-section">
            <h3>Segments</h3>
            <div className="cs-segments">
              {selectedCustomer.segments?.map(s => (
                <span key={s} className="cs-segment-badge">{s}</span>
              ))}
              {(!selectedCustomer.segments || selectedCustomer.segments.length === 0) && <p>No segments</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;