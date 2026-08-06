import React from 'react';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  onClick, 
  children, 
  className = '', 
  type = 'button',
  block = false,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const blockClass = block ? 'btn-block' : '';
  const loadingClass = loading ? 'btn-loading' : '';

  const classes = [baseClass, variantClass, sizeClass, blockClass, loadingClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
