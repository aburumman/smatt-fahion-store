import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield, FiSmile } from 'react-icons/fi';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import Rating from '../components/ui/Rating';
import { useProducts } from '../hooks/useProducts';

const HomePage = () => {
  const { products: featuredProducts, loading } = useProducts({ featured: true, limit: 4 });
  const navigate = useNavigate();
  
  // Intersection Observer for fade-in animations
  const observerRef = useRef(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const categories = [
    { name: 'Women\'s Fashion', image: '/images/categories/womens.jpg', link: '/shop/womens-fashion' },
    { name: 'Men\'s Fashion', image: '/images/categories/mens.jpg', link: '/shop/mens-fashion' },
    { name: 'Kids\' Fashion', image: '/images/categories/kids.jpg', link: '/shop/kids-fashion' },
    { name: 'Jewelry', image: '/images/categories/jewelry.jpg', link: '/shop/jewelry' },
    { name: 'Accessories', image: '/images/categories/accessories.jpg', link: '/shop/accessories' },
  ];

  const testimonials = [
    { name: 'Sarah J.', rating: 5, text: 'Absolutely in love with my new watch. The quality is exceptional and shipping was incredibly fast.', initial: 'S' },
    { name: 'Michael T.', rating: 5, text: 'Premium packaging and amazing customer service. Will definitely be ordering from SMATT Fashion again.', initial: 'M' },
    { name: 'Emma W.', rating: 4.5, text: 'The jewelry collection is stunning. Found the perfect anniversary gift here.', initial: 'E' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <img 
          src="/images/hero/hero-banner.jpg" 
          alt="Smatt Fashion Premium Collection" 
          className="hero-bg"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Discover Timeless Luxury</h1>
          <p className="hero-subtitle">
            Elevate your everyday with our curated collection of premium fashion, accessories, and jewelry.
          </p>
          <div className="hero-btns">
            <Button size="lg" onClick={() => navigate('/shop')}>Shop Now</Button>
            <Button size="lg" variant="outline" style={{ borderColor: 'white', color: 'white' }} onClick={() => navigate('/about')}>
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding container animate-on-scroll">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-scroll">
          {categories.map((cat, i) => (
            <div key={i} className="category-card" onClick={() => navigate(cat.link)}>
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <div className="category-overlay">
                <h3 className="category-title">{cat.name}</h3>
                <span className="category-link">Shop Collection <FiArrowRight /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding container animate-on-scroll">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Trending Now</h2>
          <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
            View All <FiArrowRight />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} loading={loading} columns={4} />
      </section>

      {/* Brand Story */}
      <section className="section-padding container animate-on-scroll">
        <div className="brand-story">
          <div className="brand-image">
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Craftsmanship" 
              loading="lazy"
            />
          </div>
          <div className="brand-text">
            <h2>The Art of Elegance</h2>
            <p>
              At SMATT Fashion, we believe that true luxury lies in the details. Every piece in our collection is carefully curated for its exceptional craftsmanship, sustainable materials, and timeless design.
            </p>
            <p>
              We partner directly with master artisans around the globe to bring you products that not only look beautiful but tell a story of heritage and passion.
            </p>
            <Button variant="outline" style={{ marginTop: '1rem' }} onClick={() => navigate('/about')}>
              Read Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Stats / Features */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem 0' }} className="animate-on-scroll">
        <div className="container stats-grid">
          <div className="stat-item">
            <FiSmile size={48} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h3>10K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <FiShield size={48} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h3>100%</h3>
            <p>Authentic Items</p>
          </div>
          <div className="stat-item">
            <FiTruck size={48} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h3>Free</h3>
            <p>Global Shipping</p>
          </div>
          <div className="stat-item">
            <FiRefreshCw size={48} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h3>30-Day</h3>
            <p>Easy Returns</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding container animate-on-scroll">
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((test, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">{test.initial}</div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>{test.name}</h4>
                  <Rating value={test.rating} />
                </div>
              </div>
              <p className="testimonial-text">"{test.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding container animate-on-scroll">
        <div className="newsletter-section">
          <h2>Join the Smatt Fashion List</h2>
          <p>Subscribe to receive updates, access to exclusive deals, and 10% off your first order.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email address" required style={{ padding: '1rem' }} />
            <Button type="submit" size="lg" style={{ borderRadius: '0 4px 4px 0' }}>Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
