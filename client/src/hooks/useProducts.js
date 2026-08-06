import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialParams.page || 1);

  // Allow passing query parameters
  const fetchProducts = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Create mock data if API fails or for demo
      const mockProducts = Array.from({ length: 8 }).map((_, i) => ({
        _id: `prod-${i}`,
        name: `Luxury Item ${i + 1}`,
        slug: `luxury-item-${i + 1}`,
        price: 99.99 + (i * 10),
        category: 'Accessories',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
        rating: 4.5,
        numReviews: 12,
        isNew: i % 3 === 0,
        isFeatured: true
      }));

      try {
        const res = await productsAPI.getProducts({ page: currentPage, ...params });
        setProducts(res.data.products || res.data);
        setTotalPages(res.data.pages || 1);
        setCurrentPage(res.data.page || 1);
      } catch (apiErr) {
        console.warn('API fetch failed, using mock data:', apiErr);
        setProducts(mockProducts);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(initialParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, JSON.stringify(initialParams)]);

  return { 
    products, 
    loading, 
    error, 
    totalPages, 
    currentPage, 
    setCurrentPage,
    refetch: fetchProducts 
  };
};
