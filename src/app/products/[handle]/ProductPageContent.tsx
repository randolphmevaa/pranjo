// src/app/products/[handle]/ProductPageContent.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import VariantSelector from '@/app/components/VariantSelector';
import AddToCartButton from '@/app/components/AddToCartButton';
import RelatedProducts from '@/app/components/RelatedProducts';
import ImageModal from '@/app/components/ImageModal';
import {
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowsPointingOutIcon,
  ArrowUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import InfoSection from '@/app/components/InfoSection';
// import Link from 'next/link';

/* -------------------------------------------------------------------------- */
/*                            Type Declarations                               */
/* -------------------------------------------------------------------------- */

type VariantNode = {
  id: string;
  title: string;
  priceV2?: {
    amount?: string;
    currencyCode?: string;
  };
  image?: {
    url: string;
    altText?: string;
  };
};

type ProductNode = {
  id: string;
  title: string;
  description: string;
  handle: string;
  images?: {
    edges: { node: { url: string; altText?: string } }[];
  };
  variants?: {
    edges: { node: VariantNode }[];
  };
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
      currencyCode?: string;
    };
  };
};

interface ProductPageContentProps {
  product: ProductNode;
  relatedProducts: Array<{
    id: string;
    title: string;
    handle: string;
    price: string;
    imageUrl: string;
    altText: string;
  }>;
}

/* -------------------------------------------------------------------------- */
/*                              Motion Variants                               */
/* -------------------------------------------------------------------------- */

// Container for staggered fade-in
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Fade-up on each child
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Subtle zoom on hover
const zoomHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};

