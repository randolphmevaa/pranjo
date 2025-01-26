// src/app/cart/page.tsx
'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import CartItemCard from '@/app/components/CartItemCard';
import CartSummary from '@/app/components/CartSummary';
import EmptyCart from '@/app/components/EmptyCart';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CartPage = () => {
  // Mock `featuredProducts` data
  const featuredProducts = [
    {
      node: {
        id: "1",
        title: "Yoga Mat",
        handle: "yoga-mat",
        featuredImage: {
          url: "/images/yoga-mat.jpg",
          altText: "A high-quality yoga mat",
        },
        priceRange: {
          minVariantPrice: {
            amount: "29.99",
            currencyCode: "USD",
          },
        },
      },
    },
    {
      node: {
        id: "2",
        title: "Yoga Blocks",
        handle: "yoga-blocks",
        featuredImage: {
          url: "/images/yoga-blocks.jpg",
          altText: "A set of yoga blocks",
        },
        priceRange: {
          minVariantPrice: {
            amount: "19.99",
            currencyCode: "USD",
          },
        },
      },
    },
    {
      node: {
        id: "3",
        title: "Yoga Straps",
        handle: "yoga-straps",
        featuredImage: {
          url: "/images/yoga-straps.jpg",
          altText: "Durable yoga straps",
        },
        priceRange: {
          minVariantPrice: {
            amount: "14.99",
            currencyCode: "USD",
          },
        },
      },
    },
  ];

  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white text-gray-900 font-body">
        <Header featuredProducts={featuredProducts} />
        <EmptyCart />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 font-body">
      <Header featuredProducts={featuredProducts} />

      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Cart Items */}
          <div className="flex-1">
            {items.map(item => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <CartSummary />
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8 text-center">
          <Link href="/">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              Continue Shopping
            </motion.a>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CartPage;
