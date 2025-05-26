import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Registered successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage(data.message || '❌ Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('❌ Server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-header">Sign Up</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Sign Up'}
          </button>

          <p className="login-text">
            Already have an account? <Link to="/">Login</Link>
          </p>

          {message && (
            <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}