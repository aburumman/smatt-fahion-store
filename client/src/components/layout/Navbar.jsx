import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import CartDrawer from '../cart/CartDrawer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const categories = ['Clothing', 'Accessories', 'Jewelry', 'Watches'];

  return (
    <>
      <div className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="announcement-bar">
          <p>Free Shipping on orders over $75! Use code SMATT20 for 20% off.</p>
        </div>
        
        <nav className="navbar container">
          <button className="hamburger" onClick={() => setMobileMenuOpen(true)}>
            <FiMenu />
          </button>

          <Link to="/" className="nav-logo">
            Smatt <span>Fashion</span>
          </Link>

          <div className="nav-links">
            <Link to="/shop" className="nav-link">Shop</Link>
            {categories.map(cat => (
              <Link key={cat} to={`/shop?category=${cat}`} className="nav-link">
                {cat}
              </Link>
            ))}
          </div>

          <div className="nav-icons">
            <button className="btn-ghost" aria-label="Search" onClick={() => navigate('/shop')}>
              <FiSearch size={20} />
            </button>
            
            <div style={{ position: 'relative' }}>
              <button 
                className="btn-ghost" 
                aria-label="User"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <FiUser size={20} />
              </button>
              
              {userDropdownOpen && (
                <div className="dropdown-menu" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-md)',
                  width: '150px',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {user ? (
                    <>
                      <Link to="/profile" className="dropdown-item" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }} onClick={() => setUserDropdownOpen(false)}>Profile</Link>
                      <Link to="/orders" className="dropdown-item" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }} onClick={() => setUserDropdownOpen(false)}>Orders</Link>
                      <button onClick={handleLogout} style={{ padding: '0.75rem 1rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626' }}>
                        <FiLogOut /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-item" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }} onClick={() => setUserDropdownOpen(false)}>Login</Link>
                      <Link to="/register" className="dropdown-item" style={{ padding: '0.75rem 1rem' }} onClick={() => setUserDropdownOpen(false)}>Register</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button 
              className="btn-ghost cart-icon-wrapper" 
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'var(--bg-card)', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>Smatt <span>Fashion</span></Link>
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              <FiX />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem' }}>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop All</Link>
            {categories.map(cat => (
              <Link key={cat} to={`/shop?category=${cat}`} onClick={() => setMobileMenuOpen(false)}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
