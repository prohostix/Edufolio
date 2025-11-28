import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication on app load
    useEffect(() => {
        checkAuth();
    }, []);

    // Set axios default header when authenticated
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [isAuthenticated]);

    const checkAuth = async () => {
        const token = localStorage.getItem('adminToken');
        const isAdmin = localStorage.getItem('isAdmin');
        
        if (!token || isAdmin !== 'true') {
            setLoading(false);
            return;
        }

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get(`${API_BASE}/admin/verify`);
            
            if (res.data.valid) {
                setAdmin(res.data.user);
                setIsAuthenticated(true);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Auth verification failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE}/admin/login`, { 
                email, 
                password 
            });
            
            const { token, user } = res.data;
            
            // Store in localStorage
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(user));
            localStorage.setItem('isAdmin', 'true');
            
            // Set axios header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Update state
            setAdmin(user);
            setIsAuthenticated(true);
            
            return { success: true, user };
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('isAdmin');
        
        // Clear axios header
        delete axios.defaults.headers.common['Authorization'];
        
        // Reset state
        setAdmin(null);
        setIsAuthenticated(false);
    };

    const updatePassword = async (currentPassword, newPassword) => {
        try {
            const res = await axios.put(`${API_BASE}/admin/password`, {
                currentPassword,
                newPassword
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            admin,
            loading,
            isAuthenticated,
            login,
            logout,
            checkAuth,
            updatePassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;