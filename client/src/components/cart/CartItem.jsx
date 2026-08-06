import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity, size, color } = item;

  return (
    <div className="cart-item">
      <img src={product.images[0]} alt={product.name} className="cart-item-img" />
      
      <div className="cart-item-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 className="cart-item-title">{product.name}</h4>
            {(size || color) && (
              <div className="cart-item-variant">
                {size && <span>Size: {size}</span>}
                {size && color && <span> | </span>}
                {color && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Color: <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color, display: 'inline-block', border: '1px solid var(--border)' }} />
                  </span>
                )}
              </div>
            )}
          </div>
          <button className="remove-btn" onClick={() => onRemove(item.id)} aria-label="Remove item">
            <FiTrash2 size={18} />
          </button>
        </div>
        
        <div className="cart-item-bottom">
          <div className="qty-controls">
            <button 
              className="qty-btn" 
              onClick={() => onUpdateQuantity(item.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <FiMinus size={14} />
            </button>
            <span className="qty-value">{quantity}</span>
            <button 
              className="qty-btn" 
              onClick={() => onUpdateQuantity(item.id, quantity + 1)}
            >
              <FiPlus size={14} />
            </button>
          </div>
          <div className="cart-item-price">
            {formatCurrency(product.price * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
