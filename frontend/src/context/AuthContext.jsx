import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('nidwa_user')) || null);

    const login = async (username, password) => {
        const response = await axios.post('https://nidwa.com/api/auth/login', { username, password });
        setUser(response.data);
        localStorage.setItem('nidwa_user', JSON.stringify(response.data));
        return response.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nidwa_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
