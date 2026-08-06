import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import CartSummary from '../components/cart/CartSummary';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { ordersAPI } from '../services/api';

const CheckoutPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { cartItems, clearCart, total } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: '', city: '', state: '', zip: '', country: 'US'
  });
  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=/checkout');
      toast.error('Please log in to checkout');
    }
    if (cartItems.length === 0 && step !== 4) {
      navigate('/shop');
    }
  }, [user, authLoading, cartItems, navigate, step]);

  if (authLoading || !user) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading...</div>;

  const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => setPayment({ ...payment, [e.target.name]: e.target.value });

  const submitAddress = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const submitPayment = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      // Mock API call to create order
      // const res = await ordersAPI.createOrder({ orderItems: cartItems, shippingAddress: address, paymentMethod: 'Card', totalPrice: total });
      
      // Simulate network
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      clearCart();
      setStep(4); // Success
      window.scrollTo(0, 0);
    } catch (err) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (step === 4) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--accent-sage)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2.5rem' }}>
          <FiCheck />
        </div>
        <h1 style={{ marginBottom: '1rem' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button onClick={() => navigate('/orders')}>View Orders</Button>
          <Button variant="outline" onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page" style={{ padding: '3rem 0', animation: 'fadeIn 0.5s ease' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-circle">{step > 1 ? <FiCheck /> : '1'}</div>
          <span>Shipping</span>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-circle">{step > 2 ? <FiCheck /> : '2'}</div>
          <span>Payment</span>
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-circle">3</div>
          <span>Review</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '2fr 1fr' : '1fr', gap: '3rem' }}>
        <div>
          {step === 1 && (
            <div className="checkout-section">
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Shipping Address</h2>
              <form onSubmit={submitAddress}>
                <Input label="Street Address" name="street" value={address.street} onChange={handleAddressChange} required />
                <div className="form-row">
                  <Input label="City" name="city" value={address.city} onChange={handleAddressChange} required />
                  <Input label="State / Province" name="state" value={address.state} onChange={handleAddressChange} required />
                </div>
                <div className="form-row">
                  <Input label="ZIP / Postal Code" name="zip" value={address.zip} onChange={handleAddressChange} required />
                  <Input label="Country" name="country" value={address.country} onChange={handleAddressChange} required />
                </div>
                <Button type="submit" size="lg" style={{ marginTop: '1rem' }}>Continue to Payment</Button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Payment Method</h2>
                <button className="btn-ghost" onClick={() => setStep(1)} style={{ fontSize: '0.875rem' }}>Edit Shipping</button>
              </div>
              <form onSubmit={submitPayment}>
                <Input label="Name on Card" name="cardName" value={payment.cardName} onChange={handlePaymentChange} required />
                <Input label="Card Number" name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} required maxLength="19" placeholder="xxxx xxxx xxxx xxxx" />
                <div className="form-row">
                  <Input label="Expiry Date (MM/YY)" name="expiry" value={payment.expiry} onChange={handlePaymentChange} required maxLength="5" placeholder="MM/YY" />
                  <Input label="CVV" name="cvv" type="password" value={payment.cvv} onChange={handlePaymentChange} required maxLength="4" />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" size="lg" style={{ flex: 1 }}>Review Order</Button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-section">
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Review Your Order</h2>
              
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Shipping To</h3>
                    <button className="btn-ghost" onClick={() => setStep(1)} style={{ fontSize: '0.875rem', padding: 0 }}>Edit</button>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    {user.name}<br />
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}<br />
                    {address.country}
                  </div>
                </div>
                
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Payment</h3>
                    <button className="btn-ghost" onClick={() => setStep(2)} style={{ fontSize: '0.875rem', padding: 0 }}>Edit</button>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    Card ending in {payment.cardNumber.slice(-4) || '****'}<br />
                    Expires: {payment.expiry}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Items</h3>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <img src={item.product.images[0]} alt={item.product.name} style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{item.product.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Qty: {item.quantity} | {item.size && `Size: ${item.size}`}
                      </div>
                    </div>
                    <div style={{ fontWeight: 500 }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button size="lg" style={{ flex: 1 }} onClick={placeOrder} loading={loading}>
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <CartSummary isCheckout={true} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
