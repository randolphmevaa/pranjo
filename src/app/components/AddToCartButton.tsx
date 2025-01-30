// src/app/components/AddToCartButton.tsx
'use client';

import { motion } from 'framer-motion';
import { HiShoppingBag } from 'react-icons/hi';
import { useState } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { toast } from 'react-toastify';
import { fetchVariantId } from '@/lib/shopify'; // We'll create this function

type ButtonVariant = 'sticky' | 'default'; // Define allowed variants

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
    // Add variants if available
    variants?: {
      edges: { node: { id: string; title: string } }[];
    };
  };
  variant?: ButtonVariant; // Optional variant prop
  onAddToCart?: () => void; // Optional callback prop
};

export default function AddToCartButton({
  product,
  variant = 'default', // Default variant
  onAddToCart, // Optional callback
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      let variantId = '';

      if (product.variants && product.variants.edges.length > 0) {
        // If variants are provided, use the first one
        variantId = product.variants.edges[0].node.id;
      } else {
        // Otherwise, fetch the variantId based on the product handle
        variantId = await fetchVariantId(product.handle);
      }

      const cartItem: CartItem = {
        id: variantId, // Using variantId as the unique identifier
        variantId: variantId,
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

      // Execute the callback if provided
      if (onAddToCart) {
        onAddToCart();
      }

      setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart.');
    } finally {
      setLoading(false);
    }
  };

  // Determine button classes based on variant
  const buttonClasses = variant === 'sticky'
    ? 'bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md shadow-md transition-colors duration-300'
    : 'bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors duration-300';

  return (
    <div className="flex items-center space-x-4 mt-6">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor={`quantity-${product.id}`} className="text-sm font-medium text-gray-700">
          Quantity:
        </label>
        <input
          type="number"
          id={`quantity-${product.id}`}
          name="quantity"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Quantity Selector"
        />
      </div>

      {/* Add to Cart Button */}
      <motion.button
        onClick={handleAddToCart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        className={`flex items-center ${buttonClasses}`}
        aria-label={`Add ${quantity} ${product.title} to cart`}
      >
        <HiShoppingBag className="w-6 h-6 mr-2" />
        {loading ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
      </motion.button>
    </div>
  );
}
