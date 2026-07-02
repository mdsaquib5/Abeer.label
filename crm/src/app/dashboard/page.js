"use client";

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { formatCurrency } from '@/utils/formatters';
import { FiUsers, FiTrendingUp, FiActivity, FiTag, FiRefreshCw, FiSend } from 'react-icons/fi';
import DashboardTitles from '@/components/shared/DashboardTitle';
import Loader from '@/components/shared/Loader';
import Stats from '@/components/shared/Stats';

export default function DashboardHome() {
    const { stats, loading, recomputing, fetchStats, triggerRecompute } = useDashboardStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleRecompute = async () => {
        const { message } = await triggerRecompute();
        alert(message);
    };

    if (loading) return <div style={{ padding: '2rem' }}><Loader text="Loading dashboard..." /></div>;
    if (!stats) return <div style={{ padding: '2rem' }}>Failed to load statistics.</div>;

    const statsData = [
        {
            title: "Total Customers",
            number: stats.totalCustomers,
            icon: <FiUsers />
        },
        {
            title: "Total Revenue",
            number: formatCurrency(stats.totalRevenue),
            icon: <FiTrendingUp />
        },
        {
            title: "Active Customers",
            number: stats.activeCount,
            icon: <FiActivity />
        },
        {
            title: "Inactive Customers",
            number: stats.inactiveCount,
            icon: <FiUsers />
        },
        {
            title: "Total Campaigns",
            number: stats.campaignCount,
            icon: <FiTag />
        },
        {
            title: "Running Campaigns",
            number: stats.runningCampaignCount,
            icon: <FiRefreshCw />
        },
        {
            title: "Completed Campaigns",
            number: stats.completedCampaignCount,
            icon: <FiTag />
        },
        {
            title: "Expired Campaigns",
            number: stats.expiredCampaignCount,
            icon: <FiTag />
        },
        {
            title: "Campaigns Sent",
            number: stats.totalMessagesSent,
            icon: <FiSend />
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <DashboardTitles title="CRM Dashboard" />
                <button className="recompute-btn crm-btn" onClick={handleRecompute} disabled={recomputing}>
                    <FiRefreshCw className={recomputing ? 'spin' : ''} />
                    {recomputing ? 'Triggering...' : 'Run Analytics Engine'}
                </button>
            </div>
            <div className='dashboard-wrapper dashboard-content'>

                <div className="dashbaord-stats-grid">
                    {statsData.map((item, index) => (
                        <Stats key={index} item={item} />
                    ))}
                </div>

                <div className="stat-card">
                    <div>
                        <div className="stats-details">
                            <div className="stats-title">Customer Score Distribution</div>
                            <div className="stat-number" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
                                Average Score: {stats.avgScore} / 100
                            </div>
                            <div className="score-meter" style={{ marginTop: '1rem' }}>
                                <div className="score-fill" style={{ width: `${stats.avgScore}%`, backgroundColor: stats.avgScore > 60 ? '#16a34a' : '#eab308' }}></div>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '1rem', opacity: 0.8 }}>
                                This score aggregates Purchase Frequency, Spend, Activity, and Returns across your customer base.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
