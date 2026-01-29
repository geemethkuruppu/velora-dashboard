const BASE_URL = 'http://localhost:8001/products';
const AUTH_URL = 'http://localhost:8000/auth';

const getHeaders = () => {
    const savedUser = localStorage.getItem('velora_admin_user');
    const token = savedUser ? JSON.parse(savedUser).token : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const productService = {
    getAll: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${BASE_URL}/?${queryParams}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch product');
        return response.json();
    },

    getCategories: async () => {
        const response = await fetch(`${BASE_URL}/categories`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },

    createCategory: async (categoryData) => {
        const response = await fetch(`${BASE_URL}/categories`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(categoryData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create category');
        }
        return response.json();
    },

    deleteCategory: async (id) => {
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to delete category');
        }
        if (response.status === 204) return null;
        return response.json();
    },

    create: async (productData) => {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create product');
        }
        return response.json();
    },

    update: async (id, productData) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to update product');
        }
        return response.json();
    },

    deactivate: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}/deactivate`, {
            method: 'PATCH',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to deactivate product');
        return response.json();
    },

    activate: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}/activate`, {
            method: 'PATCH',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to activate product');
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete product');
        if (response.status === 204) return null;
        return response.json();
    },

    updateStock: async (id, change) => {
        const response = await fetch(`${BASE_URL}/${id}/stock`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ change })
        });
        if (!response.ok) throw new Error('Failed to update stock');
        return response.json();
    },

    getLowStock: async (threshold = 10) => {
        const response = await fetch(`${BASE_URL}/low-stock?threshold=${threshold}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch low stock products');
        return response.json();
    },

    uploadMedia: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const savedUser = localStorage.getItem('velora_admin_user');
        const token = savedUser ? JSON.parse(savedUser).token : null;

        const response = await fetch(`${BASE_URL}/upload-media`, {
            method: 'POST',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: formData
        });

        if (!response.ok) throw new Error('Failed to upload media');
        return response.json();
    }
};
