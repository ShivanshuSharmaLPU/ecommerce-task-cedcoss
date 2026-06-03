import React, { useState } from 'react';
import { register } from '../services/authService';
import { validateEmail, validatePassword, validateName } from '../utils/validation';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Syne:wght@400;600;700&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  .auth-card {
    width: 100%;
    max-width: 440px;
    position: relative;
    animation: floatIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes floatIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  .card-glow {
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    background: linear-gradient(135deg,
      rgba(99,57,255,0.7) 0%,
      rgba(0,212,180,0.5) 50%,
      rgba(255,64,140,0.6) 100%
    );
    padding: 1px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .card-inner {
    background: #0a0c1e;
    border-radius: 24px;
    padding: 48px 44px 44px;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.06),
      0 40px 80px rgba(0,0,0,0.6),
      0 0 80px rgba(99,57,255,0.12),
      inset 0 1px 0 rgba(255,255,255,0.08);
  }

  .card-inner::before {
    content: '';
    position: absolute;
    top: -120px; right: -80px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,57,255,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .card-inner::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,180,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .logo-wrap {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
  }

  .logo-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 16px;
    border-radius: 16px;
    background: linear-gradient(135deg, #6339ff, #00d4b4);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(99,57,255,0.45), 0 0 0 1px rgba(255,255,255,0.1);
    font-size: 24px;
  }

  .logo-name {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    background: linear-gradient(135deg, #a78bfa, #34d9c3, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 12px;
  }

  .logo-sub {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .section-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
    position: relative;
    z-index: 1;
  }

  .section-label::before,
  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }

  .section-label span {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    white-space: nowrap;
  }

  .form-heading {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #f0ecff;
    margin: 0 0 28px;
    position: relative;
    z-index: 1;
  }

  .error-alert {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-left: 3px solid #ef4444;
    color: #fca5a5;
    padding: 12px 16px;
    font-size: 0.82rem;
    margin-bottom: 24px;
    border-radius: 8px;
    position: relative;
    z-index: 1;
  }

  .form-group {
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .form-group label {
    display: block;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 8px;
  }

  .form-group input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 13px 16px;
    color: #f0ecff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.92rem;
    font-weight: 400;
    transition: all 0.25s ease;
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
  }

  .form-group input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .form-group input:hover {
    border-color: rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.07);
  }

  .form-group input:focus {
    border-color: rgba(99,57,255,0.7);
    background: rgba(99,57,255,0.06);
    box-shadow:
      0 0 0 3px rgba(99,57,255,0.15),
      0 0 20px rgba(99,57,255,0.1);
  }

  .form-group input.input-error {
    border-color: rgba(239,68,68,0.6);
    background: rgba(239,68,68,0.05);
  }

  .error-msg {
    display: block;
    font-size: 0.74rem;
    color: #fca5a5;
    margin-top: 6px;
    padding-left: 2px;
  }

  .submit-btn {
    width: 100%;
    position: relative;
    margin-top: 10px;
    border: none;
    border-radius: 12px;
    padding: 14px 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 1;
    background: linear-gradient(135deg, #6339ff 0%, #4f8bff 50%, #00d4b4 100%);
    color: #fff;
    box-shadow:
      0 4px 24px rgba(99,57,255,0.5),
      0 1px 0 rgba(255,255,255,0.15) inset;
  }

  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .submit-btn:hover:not(:disabled)::before { opacity: 1; }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 8px 40px rgba(99,57,255,0.6),
      0 1px 0 rgba(255,255,255,0.15) inset;
  }

  .submit-btn:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 12px rgba(99,57,255,0.4);
  }

  .submit-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .switch-auth {
    text-align: center;
    margin-top: 26px;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.35);
    position: relative;
    z-index: 1;
  }

  .switch-auth button {
    background: none;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #a78bfa;
    cursor: pointer;
    margin-left: 5px;
    padding: 0;
    transition: color 0.2s;
  }

  .switch-auth button:hover {
    color: #c4b5fd;
  }
`;

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
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
      const response = await register(formData.name, formData.email, formData.password);
      onRegisterSuccess(response.user);
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="card-glow" />
          <div className="card-inner">
            <div className="logo-wrap">
              <div className="logo-icon">🛍️</div>
              <div className="logo-name">MyStore</div>
              <div className="logo-sub">Your trusted e-commerce platform</div>
            </div>

            <div className="section-label"><span>Create Account</span></div>

            {apiError && <div className="error-alert">{apiError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  className={errors.name ? 'input-error' : ''}
                  placeholder="Your full name"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password" id="password" name="password"
                  value={formData.password} onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  placeholder="Min 6 characters"
                />
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>

            <div className="switch-auth">
              Already have an account?
              <button onClick={onSwitchToLogin}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;