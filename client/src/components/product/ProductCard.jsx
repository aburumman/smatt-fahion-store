import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';
import Skeleton from '../ui/Skeleton';
import ProductQuickView from './ProductQuickView';

const ProductCard = ({ product, isLoading }) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  if (isLoading) {
    return <Skeleton variant="card" className="product-card" />;
  }

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          {product.isNew && <span className="badge badge-new">New</span>}
          {product.comparePrice > product.price && <span className="badge badge-sale">Sale</span>}
          
          <Link to={`/product/${product.slug}`}>
            <img src={product.images[0]} alt={product.name} loading="lazy" />
          </Link>
          
          <button 
            className="quick-add-btn"
            onClick={(e) => {
              e.preventDefault();
              setQuickViewOpen(true);
            }}
          >
            <FiShoppingBag /> Quick Add
          </button>
        </div>
        
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <Link to={`/product/${product.slug}`} className="product-name">
            {product.name}
          </Link>
          
          <div className="product-price-row">
            <span className="price">{formatCurrency(product.price)}</span>
            {product.comparePrice > product.price && (
              <span className="compare-price">{formatCurrency(product.comparePrice)}</span>
            )}
          </div>
          
          {product.colors && product.colors.length > 0 && (
            <div className="product-colors">
              {product.colors.slice(0, 4).map((color, index) => (
                <div 
                  key={index} 
                  className="color-swatch-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {quickViewOpen && (
        <ProductQuickView 
          product={product} 
          isOpen={quickViewOpen} 
          onClose={() => setQuickViewOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;