// For “Add to Cart” success shake
const shakeVariants: Variants = {
  initial: { x: 0 },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

/* -------------------------------------------------------------------------- */
/*                               Main Component                               */
/* -------------------------------------------------------------------------- */

const ProductPageContent: React.FC<ProductPageContentProps> = ({
  product,
  relatedProducts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentAlt, setCurrentAlt] = useState<string>('');
  const [activeThumbnail, setActiveThumbnail] = useState<number>(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false); // HeartIcon toggle
  const [inStock] = useState<boolean>(true); // Example stock flag
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  // For skeleton loading state
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Example discount detection
  const [hasDiscount] = useState<boolean>(true);

  // Add to Cart visual feedback
  const [cartAnimationTrigger, setCartAnimationTrigger] = useState(false);

  /* ------------------------------------------------------------------------ */
  /*                              Lifecycle Hooks                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderScrolled(scrollPosition > 100);
      setIsStickyBarVisible(scrollPosition > 400);
      setShowScrollToTop(scrollPosition > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                          Scroll to Top Handler                           */
  /* ------------------------------------------------------------------------ */

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ------------------------------------------------------------------------ */
  /*                              Modal Handlers                              */
  /* ------------------------------------------------------------------------ */

  const openModal = (url: string, alt: string) => {
    setCurrentImage(url);
    setCurrentAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
    setCurrentAlt('');
  };

  /* ------------------------------------------------------------------------ */
  /*                            Thumbnail Handlers                            */
  /* ------------------------------------------------------------------------ */

  const handleThumbnailClick = (index: number) => {
    setActiveThumbnail(index);
    setImageLoaded(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                          Favorite Toggle Handler                          */
  /* ------------------------------------------------------------------------ */

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  /* ------------------------------------------------------------------------ */
  /*                         Example Featured Products                        */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /*                            Accordion Component                           */
  /* ------------------------------------------------------------------------ */

  const AccordionItem = ({
    title,
    content,
    id,
  }: {
    title: string;
    content: string;
    id: string;
  }) => {
    const isOpen = openAccordion === id;
    return (
      <div
        className={`border-b last:border-b-0 transition-colors duration-300 ${
          isOpen ? 'bg-gray-50' : 'bg-white'
        }`}
      >
        <button
          onClick={() => setOpenAccordion(isOpen ? null : id)}
          className="w-full flex justify-between items-center py-4 px-4 hover:bg-gray-50 transition-colors"
        >
          <h3
            className={`text-lg font-medium transition-colors ${
              isOpen ? 'text-brandGreen' : 'text-brandGreen'
            }`}
          >
            {title}
          </h3>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-brandGreen"
          >
            <ChevronDownIcon className="w-5 h-5" />
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`px-4 pb-4 text-gray-600 border-l-4 border-brandGreen`}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                         Add to Cart Callback                             */
  /* ------------------------------------------------------------------------ */

  const handleAddToCart = () => {
    // Trigger the shaking animation
    setCartAnimationTrigger(true);
    // Typically you'd also dispatch an action or update local state
    // e.g., addItemToCart(product)
    setTimeout(() => {
      setCartAnimationTrigger(false);
    }, 600);
  };

  /* ------------------------------------------------------------------------ */
  /*                               Render JSX                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-brandGray text-gray-900 font-body overflow-x-hidden relative">
      {/* Header */}
      <Header featuredProducts={featuredProducts} scrolled={isHeaderScrolled} />

      {/* Parallax-Like Background Decoration */}
      <div
        className="absolute top-0 left-0 w-full h-[40rem] bg-gradient-to-br from-brandGreen/20 to-white 
        pointer-events-none -z-10"
        style={{ clipPath: 'ellipse(70% 100% at 50% 0%)' }}
      />

      {/* Floating Add to Cart Bar */}
      <AnimatePresence>
        {isStickyBarVisible && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-40"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
              {/* Sticky Product Info */}
              <div className="flex items-center w-full mb-4 sm:mb-0 sm:w-auto space-x-4">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                  {product.images?.edges[0]?.node.url && (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={
                        product.images.edges[0].node.altText || product.title
                      }
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h2 className="font-header text-brandGreen text-xl">
                    {product.title}
                  </h2>
                  <p className="text-brandGreen font-semibold">
                    {product.priceRange?.minVariantPrice?.amount}{" "}
                    {product.priceRange?.minVariantPrice?.currencyCode}
                  </p>
                </div>
              </div>

              {/* Sticky Variant + Add to Cart */}
              <div className="flex items-center space-x-2 sm:space-x-6 w-full sm:w-auto">
                <VariantSelector
                  variants={product.variants?.edges || []}
                  compact
                />
                <AddToCartButton
                  product={product}
                  variant="sticky"
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-brandGreen text-white shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-brandGreen/50 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="py-16 px-6 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
      >
        {/* ================= Image Gallery ================= */}
        <div className="flex flex-col space-y-6">
          {/* Main Product Image */}
          <motion.div
            variants={fadeInUpVariants}
            className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            {/* Show a discount ribbon if there's an active discount */}
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full z-10 text-sm font-semibold shadow-md animate-pulse">
                20% OFF
              </div>
            )}

            <motion.div
              variants={zoomHoverVariants}
              initial="rest"
              whileHover="hover"
              className="relative w-full h-full cursor-zoom-in"
              onClick={() =>
                openModal(
                  product.images?.edges[activeThumbnail]?.node.url || '',
                  product.images?.edges[activeThumbnail]?.node.altText ||
                    product.title
                )
              }
            >
              {/* Skeleton Shimmer (conditional) */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}

              {product.images && product.images.edges.length > 0 && (
                <Image
                  src={product.images.edges[activeThumbnail].node.url}
                  alt={
                    product.images.edges[activeThumbnail].node.altText ||
                    product.title
                  }
                  fill
                  className={`object-cover transition-transform duration-300 ease-out ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  onLoadingComplete={() => setImageLoaded(true)}
                />
              )}
              {/* Overlay gradient for a subtle effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Zoom icon */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white/90">
                <ArrowsPointingOutIcon className="w-5 h-5" />
                <span className="text-sm">Click to expand</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Thumbnail Grid */}
          {product.images && product.images.edges.length > 1 && (
            <motion.div
              variants={fadeInUpVariants}
              className="grid grid-cols-5 gap-3 pb-4"
            >
              {product.images.edges.map(({ node }, index) => (
                <motion.div
                  key={index}
                  variants={zoomHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className={`relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer border-2 transition-all duration-200 ${
                    activeThumbnail === index
                      ? 'border-brandGreen scale-105'
                      : 'border-transparent'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={node.url}
                    alt={
                      node.altText ||
                      `${product.title} thumbnail ${index + 1}`
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 10vw"
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                  {activeThumbnail === index && (
                    <div className="absolute inset-0 bg-brandGreen/20" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ================= Product Information ================= */}
        <motion.div className="flex flex-col space-y-8" variants={fadeInUpVariants}>
          {/* Product Header */}
          <div className="pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl lg:text-5xl font-header text-brandGreen tracking-tight">
                {product.title}
              </h1>

              {/* Favorite (Heart) Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavoriteToggle}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle Favorite"
              >
                <HeartIcon
                  className={`w-7 h-7 transition-colors ${
                    isFavorite
                      ? 'text-red-500'
                      : 'text-brandGreen/80 hover:text-brandGreen'
                  }`}
                />
              </motion.button>
            </div>

            {/* Reviews + Stock + Best Seller Tag */}
            <div className="mt-4 flex items-center flex-wrap gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'text-brandGreen' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500">(128 reviews)</span>

              {inStock ? (
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  In Stock
                </span>
              ) : (
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                  Out of Stock
                </span>
              )}

              <span className="px-2 py-1 bg-brandGreen/10 text-brandGreen rounded-full text-sm">
                Best Seller
              </span>
            </div>

            {/* Price + Discount */}
            <div className="mt-6 flex items-baseline flex-wrap gap-4">
              <p className="text-3xl font-semibold text-brandGreen">
                {product.priceRange?.minVariantPrice?.amount}{' '}
                <span className="text-2xl">
                  {product.priceRange?.minVariantPrice?.currencyCode}
                </span>
              </p>

              {/* Discount Badge Animation */}
              {hasDiscount && (
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 6,
                    duration: 0.6,
                  }}
                >
                  <span className="text-lg line-through text-gray-400">
                    $99.99
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    20% OFF
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />

            {/* Additional Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-brandGreen/5 rounded-xl flex items-center space-x-3">
                <TruckIcon className="w-8 h-8 text-brandGreen flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-brandGreen">
                    Fast Shipping
                  </h3>
                  <p className="text-sm text-gray-600">
                    Free worldwide delivery in 3-5 days
                  </p>
                </div>
              </div>
              <div className="p-4 bg-brandGreen/5 rounded-xl flex items-center space-x-3">
                <ShieldCheckIcon className="w-8 h-8 text-brandGreen flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-brandGreen">
                    Secure Payment
                  </h3>
                  <p className="text-sm text-gray-600">
                    100% secure checkout process
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Variant Selector */}
          {product.variants && product.variants.edges.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-header text-brandGreen">
                Select Options
              </h3>
              <VariantSelector variants={product.variants.edges} />
            </div>
          )}

          {/* Add to Cart Section with shake animation */}
          <motion.div
            className="space-y-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              variants={shakeVariants}
              animate={cartAnimationTrigger ? 'shake' : 'initial'}
            >
              <AddToCartButton product={product} onAddToCart={handleAddToCart} />
            </motion.div>
          </motion.div>

          {/* Accordion for Details, Specs, Reviews */}
          <div className="border rounded-2xl overflow-hidden mt-8">
            <AccordionItem
              id="details"
              title="Product Details"
              content="Premium organic cotton construction with reinforced stitching. Eco-friendly dyes and sustainable production methods."
            />
            <AccordionItem
              id="specs"
              title="Specifications"
              content="Material: 100% Organic Cotton | Dimensions: 12' x 8' x 3' | Weight: 0.8 lbs | Care: Machine wash cold"
            />
            <AccordionItem
              id="reviews"
              title="Customer Reviews (128)"
              content="4.8/5 stars based on 128 reviews. Read what our customers are saying about this product."
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 
         ===================================================================
            Background Video Section (above Related Products)
         ===================================================================
      */}
      <section className="relative w-full h-[500px] overflow-hidden mt-12">
        <video
          src="https://videos.pexels.com/video-files/2790143/2790143-uhd_2560_1440_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Text Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-8">
          <h2 className="text-white font-header text-3xl sm:text-4xl lg:text-5xl mb-4 drop-shadow-md">
            Discover Your Inner Peace
          </h2>
          <p className="text-white max-w-xl text-base sm:text-lg mb-6 drop-shadow-md">
            Elevate your wellness journey with premium yoga products,
            eco-friendly materials, and innovative designs.
          </p>
          <button
            onClick={() => alert('Learn More Clicked!')}
            className="px-6 py-3 bg-brandGreen text-white rounded-full font-semibold hover:bg-brandGreen/90 transition-colors shadow-lg"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Related Products */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 sm:px-8 py-16"
      >
        <h3 className="text-3xl font-header text-brandGreen mb-8">
          You Might Also Like
        </h3>
        {/* 
          If possible, enhance your RelatedProducts component with 
          hover animations, improved card UI, etc.
        */}
        <RelatedProducts related={relatedProducts} />
      </motion.div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={currentImage}
        altText={currentAlt}
        onClose={closeModal}
      />

      {/* Add the Info Section */}
      <InfoSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ProductPageContent;
