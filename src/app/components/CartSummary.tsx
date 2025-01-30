// src/app/components/CartSummary.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { useCart } from '@/context/CartContext'; // <-- Adjust path if needed
import type { CartItem } from '@/context/CartContext'; // <-- Import the CartItem type

export default function CartSummary() {
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ----- Free Shipping Logic -----
  const FREE_SHIPPING_THRESHOLD = 150;
  const difference = FREE_SHIPPING_THRESHOLD - total;

  let freeShippingMessage = '';
  if (total >= FREE_SHIPPING_THRESHOLD) {
    freeShippingMessage = 'You are eligible for free shipping.';
  } else {
    freeShippingMessage = `Spend €${difference.toFixed(2)} more and get free shipping!`;
  }

  // ----- Handle Checkout -----
  const handleCheckout = () => {
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Construct the cart URL
      const cartUrl = buildCartUrl(items);
      // Redirect to Shopify's checkout
      window.location.href = cartUrl;
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('Failed to proceed to checkout. Please try again.');
      setIsLoading(false);
    }
  };

  // ----- Build Shopify Cart URL -----
  // Replaced `any[]` with `CartItem[]`
  const buildCartUrl = (cartItems: CartItem[]): string => {
    const baseUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/`;

    const lineItems = cartItems.map((item) => {
      // Extract numeric variant ID from GID format
      const numericVariantId = extractNumericId(item.variantId);
      return `${numericVariantId}:${item.quantity}`;
    });

    const lineItemsString = lineItems.join(',');
    return `${baseUrl}${lineItemsString}/checkout`;
  };

  // ----- Extract Numeric ID from GID -----
  const extractNumericId = (gid: string): string => {
    const parts = gid.split('/');
    return parts[parts.length - 1];
  };

  // Example 10% tax calculation
  const taxAmount = total * 0.1;
  // Example final total (subtotal + tax)
  const finalTotal = total + taxAmount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg bg-white shadow-md border border-gray-200 relative"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Order Summary
      </h2>

      {/* Free Shipping Message */}
      <motion.p
        className="mb-4 text-center font-medium text-brandGreen bg-brandGreen/10 py-2 rounded-md"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        {freeShippingMessage}
      </motion.p>

      {/* Subtotal */}
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal:</span>
        <span className="text-gray-800 font-medium">
          €{total.toFixed(2)}
        </span>
      </div>

      {/* Tax */}
      <div className="flex justify-between mb-4">
        <span className="text-gray-600">Tax (10%):</span>
        <span className="text-gray-800 font-medium">
          €{taxAmount.toFixed(2)}
        </span>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between text-lg font-bold mb-6">
        <span className="text-gray-800">Total:</span>
        <span className="text-gray-900">
          €{finalTotal.toFixed(2)}
        </span>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Checkout Button */}
      <motion.button
        onClick={handleCheckout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        {isLoading ? 'Proceeding to checkout...' : 'Proceed to Checkout'}
        <HiArrowRight className="ml-2 w-5 h-5" />
      </motion.button>

      {/* Clear Cart Button */}
      <motion.button
        onClick={clearCart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md
          hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
      >
        Clear Cart
      </motion.button>
    </motion.div>
  );
}
