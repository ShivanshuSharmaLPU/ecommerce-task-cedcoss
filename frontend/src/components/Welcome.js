import React from 'react';
import { logout } from '../services/authService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

  .welcome-root {
    min-height: 100vh;
    background: #0b0c10;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .welcome-root::before {
    content: '';
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,145,80,0.07) 0%, transparent 70%);
    top: -150px;
    right: -150px;
    pointer-events: none;
  }

  .welcome-root::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,145,80,0.05) 0%, transparent 70%);
    bottom: -100px;
    left: -100px;
    pointer-events: none;
  }

  .welcome-container {
    width: 480px;
    background: #13141a;
    border: 1px solid rgba(180,145,80,0.2);
    border-radius: 2px;
    padding: 56px 52px;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03);
    animation: cardFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    text-align: center;
  }

  @keyframes cardFadeIn {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .welcome-container::before {
    content: '';
    position: absolute;
    top: 0; left: 52px; right: 52px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(180,145,80,0.6), transparent);
  }

  .store-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.35em;
    color: #b49150;
    text-transform: uppercase;
    margin: 0 0 40px;
  }

  .welcome-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    background: rgba(180,145,80,0.08);
    border: 1px solid rgba(180,145,80,0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    animation: iconPop 0.5s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes iconPop {
    from { opacity: 0; transform: scale(0.6); }
    to { opacity: 1; transform: scale(1); }
  }

  .welcome-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem;
    font-weight: 400;
    color: #e8e0d0;
    margin: 0 0 10px;
    letter-spacing: 0.02em;
  }

  .welcome-message {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.4);
    margin: 0 0 40px;
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }

  .divider span {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  .divider em {
    font-style: normal;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
  }

  .user-info {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 2px;
    padding: 24px 28px;
    margin-bottom: 36px;
    text-align: left;
  }

  .user-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .user-detail:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .user-detail:first-child {
    padding-top: 0;
  }

  .user-detail .detail-label {
    font-size: 0.67rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    font-weight: 400;
  }

  .user-detail .detail-value {
    font-size: 0.85rem;
    color: #c8bfa8;
    font-weight: 300;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }

  .detail-value.id-value {
    font-family: 'DM Sans', monospace;
    font-size: 0.75rem;
    color: rgba(180,145,80,0.7);
    letter-spacing: 0.04em;
  }

  .logout-btn {
    width: 100%;
    background: transparent;
    border: 1px solid rgba(180,145,80,0.4);
    border-radius: 1px;
    padding: 14px 24px;
    color: #b49150;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .logout-btn:hover {
    background: rgba(180,145,80,0.08);
    border-color: rgba(180,145,80,0.7);
    color: #d4aa6a;
    box-shadow: 0 4px 20px rgba(180,145,80,0.15);
  }

  .logout-btn:active {
    transform: translateY(1px);
  }
`;

function Welcome({ user, onLogout }) {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="welcome-root">
        <div className="welcome-container">
          <div className="store-brand">MyStore</div>

          <div className="welcome-icon">👋</div>
          <h1 className="welcome-title">Welcome Back</h1>
          <p className="welcome-message">Hello, {user.name}! You're successfully signed in.</p>

          <div className="divider">
            <span /><em>Your Profile</em><span />
          </div>

          <div className="user-info">
            <div className="user-detail">
              <span className="detail-label">Name</span>
              <span className="detail-value">{user.name}</span>
            </div>
            <div className="user-detail">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="user-detail">
              <span className="detail-label">Account ID</span>
              <span className="detail-value id-value">{user.id}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Welcome;