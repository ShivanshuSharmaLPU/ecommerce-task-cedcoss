import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import { getCurrentUser, isAuthenticated } from './services/authService';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', or 'welcome'
  const [user, setUser] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setCurrentView('welcome');
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('welcome');
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setCurrentView('welcome');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="App">
      <div className="container">
        {currentView === 'welcome' && user ? (
          <Welcome user={user} onLogout={handleLogout} />
        ) : currentView === 'register' ? (
          <Register 
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={switchToLogin}
          />
        ) : (
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={switchToRegister}
          />
        )}
      </div>
    </div>
  );
}

export default App;
