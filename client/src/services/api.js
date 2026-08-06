import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Using Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login'; // Optional: Redirect to login
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const productsAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProductBySlug: (slug) => api.get(`/products/slug/${slug}`),
  getFeaturedProducts: () => api.get('/products?featured=true&limit=4'),
  getProductsByCategory: (category) => api.get(`/products?category=${category}`),
};

export const ordersAPI = {
  createOrder: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
};

export const usersAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  updatePassword: (data) => api.put('/users/password', data),
};

export const categoriesAPI = {
  getCategories: () => api.get('/categories'),
};

export default api;
