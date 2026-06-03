import React from 'react';
import { logout } from '../services/authService';

const styles = `
  .welcome-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  .welcome-card {
    width: 100%;
    max-width: 480px;
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
    border-radius: 28px;
    background: linear-gradient(135deg,
      rgba(0,212,180,0.65) 0%,
      rgba(99,57,255,0.55) 50%,
      rgba(255,64,140,0.5) 100%
    );
    padding: 1px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .card-inner {
    background: #0a0c1e;
    border-radius: 28px;
    padding: 52px 48px 48px;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.06),
      0 40px 80px rgba(0,0,0,0.65),
      0 0 100px rgba(0,212,180,0.1),
      inset 0 1px 0 rgba(255,255,255,0.08);
    text-align: center;
  }

  .card-inner::before {
    content: '';
    position: absolute;
    top: -120px; right: -80px;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,180,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .card-inner::after {
    content: '';
    position: absolute;
    bottom: -100px; left: -60px;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,57,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .brand-name {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #34d9c3, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 36px;
    position: relative;
    z-index: 1;
  }

  .avatar-ring {
    position: relative;
    width: 88px;
    height: 88px;
    margin: 0 auto 24px;
    z-index: 1;
  }

  .avatar-ring::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d4b4, #6339ff, #ff408c);
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .avatar-inner {
    position: relative;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: rgba(10,12,30,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    z-index: 1;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.4);
  }

  .welcome-title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.9rem;
    font-weight: 700;
    color: #f0ecff;
    margin: 0 0 8px;
    position: relative;
    z-index: 1;
  }

  .welcome-sub {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.4);
    font-weight: 400;
    margin-bottom: 36px;
    position: relative;
    z-index: 1;
  }

  .section-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
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
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    white-space: nowrap;
  }

  .profile-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 4px 0;
    margin-bottom: 28px;
    text-align: left;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .profile-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,212,180,0.3), transparent);
  }

  .profile-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.2s;
  }

  .profile-row:last-child { border-bottom: none; }
  .profile-row:hover { background: rgba(255,255,255,0.025); }

  .row-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

  .row-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .row-dot.teal   { background: #00d4b4; box-shadow: 0 0 6px rgba(0,212,180,0.6); }
  .row-dot.purple { background: #a78bfa; box-shadow: 0 0 6px rgba(167,139,250,0.6); }
  .row-dot.pink   { background: #f472b6; box-shadow: 0 0 6px rgba(244,114,182,0.6); }

  .row-value {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.75);
    font-weight: 400;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row-value.mono {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    color: rgba(0,212,180,0.7);
    letter-spacing: 0.04em;
  }

  .logout-btn {
    width: 100%;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 14px 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .logout-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06));
    opacity: 0;
    transition: opacity 0.25s;
  }

  .logout-btn:hover::before { opacity: 1; }

  .logout-btn:hover {
    border-color: rgba(239,68,68,0.5);
    color: #fca5a5;
    box-shadow: 0 4px 20px rgba(239,68,68,0.15);
  }

  .logout-btn:active { transform: scale(0.99); }
`;

function Welcome({ user, onLogout }) {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      <style>{styles}</style>
      <div className="welcome-root">
        <div className="welcome-card">
          <div className="card-glow" />
          <div className="card-inner">
            <div className="brand-name">MyStore</div>

            <div className="avatar-ring">
              <div className="avatar-inner">{initials}</div>
            </div>

            <h1 className="welcome-title">Welcome back!</h1>
            <p className="welcome-sub">You're successfully signed in, {user.name}.</p>

            <div className="section-label"><span>Your Profile</span></div>

            <div className="profile-card">
              <div className="profile-row">
                <span className="row-label">
                  <span className="row-dot teal" />
                  Name
                </span>
                <span className="row-value">{user.name}</span>
              </div>
              <div className="profile-row">
                <span className="row-label">
                  <span className="row-dot purple" />
                  Email
                </span>
                <span className="row-value">{user.email}</span>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;