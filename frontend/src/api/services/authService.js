import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Changed to match backend

export const authService = {
    register: async (userData) => {
        try {
            console.log('Sending register request:', userData); // Debug log
            const response = await axios.post(`${API_URL}/register`, userData);
            console.log('Register response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Register error:', error.response?.data || error.message);
            throw error.response?.data || error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};