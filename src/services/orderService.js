import axios from 'axios';

// Get base URL from environment or default to local service
// In production this would be the gateway or consolidated API URL
// For now, pointing directly to order-service port 8002 via proxy or direct
const ORDER_SERVICE_URL = 'http://localhost:8002/orders'; 

// Create axios instance
const api = axios.create({
    baseURL: ORDER_SERVICE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor for auth token (if needed later)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const OrderService = {
    getAllOrders: async () => {
        try {
            const response = await api.get('');
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    getOrderDetails: async (orderId) => {
        try {
            const response = await api.get(`/${orderId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching order ${orderId}:`, error);
            throw error;
        }
    }
};

export default OrderService;
