import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Shop</h4>
            <div className="footer-links">
              <Link to="/shop?category=Clothing">Clothing</Link>
              <Link to="/shop?category=Accessories">Accessories</Link>
              <Link to="/shop?category=Jewelry">Jewelry</Link>
              <Link to="/shop?category=Watches">Watches</Link>
              <Link to="/shop?sale=true">Sale</Link>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/stores">Store Locations</Link>
              <Link to="/sustainability">Sustainability</Link>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Support</h4>
            <div className="footer-links">
              <Link to="/faq">FAQ</Link>
              <Link to="/shipping">Shipping Info</Link>
              <Link to="/returns">Returns & Exchanges</Link>
              <Link to="/track-order">Track Order</Link>
              <Link to="/size-guide">Size Guide</Link>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="#" aria-label="Instagram" style={{ color: 'var(--text-secondary)' }}><FiInstagram size={20} /></a>
              <a href="#" aria-label="Twitter" style={{ color: 'var(--text-secondary)' }}><FiTwitter size={20} /></a>
              <a href="#" aria-label="Facebook" style={{ color: 'var(--text-secondary)' }}><FiFacebook size={20} /></a>
              <a href="#" aria-label="YouTube" style={{ color: 'var(--text-secondary)' }}><FiYoutube size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} SMATT Fashion. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1.5rem' }}>
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
            <FaCcPaypal />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
