"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { BsShieldLock } from 'react-icons/bs';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('mdsaquib5540@gmail.com');
    const [password, setPassword] = useState('mdsaquib5540');
    const router = useRouter();

    // Zustand store
    const { login, loading, error } = useAuthStore();

    // New states for the UI structure
    const [isLogin, setIsLogin] = useState(true);
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

    const switchToSignup = () => setIsLogin(false);
    const switchToLogin = () => setIsLogin(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { success } = await login(email, password);
        if (success) {
            router.push('/dashboard/customers');
        }
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        toast.success("CRM Access Request Submitted!");
    };

    return (
        <div className="admin-login-bg">
            <div className='container'>
                <div className={`admin-auth-card ${isLogin ? '' : 'is-flipped'}`}>

                    {/* Front: Login */}
                    <div className="admin-auth-face admin-auth-front glass-panel">
                        <div className="admin-auth-header">
                            <div className="admin-auth-icon-wrap">
                                <BsShieldLock className="admin-auth-icon" />
                            </div>
                            <h2 className="admin-auth-title">Welcome Back</h2>
                            <p className="admin-auth-subtitle">
                                Good to see you again. Sign in to manage your Abeer Label CRM.
                            </p>
                            {error && <div className="error-alert">{error}</div>}
                        </div>

                        <form className="admin-auth-form" onSubmit={handleLogin}>
                            <div className="admin-form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="admin@abeerlabel.com"
                                    className="admin-auth-input"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="admin-auth-input"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div className="admin-auth-actions">
                                <label className="admin-auth-remember">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <Link href="#" className="admin-auth-forgot">Forgot Password?</Link>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary login-btn"
                                style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
                                disabled={loading}
                            >
                                {loading ? "Signing In..." : "Sign In to Dashboard"}
                            </button>
                        </form>

                        <div className="admin-auth-footer">
                            <p>Need access? <button onClick={switchToSignup} className="admin-auth-toggle-btn">Request here</button></p>
                        </div>
                    </div>

                    {/* Back: Signup */}
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

                        <form className="admin-auth-form" onSubmit={handleSignupSubmit}>
                            <div className="admin-form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    className="admin-auth-input"
                                    required
                                    value={signupData.name}
                                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                    disabled={loading}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="admin@abeerlabel.com"
                                    className="admin-auth-input"
                                    required
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                    disabled={loading}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="admin-auth-input"
                                    required
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                    disabled={loading}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary login-btn"
                                style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
                                disabled={loading}
                            >
                                {loading ? "Submitting Request..." : "Submit Request"}
                            </button>
                        </form>

                        <div className="admin-auth-footer">
                            <p>Already have access? <button onClick={switchToLogin} className="admin-auth-toggle-btn">Sign In</button></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
