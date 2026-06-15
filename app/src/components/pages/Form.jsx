import React from 'react';
import Link from 'next/link';

const Form = ({ isLogin, setIsLogin }) => {
    return (
        <div className="auth-scene">
            <div className={`auth-card ${isLogin ? '' : 'is-flipped'}`}>

                <div className="auth-face auth-front">
                    <div className="auth-header">
                        <h2 className="auth-title">Welcome Back</h2>
                        <p className="auth-subtitle">Sign in to access your Abeer Label account.</p>
                    </div>
                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" className="co-input" required />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="co-input" required />
                        </div>
                        <div className="auth-actions">
                            <label className="auth-remember">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link href="#" className="auth-forgot">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="button-primary">Log In</button>
                    </form>
                    <div className="auth-footer">
                        <p>Don't have an account? <button onClick={() => setIsLogin(false)} className="auth-toggle-btn">Create one</button></p>
                    </div>
                </div>

                <div className="auth-face auth-back">
                    <div className="auth-header">
                        <h2 className="auth-title">Create Account</h2>
                        <p className="auth-subtitle">Join the exclusive Abeer Label community.</p>
                    </div>
                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-grid">
                            <div className="form-group">
                                <input type="text" placeholder="First Name" className="co-input" required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Last Name" className="co-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" className="co-input" required />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="co-input" required />
                        </div>
                        <button type="submit" className="button-primary">Sign Up</button>
                    </form>
                    <div className="auth-footer">
                        <p>Already have an account? <button onClick={() => setIsLogin(true)} className="auth-toggle-btn">Log In</button></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Form;