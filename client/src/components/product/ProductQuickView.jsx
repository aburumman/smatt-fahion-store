import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick View">
      <div style={{ display: 'flex', gap: '2rem', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
        <div style={{ flex: 1 }}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', aspectRatio: '3/4' }}
          />
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h2>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatCurrency(product.price)}</div>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description || 'Premium quality materials crafted for longevity and style.'}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Size</div>
              <div className="size-grid">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div>
              <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Color</div>
              <div className="color-grid">
                {product.colors.map(color => (
                  <div 
                    key={color} 
                    className={`color-swatch-wrapper ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div className="color-swatch" style={{ backgroundColor: color }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button block onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline" block onClick={() => {
              onClose();
              navigate(`/product/${product.slug}`);
            }}>
              View Full Details
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickView;
