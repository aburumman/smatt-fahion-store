import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product._id === product._id && item.size === size && item.color === color
      );
      
      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.name} quantity`);
        return newCart;
      }
      
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { 
        id: `${product._id}-${size || 'nosize'}-${color || 'nocolor'}-${Date.now()}`,
        product, 
        quantity, 
        size, 
        color 
      }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shippingCost = subtotal > 75 || subtotal === 0 ? 0 : 10;
  const total = subtotal + tax + shippingCost;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      subtotal,
      tax,
      shippingCost,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};
