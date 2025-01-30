// src/app/cart/page.tsx

'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import CartItemCard from '@/app/components/CartItemCard';
import CartSummary from '@/app/components/CartSummary';
import EmptyCart from '@/app/components/EmptyCart';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import InfoSection from '../components/InfoSection';
import AnnouncementBanner from '@/app/components/AnnouncementBanner2';

/* -------------------------------------------------------------------------- */
/*   Example Hook/Context for Recently Viewed (Replace with real logic!)     */
/* -------------------------------------------------------------------------- */
// Replace this placeholder hook with your real data fetching context or logic:
function useRecentlyViewed() {
  // This is mock data. Pull from your actual source for "recently viewed."
  const recentlyViewed = [
    {
      id: 'meditation-cushion',
      title: 'Meditation Cushion',
      imageUrl: '/images/meditation-cushion.jpg',
      price: 29.99,
    },
    {
      id: 'yoga-wheel',
      title: 'Yoga Wheel',
      imageUrl: '/images/yoga-wheel.jpg',
      price: 34.99,
    },
    {
      id: 'aromatherapy-candle',
      title: 'Aromatherapy Candle',
      imageUrl: '/images/aromatherapy-candle.jpg',
      price: 19.99,
    },
  ];
  return { recentlyViewed };
}

/* -------------------------------------------------------------------------- */
/*                             Framer Motion Setup                            */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.3 },
  },
};

const CartPage = () => {
  // Mock `featuredProducts` data
  const featuredProducts = [
    {
      node: {
        id: '1',
        title: 'Yoga Mat',
        handle: 'yoga-mat',
        featuredImage: {
          url: '/images/yoga-mat.jpg',
          altText: 'A high-quality yoga mat',
        },
        priceRange: {
          minVariantPrice: {
            amount: '29.99',
            currencyCode: 'USD',
          },
        },
      },
    },
    {
      node: {
        id: '2',
        title: 'Yoga Blocks',
        handle: 'yoga-blocks',
        featuredImage: {
          url: '/images/yoga-blocks.jpg',
          altText: 'A set of yoga blocks',
        },
        priceRange: {
          minVariantPrice: {
            amount: '19.99',
            currencyCode: 'USD',
          },
        },
      },
    },
    {
      node: {
        id: '3',
        title: 'Yoga Straps',
        handle: 'yoga-straps',
        featuredImage: {
          url: '/images/yoga-straps.jpg',
          altText: 'Durable yoga straps',
        },
        priceRange: {
          minVariantPrice: {
            amount: '14.99',
            currencyCode: 'USD',
          },
        },
      },
    },
  ];

  // ----- Retrieve Cart Data -----
  const { items, removeItem, getSubtotal } = useCart();
  // *Assuming* your CartContext provides a `getSubtotal()` to fetch the cart's subtotal.

  // ----- Retrieve Recently Viewed Data -----
  // IMPORTANT: Call this hook unconditionally
  const { recentlyViewed } = useRecentlyViewed();

  // Calculate free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 150;
  const subtotal = getSubtotal?.() || 0;
  const difference = FREE_SHIPPING_THRESHOLD - subtotal;

  // Create a dynamic message for free shipping
  let freeShippingMessage = '';
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    freeShippingMessage = 'You are eligible for free shipping.';
  } else {
    freeShippingMessage = `Spend €${difference.toFixed(2)} more and get free shipping!`;
  }

  // If cart empty, show empty state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white text-gray-900 font-body">
        <AnnouncementBanner />
        <Header featuredProducts={featuredProducts} />
        <EmptyCart />
        {/* Add the Info Section */}
        <InfoSection />
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-white text-gray-900 font-body">
      <AnnouncementBanner />

      {/* Header */}
      <Header featuredProducts={featuredProducts} />

      {/* Hero/Heading Section */}
      <section className="relative bg-gradient-to-br from-brandGreen/30 to-brandGreen/10 h-48 flex items-center justify-center mb-8">
        <div className="absolute inset-0 bg-brandGreen/10 pointer-events-none" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brandGreen drop-shadow-sm">
            Your Shopping Cart
          </h1>
          <p className="mt-2 text-gray-700 max-w-xl mx-auto">
            {freeShippingMessage}
          </p>
        </div>
      </section>

      {/* Parallax/Decorative Background */}
      <div
        className="absolute top-0 left-0 w-full h-[60rem] bg-brandGreen/20 -z-10"
        style={{ clipPath: 'ellipse(75% 100% at 50% 20%)' }}
      />

      {/* Cart Section */}
      <section className="pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Cart Items */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  exit="exit"
                  className="mb-6"
                >
                  <CartItemCard
                    item={item}
                    onRemove={() => removeItem(item.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Cart Summary */}
          <motion.div
            className="w-full lg:w-1/3 mt-8 lg:mt-0"
            variants={itemVariants}
            initial="hidden"
            animate="show"
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-24">
              <CartSummary />
            </div>
          </motion.div>
        </div>

        {/* Single Checkout Button */}
        <motion.div
          className="mt-8 flex items-center justify-center"
          variants={itemVariants}
          initial="hidden"
          animate="show"
        >
          <Link href="/checkout" legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-brandGreen text-white rounded-md 
                         hover:bg-brandGreen/90 transition-colors duration-300 
                         focus:outline-none focus:ring-2 focus:ring-brandGreen/50 text-base font-semibold"
            >
              Proceed to Checkout
            </motion.a>
          </Link>
        </motion.div>
      </section>

      {/* "RECENTLY VIEWED" Section */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <section className="px-6 sm:px-8 py-16 max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-brandGreen mb-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Recently Viewed
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {recentlyViewed.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm 
                           hover:shadow-md transition-shadow flex flex-col items-center"
              >
                {/* Image */}
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Title & Price */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-md text-brandGreen font-bold mb-4">
                  €{product.price.toFixed(2)}
                </p>

                {/* CTA */}
                <Link href={`/products/${product.id}`} legacyBehavior>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 bg-brandGreen text-white 
                               rounded-md hover:bg-brandGreen/90 transition-colors duration-300 
                               focus:outline-none focus:ring-2 focus:ring-brandGreen/50 text-sm"
                  >
                    View Product
                  </motion.a>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Add the Info Section */}
      <InfoSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default CartPage;
