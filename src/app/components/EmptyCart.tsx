// src/app/components/EmptyCart.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiShoppingCart } from 'react-icons/hi';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <HiShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
      <Link href="/">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Continue Shopping
        </motion.a>
      </Link>
    </div>
  );
}
