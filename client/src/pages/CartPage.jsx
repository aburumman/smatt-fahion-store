import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <FiShoppingBag size={80} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: '2rem' }} />
          <h1 style={{ marginBottom: '1rem' }}>Your cart is empty</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            Looks like you haven't added anything to your cart yet. Let's change that!
          </p>
          <Button size="lg" block onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Shopping Cart ({cartItems.length})</h1>
      
      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-large">
              <img src={item.product.images[0]} alt={item.product.name} className="cart-item-img" />
              
              <div className="cart-item-info">
                <div>
                  <Link to={`/product/${item.product.slug}`} className="cart-item-title" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {item.product.name}
                  </Link>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {item.size && <div>Size: {item.size}</div>}
                    {item.color && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                        Color: <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: item.color, border: '1px solid var(--border)' }} />
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                  <div className="qty-controls" style={{ height: '36px' }}>
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{ width: '36px', height: '100%' }}
                    >
                      -
                    </button>
                    <span className="qty-value" style={{ width: '40px' }}>{item.quantity}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ width: '36px', height: '100%' }}
                    >
                      +
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
