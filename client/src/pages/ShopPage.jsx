import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { useProducts } from '../hooks/useProducts';
import Button from '../components/ui/Button';

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [filters, setFilters] = useState({
    categories: queryParams.get('category') ? [queryParams.get('category')] : [],
    minPrice: '',
    maxPrice: '',
    sizes: [],
    colors: []
  });
  const [sort, setSort] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const { products, loading, totalPages, currentPage, setCurrentPage } = useProducts({
    ...filters,
    sort,
    page: 1 // Reset to page 1 on filter change
  });

  const allCategories = ['Clothing', 'Accessories', 'Jewelry', 'Watches', 'Bags', 'Shoes'];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Optional: update URL with primary category
    if (newFilters.categories?.length === 1) {
      navigate(`/shop?category=${newFilters.categories[0]}`, { replace: true });
    } else if (newFilters.categories?.length === 0) {
      navigate('/shop', { replace: true });
    }
  };

  const removeFilter = (type, value) => {
    if (type === 'category') {
      handleFilterChange({ ...filters, categories: filters.categories.filter(c => c !== value) });
    } else if (type === 'size') {
      handleFilterChange({ ...filters, sizes: filters.sizes.filter(s => s !== value) });
    } else if (type === 'color') {
      handleFilterChange({ ...filters, colors: filters.colors.filter(c => c !== value) });
    } else if (type === 'price') {
      handleFilterChange({ ...filters, minPrice: '', maxPrice: '' });
    }
  };

  return (
    <div className="container shop-page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="shop-header" style={{ marginTop: '2rem' }}>
        <div className="shop-title">
          <h1>{filters.categories?.length === 1 ? filters.categories[0] : 'All Products'}</h1>
          <p>Showing {products.length} results</p>
        </div>
        
        <div className="shop-controls">
          <button 
            className="btn btn-outline mobile-filter-btn"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FiFilter /> Filters
          </button>
          
          <select 
            className="sort-select" 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="active-filters">
        {filters.categories?.map(cat => (
          <div key={`cat-${cat}`} className="filter-chip">
            {cat} <button onClick={() => removeFilter('category', cat)}><FiX /></button>
          </div>
        ))}
        {filters.sizes?.map(size => (
          <div key={`size-${size}`} className="filter-chip">
            Size: {size} <button onClick={() => removeFilter('size', size)}><FiX /></button>
          </div>
        ))}
        {filters.colors?.map(color => (
          <div key={`color-${color}`} className="filter-chip">
            Color: <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, display: 'inline-block', margin: '0 4px', border: '1px solid var(--border)' }} /> 
            <button onClick={() => removeFilter('color', color)}><FiX /></button>
          </div>
        ))}
        {(filters.minPrice || filters.maxPrice) && (
          <div className="filter-chip">
            Price: ${filters.minPrice || '0'} - ${filters.maxPrice || 'Any'}
            <button onClick={() => removeFilter('price')}><FiX /></button>
          </div>
        )}
      </div>

      <div className="shop-layout">
        {/* Desktop Sidebar */}
        <ProductFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          categories={allCategories}
        />

        {/* Mobile Filters Overlay */}
        {mobileFiltersOpen && (
          <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'var(--bg-card)', zIndex: 100, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0 }}>Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                <FiX />
              </button>
            </div>
            
            <div style={{ flex: 1 }}>
              <ProductFilters 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                categories={allCategories}
              />
            </div>
            
            <div style={{ position: 'sticky', bottom: 0, padding: '1rem 0', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
              <Button block onClick={() => setMobileFiltersOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="shop-main">
          <ProductGrid products={products} loading={loading} columns={3} />
          
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i} 
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className="page-btn" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
