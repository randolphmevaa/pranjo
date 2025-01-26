// src/app/components/CartSummary.tsx
'use client';

import { useCart } from '@/context/CartContext';
// import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
// import Link from 'next/link';

export default function CartSummary() {
  const { total, clearCart } = useCart();
  // const router = useRouter();

  const handleCheckout = () => {
    // Implement your checkout logic here, e.g., redirect to Shopify's checkout
    // For example:
    // window.location.href = 'https://your-shopify-store.com/checkout';
    alert('Proceeding to checkout...');
  };

  return (
    <div className="p-4 border rounded-md bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Tax:</span>
        <span>${(total * 0.1).toFixed(2)}</span> {/* Example tax calculation */}
      </div>
      <div className="flex justify-between text-lg font-bold mb-6">
        <span>Total:</span>
        <span>${(total * 1.1).toFixed(2)}</span>
      </div>
      <motion.button
        onClick={handleCheckout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Proceed to Checkout <HiArrowRight className="ml-2 w-5 h-5" />
      </motion.button>
      <motion.button
        onClick={clearCart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Clear Cart
      </motion.button>
    </div>
  );
}
