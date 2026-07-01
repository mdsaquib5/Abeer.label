"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiSend, FiX, FiBarChart2 } from 'react-icons/fi';
import './campaigns.css';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    couponCode: '',
    discount: '',
    discountType: 'flat',
    minimumOrder: '0',
    validFrom: '',
    validTo: '',
    targetSegment: '',
    channels: []
  });

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('crm_token');
      const res = await axios.get('http://localhost:4000/api/crm/campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setCampaigns(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (channel) => {
    setFormData(prev => {
      const isSelected = prev.channels.includes(channel);
      if (isSelected) {
        return { ...prev, channels: prev.channels.filter(c => c !== channel) };
      } else {
        return { ...prev, channels: [...prev.channels, channel] };
      }
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('crm_token');
      // For demo, we apply the targetSegment as a filter snapshot
      const payload = {
        ...formData,
        filterSnapshot: formData.targetSegment ? { segments: formData.targetSegment } : {}
      };

      const res = await axios.post('http://localhost:4000/api/crm/campaigns', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setIsModalOpen(false);
        fetchCampaigns();
      }
    } catch (error) {
      alert("Failed to create campaign");
      console.error(error);
    }
  };

  const handleSend = async (id) => {
    if (!confirm("Are you sure you want to dispatch this campaign to the queue?")) return;

    try {
      const token = localStorage.getItem('crm_token');
      const res = await axios.post(`http://localhost:4000/api/crm/campaigns/${id}/send`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      fetchCampaigns();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to dispatch campaign");
    }
  };

  const checkStatus = async (id) => {
    try {
      const token = localStorage.getItem('crm_token');
      const res = await axios.get(`http://localhost:4000/api/crm/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        const { stats } = res.data.data;
        alert(`Sent: ${stats.sent || 0}\nQueued: ${stats.queued || 0}\nFailed: ${stats.failed || 0}`);
      }
    } catch (error) {
      alert("Failed to fetch stats");
    }
  };

  return (
    <div className="campaigns-layout">
      <div className="campaigns-header">
        <h1>Coupon Campaigns</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> New Campaign
        </button>
      </div>

      {loading ? (
        <p>Loading campaigns...</p>
      ) : (
        <div className="campaigns-grid">
          {campaigns.map(c => (
            <div className="campaign-card" key={c._id}>
              <div className="campaign-card-header">
                <div>
                  <div className="campaign-title">{c.title}</div>
                  <div className="campaign-code">{c.couponCode}</div>
                </div>
                <span className={`status-badge status-${c.status}`}>{c.status}</span>
              </div>

              <div className="campaign-details">
                <div>
                  <span className="detail-lbl">Discount: </span>
                  <span className="detail-val">
                    {c.discountType === 'percent' ? `${c.discount}%` : `₹${c.discount}`}
                  </span>
                </div>
                <div>
                  <span className="detail-lbl">Min Order: </span>
                  <span className="detail-val">₹{c.minimumOrder}</span>
                </div>
                <div>
                  <span className="detail-lbl">Target: </span>
                  <span className="detail-val">{c.targetSegment || 'All'}</span>
                </div>
                <div>
                  <span className="detail-lbl">Expires: </span>
                  <span className="detail-val">{new Date(c.validTo).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="campaign-actions">
                <button className="stats-btn" onClick={() => checkStatus(c._id)}>
                  <FiBarChart2 style={{ marginRight: '0.25rem' }} /> Stats
                </button>
                <button
                  className="send-btn"
                  onClick={() => handleSend(c._id)}
                  disabled={c.status === 'running' || c.status === 'completed' || c.status === 'expired'}
                >
                  <FiSend /> Send
                </button>
              </div>
            </div>
          ))}

          {campaigns.length === 0 && <p>No campaigns found.</p>}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create Campaign</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.5rem', color: '#64748b' }}><FiX /></button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Campaign Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. VIP Diwali Sale" />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Coupon Code</label>
                  <input required type="text" name="couponCode" value={formData.couponCode} onChange={handleInputChange} placeholder="VIP50" style={{ textTransform: 'uppercase' }} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Target Segment</label>
                  <select name="targetSegment" value={formData.targetSegment} onChange={handleInputChange}>
                    <option value="">All Customers</option>
                    <option value="VIP Customers">VIP Customers</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Cart Abandoners">Cart Abandoners</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Discount Amount</label>
                  <input required type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Type</label>
                  <select name="discountType" value={formData.discountType} onChange={handleInputChange}>
                    <option value="flat">Flat (₹)</option>
                    <option value="percent">Percent (%)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Valid From</label>
                  <input required type="date" name="validFrom" value={formData.validFrom} onChange={handleInputChange} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Valid To</label>
                  <input required type="date" name="validTo" value={formData.validTo} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Send Channels</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                    <input type="checkbox" checked={formData.channels.includes('email')} onChange={() => handleCheckboxChange('email')} /> Email
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                    <input type="checkbox" checked={formData.channels.includes('whatsapp')} onChange={() => handleCheckboxChange('whatsapp')} /> WhatsApp
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                    <input type="checkbox" checked={formData.channels.includes('sms')} onChange={() => handleCheckboxChange('sms')} /> SMS
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Create Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
