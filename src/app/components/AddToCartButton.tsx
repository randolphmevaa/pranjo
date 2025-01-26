// src/app/components/AddToCartButton.tsx
'use client';

import { motion } from 'framer-motion';
import { HiShoppingBag } from 'react-icons/hi';
import { useState } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { toast } from 'react-toastify';

type AddToCartButtonProps = {
  product: {
    id: string;
    title: string;
    handle: string;
    priceRange?: {
      minVariantPrice?: {
        amount?: string;
        currencyCode?: string;
      };
    };
    images?: {
      edges: { node: { url: string; altText?: string } }[];
    };
  };
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      quantity,
      price: product.priceRange?.minVariantPrice?.amount || '0',
      currency: product.priceRange?.minVariantPrice?.currencyCode || 'USD',
      image: product.images?.edges[0]?.node,
    };

    addItem(cartItem);
    setAdded(true);
    toast.success(`${quantity} ${product.title} added to cart!`);

    setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex items-center space-x-4 mt-6">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Add to Cart Button */}
      <motion.button
        onClick={handleAddToCart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center px-6 py-3 rounded-md text-white transition-colors duration-300 ${
          added ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
        aria-label={`Add ${quantity} ${product.title} to cart`}
      >
        <HiShoppingBag className="w-6 h-6 mr-2" />
        {added ? 'Added!' : 'Add to Cart'}
      </motion.button>
    </div>
  );
}
