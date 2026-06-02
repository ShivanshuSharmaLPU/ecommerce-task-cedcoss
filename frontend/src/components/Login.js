import React, { useState } from 'react';
import { login } from '../services/authService';
import { validateEmail, validatePassword } from '../utils/validation';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    background: #0b0c10;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .auth-root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,145,80,0.08) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    pointer-events: none;
  }

  .auth-root::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,145,80,0.05) 0%, transparent 70%);
    bottom: -80px;
    left: -80px;
    pointer-events: none;
  }

  .auth-card {
    width: 420px;
    background: #13141a;
    border: 1px solid rgba(180,145,80,0.2);
    border-radius: 2px;
    padding: 52px 48px;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03);
    animation: cardFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardFadeIn {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .auth-card::before {
    content: '';
    position: absolute;
    top: 0; left: 48px; right: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(180,145,80,0.6), transparent);
  }

  .logo {
    text-align: center;
    margin-bottom: 36px;
  }

  .logo h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.3em;
    color: #b49150;
    text-transform: uppercase;
    margin: 0 0 4px;
  }

  .logo p {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    margin: 0;
    font-weight: 300;
  }

  .divider-line {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
  }

  .divider-line span {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  .divider-line em {
    font-style: normal;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
  }

  .form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #e8e0d0;
    margin: 0 0 28px;
    letter-spacing: 0.02em;
  }

  .error-alert {
    background: rgba(220, 60, 60, 0.1);
    border: 1px solid rgba(220, 60, 60, 0.3);
    border-left: 3px solid #dc3c3c;
    color: #f08080;
    padding: 12px 16px;
    font-size: 0.8rem;
    margin-bottom: 24px;
    border-radius: 1px;
    letter-spacing: 0.02em;
  }

  .form-group {
    margin-bottom: 22px;
    position: relative;
  }

  .form-group label {
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 8px;
    font-weight: 400;
  }

  .form-group input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 1px;
    padding: 13px 16px;
    color: #e8e0d0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    transition: all 0.25s ease;
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
  }

  .form-group input::placeholder {
    color: rgba(255,255,255,0.18);
  }

  .form-group input:focus {
    border-color: rgba(180,145,80,0.5);
    background: rgba(180,145,80,0.04);
    box-shadow: 0 0 0 3px rgba(180,145,80,0.08);
  }

  .form-group input.error {
    border-color: rgba(220,60,60,0.5);
    background: rgba(220,60,60,0.04);
  }

  .error-message {
    display: block;
    font-size: 0.72rem;
    color: #f08080;
    margin-top: 6px;
    letter-spacing: 0.02em;
  }

  .btn {
    width: 100%;
    background: linear-gradient(135deg, #b49150 0%, #d4aa6a 50%, #b49150 100%);
    background-size: 200% 200%;
    border: none;
    border-radius: 1px;
    padding: 15px 24px;
    color: #0b0c10;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn:hover:not(:disabled) {
    background-position: right center;
    box-shadow: 0 8px 32px rgba(180,145,80,0.3);
    transform: translateY(-1px);
  }

  .btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .switch-auth {
    text-align: center;
    margin-top: 28px;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.02em;
  }

  .switch-auth button {
    background: none;
    border: none;
    color: #b49150;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    padding: 0;
    margin-left: 6px;
    text-decoration: underline;
    text-decoration-color: rgba(180,145,80,0.4);
    text-underline-offset: 3px;
    transition: color 0.2s;
    letter-spacing: 0.02em;
  }

  .switch-auth button:hover {
    color: #d4aa6a;
  }
`;

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    setApiError('');
    try {
      const response = await login(formData.email, formData.password);
      onLoginSuccess(response.user);
    } catch (error) {
      setApiError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="logo">
            <h1>MyStore</h1>
            <p>Your trusted e-commerce platform</p>
          </div>

          <div className="divider-line">
            <span /><em>Sign In</em><span />
          </div>

          <h2 className="form-title">Welcome Back</h2>

          {apiError && <div className="error-alert">{apiError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" name="password"
                value={formData.password} onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="switch-auth">
            Don't have an account?
            <button onClick={onSwitchToRegister}>Register here</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;