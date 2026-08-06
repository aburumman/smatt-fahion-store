import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, columns = 4 }) => {
  if (loading) {
    return (
      <div className={`product-grid-${columns}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCard key={i} isLoading={true} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <h3 style={{ marginBottom: '1rem' }}>No products found</h3>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className={`product-grid-${columns}`}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
