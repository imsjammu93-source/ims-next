'use client';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve stored token and user info on mount
        const storedToken = localStorage.getItem('adminToken');
        const storedUser = localStorage.getItem('adminUser');
        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parsing stored user", e);
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const api = (await import('@/lib/api')).default;
            const res = await api.post('/login.php', { username, password });
            
            if (res.data?.success) {
                const userData = res.data.user;
                const jwtToken = res.data.token;
                
                setUser(userData);
                setToken(jwtToken);
                localStorage.setItem('adminToken', jwtToken);
                localStorage.setItem('adminUser', JSON.stringify(userData));
                return { success: true };
            } else {
                return { success: false, message: res.data?.message || 'Login failed' };
            }
        } catch (error) {
            console.error("Login error", error);
            return { success: false, message: 'Unable to connect to server' };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
