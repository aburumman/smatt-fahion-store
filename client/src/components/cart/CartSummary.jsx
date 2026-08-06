import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../ui/Button';

const CartSummary = ({ isCheckout = false }) => {
  const { subtotal, tax, shippingCost, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="order-summary">
      <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
      
      <div className="summary-row">
        <span>Subtotal</span>
        <span style={{ color: 'var(--text-primary)' }}>{formatCurrency(subtotal)}</span>
      </div>
      
      <div className="summary-row">
        <span>Estimated Tax</span>
        <span style={{ color: 'var(--text-primary)' }}>{formatCurrency(tax)}</span>
      </div>
      
      <div className="summary-row">
        <span>Shipping</span>
        <span style={{ color: 'var(--text-primary)' }}>
          {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
        </span>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {!isCheckout && (
        <Button 
          block 
          size="lg" 
          onClick={() => navigate('/checkout')}
          style={{ marginTop: '1rem' }}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
