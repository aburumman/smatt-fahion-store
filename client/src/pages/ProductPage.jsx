import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiMinus, FiPlus, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import Skeleton from '../components/ui/Skeleton';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../hooks/useCart';
import { productsAPI } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Try real API first
        const res = await productsAPI.getProductBySlug(slug);
        setProduct(res.data);
        if (res.data.sizes?.length) setSelectedSize(res.data.sizes[0]);
        if (res.data.colors?.length) setSelectedColor(res.data.colors[0]);
        
        // Fetch related
        const relatedRes = await productsAPI.getProductsByCategory(res.data.category);
        setRelatedProducts(relatedRes.data.products?.filter(p => p._id !== res.data._id).slice(0, 4) || []);
      } catch (err) {
        console.warn('API failed, using mock data for product page');
        // Mock data fallback
        const mockProduct = {
          _id: 'mock-1',
          name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug,
          price: 299.99,
          comparePrice: 349.99,
          category: 'Premium',
          description: 'Crafted with meticulous attention to detail, this premium piece combines timeless elegance with modern functionality. Made from sustainable, high-quality materials designed to last a lifetime. Features signature SMATT Fashion branding and comes in a beautiful presentation box.',
          images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['#000000', '#ffffff', '#e8a838'],
          rating: 4.8,
          numReviews: 124,
          inStock: true,
          countInStock: 10
        };
        setProduct(mockProduct);
        setSelectedSize(mockProduct.sizes[0]);
        setSelectedColor(mockProduct.colors[0]);
        
        // Mock related
        setRelatedProducts(Array.from({ length: 4 }).map((_, i) => ({
          _id: `rel-${i}`,
          name: `Related Item ${i + 1}`,
          slug: `related-${i}`,
          price: 199.99,
          category: 'Premium',
          images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80']
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors?.length && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const AccordionItem = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
      <div className="accordion-item">
        <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
          {title}
          <span>{isOpen ? '−' : '+'}</span>
        </button>
        {isOpen && <div className="accordion-content">{children}</div>}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container product-detail-layout">
        <div><Skeleton variant="card" height={600} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Skeleton variant="text" height={40} width="80%" />
          <Skeleton variant="text" height={30} width="30%" />
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={60} />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Product not found</div>;
  }

  return (
    <div className="product-page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="container product-detail-layout">
        {/* Images */}
        <div className="gallery-container">
          <div className="main-image">
            <img src={product.images[activeImage]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="thumbnail-strip">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-info-section">
          <div className="product-info-header">
            <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              {product.category}
            </div>
            <h1>{product.name}</h1>
            <div className="product-meta">
              <Rating value={product.rating} showCount count={product.numReviews} />
              <span>|</span>
              <span style={{ color: product.inStock ? 'var(--accent-sage)' : '#dc2626' }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="product-price-large">
              {formatCurrency(product.price)}
              {product.comparePrice > product.price && (
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.125rem', marginLeft: '1rem', fontWeight: 400 }}>
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
            </div>
          </div>

          <p className="product-desc">{product.description}</p>

          {/* Variants */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="selector-group">
              <div className="selector-header">
                <span>Size</span>
                <button className="btn-ghost" style={{ padding: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Size Guide</button>
              </div>
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
            <div className="selector-group">
              <div className="selector-header">
                <span>Color</span>
              </div>
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

          {/* Add to Cart */}
          <div className="add-to-cart-form">
            <div className="qty-selector-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus size={16} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.countInStock || 10, quantity + 1))}><FiPlus size={16} /></button>
            </div>
            <Button 
              size="lg" 
              style={{ flex: 1 }} 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', padding: '1.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <FiTruck size={20} /> Free global shipping
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <FiRefreshCw size={20} /> 30 days return
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <FiShield size={20} /> 2 year warranty
            </div>
          </div>

          {/* Accordion */}
          <div className="accordion">
            <AccordionItem title="Product Details" defaultOpen>
              <ul>
                <li>Premium materials sourced sustainably</li>
                <li>Hand-finished for perfect detail</li>
                <li>Designed to last a lifetime</li>
                <li>Includes signature presentation box</li>
              </ul>
            </AccordionItem>
            <AccordionItem title="Shipping & Returns">
              <p>We offer free standard shipping on all orders over $75. Expedited shipping options are available at checkout.</p>
              <p style={{ marginTop: '0.5rem' }}>If you are not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange.</p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container" style={{ padding: '4rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>You May Also Like</h2>
          <ProductGrid products={relatedProducts} loading={false} columns={4} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
