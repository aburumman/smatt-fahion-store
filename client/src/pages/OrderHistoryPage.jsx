import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency, formatDate } from '../utils/formatCurrency';
import Skeleton from '../components/ui/Skeleton';

const OrderHistoryPage = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      // Mock fetch orders
      const fetchOrders = async () => {
        setLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Mock data
          setOrders([
            {
              _id: 'ord-12345',
              createdAt: '2023-11-15T10:30:00Z',
              totalPrice: 429.98,
              isPaid: true,
              isDelivered: true,
              status: 'Delivered',
              shippingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
              orderItems: [
                { id: 1, name: 'Premium Leather Bag', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
                { id: 2, name: 'Silk Scarf', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
              ]
            },
            {
              _id: 'ord-12346',
              createdAt: '2023-12-01T14:45:00Z',
              totalPrice: 199.99,
              isPaid: true,
              isDelivered: false,
              status: 'Processing',
              shippingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
              orderItems: [
                { id: 3, name: 'Classic Chronograph', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
              ]
            }
          ]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchOrders();
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return <span className="badge badge-sage" style={{ position: 'static' }}>Delivered</span>;
      case 'Processing': return <span className="badge badge-gold" style={{ position: 'static', backgroundColor: 'var(--accent-gold)' }}>Processing</span>;
      default: return <span className="badge" style={{ position: 'static', backgroundColor: 'var(--text-muted)' }}>{status}</span>;
    }
  };

  return (
    <div className="container dashboard-layout" style={{ animation: 'fadeIn 0.5s ease' }}>
      <aside className="dashboard-sidebar">
        <nav className="dashboard-nav">
          <Link to="/profile"><FiUser /> Profile Settings</Link>
          <Link to="/orders" className="active"><FiPackage /> Order History</Link>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            style={{ 
              padding: '0.75rem 1rem', 
              background: 'none', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              color: '#dc2626',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>
      
      <main>
        <h1 style={{ marginBottom: '2rem' }}>Order History</h1>
        
        {loading ? (
          <div>
            <Skeleton variant="card" height={100} className="order-card" />
            <Skeleton variant="card" height={100} className="order-card" />
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <FiPackage size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3>No orders yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>When you place an order, it will appear here.</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div>
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div 
                  className="order-header" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="order-meta">
                    <div>
                      <span>Order Placed</span>
                      <strong>{formatDate(order.createdAt)}</strong>
                    </div>
                    <div>
                      <span>Total</span>
                      <strong>{formatCurrency(order.totalPrice)}</strong>
                    </div>
                    <div>
                      <span>Order #</span>
                      <strong>{order._id}</strong>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {getStatusBadge(order.status)}
                    {expandedOrder === order._id ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
                
                {expandedOrder === order._id && (
                  <div className="order-body" style={{ animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                      <div>
                        <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Items</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {order.orderItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                              <img src={item.image} alt={item.name} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500 }}>{item.name}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Qty: {item.quantity}</div>
                              </div>
                              <div style={{ fontWeight: 500 }}>{formatCurrency(item.price * item.quantity)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Shipping Address</h4>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                          {order.shippingAddress.street}<br />
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                          {order.shippingAddress.country}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderHistoryPage;
