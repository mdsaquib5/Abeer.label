"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsShieldLock } from 'react-icons/bs';

const AdminLoginForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <div className="admin-login-bg">
            <div className='container'>
                <div className={`admin-auth-card ${isLogin ? '' : 'is-flipped'}`}>

                    <div className="admin-auth-face admin-auth-front glass-panel">
                        <div className="admin-auth-header">
                            <div className="admin-auth-icon-wrap">
                                <BsShieldLock className="admin-auth-icon" />
                            </div>
                            <h2 className="admin-auth-title">Welcome Back</h2>
                            <p className="admin-auth-subtitle">
                                Good to see you again. Sign in to manage your Abeer Label store.
                            </p>
                        </div>

                        <form className="admin-auth-form" onSubmit={handleLogin}>
                            <div className="admin-form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="admin@abeerlabel.com" className="admin-auth-input" required />
                            </div>
                            <div className="admin-form-group">
                                <label>Password</label>
                                <input type="password" placeholder="••••••••" className="admin-auth-input" required />
                            </div>
                            <div className="admin-auth-actions">
                                <label className="admin-auth-remember">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <Link href="#" className="admin-auth-forgot">Forgot Password?</Link>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                                Sign In to Dashboard
                            </button>
                        </form>

                        <div className="admin-auth-footer">
                            <p>Need access? <button onClick={() => setIsLogin(false)} className="admin-auth-toggle-btn">Request here</button></p>
                        </div>
                    </div>

                    <div className="admin-auth-face admin-auth-back glass-panel">
                        <div className="admin-auth-header">
                            <div className="admin-auth-icon-wrap">
                                <BsShieldLock className="admin-auth-icon" />
                            </div>
                            <h2 className="admin-auth-title">Request Access</h2>
                            <p className="admin-auth-subtitle">
                                You're one step away. Submit your details and we'll get you set up.
                            </p>
                        </div>

                        <form className="admin-auth-form" onSubmit={(e) => { e.preventDefault(); setIsLogin(true); }}>
                            <div className="admin-form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="Your full name" className="admin-auth-input" required />
                            </div>
                            <div className="admin-form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="admin@abeerlabel.com" className="admin-auth-input" required />
                            </div>
                            <div className="admin-form-group">
                                <label>Password</label>
                                <input type="password" placeholder="••••••••" className="admin-auth-input" required />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                                Submit Request
                            </button>
                        </form>

                        <div className="admin-auth-footer">
                            <p>Already have access? <button onClick={() => setIsLogin(true)} className="admin-auth-toggle-btn">Sign In</button></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminLoginForm;
