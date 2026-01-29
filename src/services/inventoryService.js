import axios from 'axios';

// Inventory Service URL
// In production, this would be behind a gateway
const INVENTORY_SERVICE_URL = 'http://localhost:8004/inventory';

const api = axios.create({
    baseURL: INVENTORY_SERVICE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const InventoryService = {
    // Get all inventory items with optional filters
    getInventory: async (lowStockOnly = false) => {
        try {
            const params = lowStockOnly ? { low_stock: true } : {};
            const response = await api.get('', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    },

    // Get dashboard stats
    getStats: async () => {
        try {
            const response = await api.get('/stats');
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory stats:', error);
            throw error;
        }
    },

    // Get all reservations
    getReservations: async () => {
        try {
            const response = await api.get('/reservations');
            return response.data;
        } catch (error) {
            console.error('Error fetching reservations:', error);
            throw error;
        }
    },

    // Get all events
    getEvents: async () => {
        try {
            const response = await api.get('/events');
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    // Get single variant (if needed)
    getVariant: async (variantId) => {
        try {
            const response = await api.get(`/variant/${variantId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching variant:', error);
            throw error;
        }
    }
};

export default InventoryService;
