"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiX } from 'react-icons/fi';
import CampaignsCard from '@/components/shared/CampaignsCard';
import DashboardTitles from '@/components/shared/DashboardTitle';

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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crm/campaigns`, {
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

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/crm/campaigns`, payload, {
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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/crm/campaigns/${id}/send`, {}, {
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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crm/campaigns/${id}`, {
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
    <div className="dashboard-page">
      <div className="dashboard-header">
        <DashboardTitles title="Coupon Campaigns" />
        <button className="crm-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> New Campaign
        </button>
      </div>
      <div className='dashboard-wrapper dashboard-content'>
        {loading ? (
          <p>Loading campaigns...</p>
        ) : (
          <div className="campaigns-grid">
            {campaigns.map(c => (
              <CampaignsCard
                key={c._id}
                campaign={c}
                handleSend={handleSend}
                checkStatus={checkStatus}
              />
            ))}

            {campaigns.length === 0 && <p>No campaigns found.</p>}
          </div>
        )}
      </div>


      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create Campaign</h2>
              <button type="button" className="close-btn" onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>

            <form onSubmit={handleCreate} className="modal-form">
              <div className="modal-field">
                <label>Campaign Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. VIP Diwali Sale" />
              </div>

              <div className="form-row">
                <div className="modal-field flex-1">
                  <label>Coupon Code</label>
                  <input required type="text" name="couponCode" value={formData.couponCode} onChange={handleInputChange} placeholder="VIP50" className="uppercase-input" />
                </div>
                <div className="modal-field flex-1">
                  <label>Target Segment</label>
                  <select name="targetSegment" value={formData.targetSegment} onChange={handleInputChange}>
                    <option value="">All Customers</option>
                    <option value="VIP Customers">VIP Customers</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Cart Abandoners">Cart Abandoners</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="modal-field flex-1">
                  <label>Discount Amount</label>
                  <input required type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                </div>
                <div className="modal-field flex-1">
                  <label>Type</label>
                  <select name="discountType" value={formData.discountType} onChange={handleInputChange}>
                    <option value="flat">Flat (₹)</option>
                    <option value="percent">Percent (%)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="modal-field flex-1">
                  <label>Valid From</label>
                  <input required type="date" name="validFrom" value={formData.validFrom} onChange={handleInputChange} />
                </div>
                <div className="modal-field flex-1">
                  <label>Valid To</label>
                  <input required type="date" name="validTo" value={formData.validTo} onChange={handleInputChange} />
                </div>
              </div>

              <div className="modal-field">
                <label>Send Channels</label>
                <div className="channel-btn-group">
                  <button
                    type="button"
                    className={`channel-btn ${formData.channels.includes('email') ? 'active' : ''}`}
                    onClick={() => handleCheckboxChange('email')}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    className={`channel-btn ${formData.channels.includes('whatsapp') ? 'active' : ''}`}
                    onClick={() => handleCheckboxChange('whatsapp')}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    className={`channel-btn ${formData.channels.includes('sms') ? 'active' : ''}`}
                    onClick={() => handleCheckboxChange('sms')}
                  >
                    SMS
                  </button>
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
