"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './login.css';
import { FiLock, FiMail } from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('mdsaquib5540@gmail.com');
  const [password, setPassword] = useState('mdsaquib5540');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend is on port 4000
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/crm/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('crm_token', res.data.token);
        localStorage.setItem('crm_user', JSON.stringify(res.data.user));
        router.push('/dashboard/customers');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>CRM Admin Portal</h2>
          <p>Login to access customer analytics</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
