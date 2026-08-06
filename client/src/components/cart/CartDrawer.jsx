import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };
  
  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <>
      <div 
        className={`drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      
      <div className="cart-drawer">
        <div className="drawer-header">
          <h3>Your Cart ({cartItems.length})</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="shipping-progress">
          <div className="progress-text">
            {amountToFreeShipping > 0 
              ? `You're ${formatCurrency(amountToFreeShipping)} away from Free Shipping!`
              : "🎉 You've unlocked Free Shipping!"}
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="drawer-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-muted)' }}>
              <FiShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h4>Your cart is empty</h4>
              <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                Looks like you haven't added anything yet.
              </p>
              <Button onClick={() => { onClose(); navigate('/shop'); }}>
                Start Shopping
              </Button>
            </div>
          ) : (
            cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
              Shipping, taxes, and discount codes calculated at checkout.
            </p>
            <div className="drawer-actions">
              <Button block onClick={handleCheckout}>Checkout</Button>
              <Button variant="outline" block onClick={handleViewCart}>View Cart</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
