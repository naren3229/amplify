'use client';
/*
 * AuthContext keeps track of who's logged in and helps manage login state.
 * 
 * Here's what it does:
 * - Saves login status and user info using React context.
 * - Remembers that info in localStorage so it sticks after a page reload.
 * - Gives you easy-to-use `login` and `logout` functions.
 * - Shows a loading state while it checks if someone’s already signed in.
 * 
 * How to use it:
 * Wrap your app with <AuthProvider>, then call `useAuth` anywhere you need login details or actions.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

   
  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@nurtur.tech' && password === 'Password@123') {
        const userData = { email, name: 'Admin User' };
        const token = 'demo-jwt-token';
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setIsAuthenticated(true);
        setUser(userData);
        return true;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
 
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};