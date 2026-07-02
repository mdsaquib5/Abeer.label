import React from 'react';
import { FiSend, FiBarChart2, FiTag, FiClock, FiUsers, FiDollarSign } from 'react-icons/fi';

const CampaignsCard = ({ campaign, handleSend, checkStatus }) => {
    return (
        <div className="campaign-card glossy-card">
            <div className="campaign-card-header">
                <div className="campaign-title-group">
                    <h3 className="campaign-title">{campaign.title}</h3>
                    <div className="campaign-code">
                        <FiTag /> {campaign.couponCode}
                    </div>
                </div>
                <span className={`status-badge status-${campaign.status}`}>
                    {campaign.status}
                </span>
            </div>

            <div className="campaign-details">
                <div className="detail-item">
                    <FiDollarSign className="detail-icon" />
                    <div>
                        <span className="detail-lbl">Discount</span>
                        <span className="detail-val">
                            {campaign.discountType === 'percent' ? `${campaign.discount}%` : `₹${campaign.discount}`}
                        </span>
                    </div>
                </div>
                <div className="detail-item">
                    <FiDollarSign className="detail-icon" />
                    <div>
                        <span className="detail-lbl">Min Order</span>
                        <span className="detail-val">₹{campaign.minimumOrder}</span>
                    </div>
                </div>
                <div className="detail-item">
                    <FiUsers className="detail-icon" />
                    <div>
                        <span className="detail-lbl">Target</span>
                        <span className="detail-val">{campaign.targetSegment || 'All'}</span>
                    </div>
                </div>
                <div className="detail-item">
                    <FiClock className="detail-icon" />
                    <div>
                        <span className="detail-lbl">Expires</span>
                        <span className="detail-val">{new Date(campaign.validTo).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="campaign-actions">
                <button className="btn-icon-text stats-btn" onClick={() => checkStatus(campaign._id)}>
                    <FiBarChart2 /> Stats
                </button>
                <button
                    className="btn-icon-text send-btn"
                    onClick={() => handleSend(campaign._id)}
                    disabled={campaign.status === 'running' || campaign.status === 'completed' || campaign.status === 'expired'}
                >
                    <FiSend /> Send
                </button>
            </div>
        </div>
    );
};

export default CampaignsCard;