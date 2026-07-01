"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiTrendingUp, FiActivity, FiTag, FiRefreshCw } from 'react-icons/fi';
import DashboardTitles from '@/components/shared/DashboardTitle';
import Stats from '@/components/shared/Stats';

export default function DashboardHome() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recomputing, setRecomputing] = useState(false);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('crm_token');
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crm/dashboard-stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setStats(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleRecompute = async () => {
        setRecomputing(true);
        try {
            const token = localStorage.getItem('crm_token');
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/crm/recompute`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Analytics engine started in the background. Check back in a few minutes.');
        } catch (error) {
            alert('Failed to trigger engine.');
        } finally {
            setRecomputing(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;
    if (!stats) return <div style={{ padding: '2rem' }}>Failed to load statistics.</div>;

    const statsData = [
        {
            title: "Total Customers",
            number: stats.totalCustomers,
            icon: <FiUsers />
        },
        {
            title: "Total Revenue Monitored",
            number: formatCurrency(stats.totalRevenue),
            icon: <FiTrendingUp />
        },
        {
            title: "Active vs Inactive",
            number: `${stats.activeCount} / ${stats.inactiveCount}`,
            icon: <FiActivity />
        },
        {
            title: "Active Campaigns",
            number: stats.campaignCount,
            icon: <FiTag />
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <DashboardTitles title="CRM Dashboard" />
                <button className="recompute-btn" onClick={handleRecompute} disabled={recomputing}>
                    <FiRefreshCw className={recomputing ? 'spin' : ''} />
                    {recomputing ? 'Triggering...' : 'Run Analytics Engine'}
                </button>
            </div>
            <div className='dashboard-wrapper'>

                <div className="dashbaord-stats-grid">
                    {statsData.map((item, index) => (
                        <Stats key={index} item={item} />
                    ))}
                </div>

                <div className="charts-area">
                    <div className="chart-card">
                        <h3>Customer Score Distribution</h3>
                        <div className="placeholder-chart">
                            Average Score: <strong>{stats.avgScore} / 100</strong>
                            <div className="score-meter">
                                <div className="score-fill" style={{ width: `${stats.avgScore}%`, backgroundColor: stats.avgScore > 60 ? '#16a34a' : '#eab308' }}></div>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem' }}>
                                This score aggregates Purchase Frequency, Spend, Activity, and Returns across your customer base.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
