import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Button from '../ui/Button';

const FilterSection = ({ title, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="filter-group">
      <div className="filter-title" onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const ProductFilters = ({ filters, onFilterChange, categories }) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['#000000', '#ffffff', '#dc2626', '#2563eb', '#16a34a', '#eab308'];

  const handleCategoryChange = (category) => {
    const current = filters.categories || [];
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category];
    onFilterChange({ ...filters, categories: updated });
  };

  const handleSizeChange = (size) => {
    const current = filters.sizes || [];
    const updated = current.includes(size)
      ? current.filter(s => s !== size)
      : [...current, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  return (
    <aside className="filters-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ margin: 0 }}>Filters</h3>
        <button 
          className="btn-ghost" 
          style={{ fontSize: '0.875rem' }}
          onClick={() => onFilterChange({})}
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Category">
        <div className="filter-list">
          {categories.map(cat => (
            <label key={cat} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={(filters.categories || []).includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="price-inputs">
          <input 
            type="number" 
            placeholder="Min" 
            className="price-input"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
          />
          <span>-</span>
          <input 
            type="number" 
            placeholder="Max" 
            className="price-input"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
          />
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="size-grid">
          {sizes.map(size => (
            <button
              key={size}
              className={`size-btn ${(filters.sizes || []).includes(size) ? 'active' : ''}`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="color-grid">
          {colors.map(color => (
            <div 
              key={color} 
              className={`color-swatch-wrapper ${(filters.colors || []).includes(color) ? 'active' : ''}`}
              onClick={() => {
                const current = filters.colors || [];
                const updated = current.includes(color)
                  ? current.filter(c => c !== color)
                  : [...current, color];
                onFilterChange({ ...filters, colors: updated });
              }}
            >
              <div className="color-swatch" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
};

export default ProductFilters;
