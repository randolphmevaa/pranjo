// components/DiscoverMore.tsx

"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiShoppingBag,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

// -- TYPES (adjust as needed) --
type VariantNode = {
  id: string;
  title: string;
  image?: {
    url: string;
    altText?: string;
  };
  priceV2?: {
    amount?: string;
    currencyCode?: string;
  };
};

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
      currencyCode?: string;
    };
  };
  variants?: {
    edges: { node: VariantNode }[];
  };
};

export default function DiscoverMore({
  products,
}: {
  products: { node: ProductNode }[];
}) {
  // If no products, bail out
  if (!products || products.length === 0) return null;

  // Slice only 8 items, starting at index 8
  const discoverItems = products.slice(8, 16);

  // If after slicing we have none, bail
  if (!discoverItems || discoverItems.length === 0) return null;

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1,
    speed: 8, // Adjusted speed for smoother transition
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Handle Embla Carousel resize to ensure smooth looping
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, discoverItems]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        emblaApi?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        emblaApi?.scrollNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi]);

  return (
    <section className="py-16 px-4 sm:px-8 bg-gray-50 border-t border-b border-black" id="discover-more">
      <div className="relative group max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-left text-gray-900">
            Discover More
          </h2>
        </div>

        {/* Embla viewport + container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {discoverItems.map(({ node }) => (
              <DiscoverCard key={node.id} product={node} />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="opacity-0 group-hover:opacity-100 transition-opacity 
                     absolute left-3 top-1/2 -translate-y-1/2 
                     bg-white text-gray-700 p-2 rounded-full 
                     shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 z-10"
          aria-label="Previous Slide"
        >
          <HiOutlineChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="opacity-0 group-hover:opacity-100 transition-opacity 
                     absolute right-3 top-1/2 -translate-y-1/2 
                     bg-white text-gray-700 p-2 rounded-full 
                     shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 z-10"
          aria-label="Next Slide"
        >
          <HiOutlineChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

// -- SINGLE CARD COMPONENT ----------------------------------------------
const DiscoverCard = React.memo(function DiscoverCard({
  product,
}: {
  product: ProductNode;
}) {
  const { id, title, handle, featuredImage, priceRange, variants } = product;

  // Choose first variant for accurate pricing/image
  const variantEdges = variants?.edges || [];
  const [selectedVariant, setSelectedVariant] = useState<VariantNode | null>(null);

  useEffect(() => {
    if (variantEdges.length > 0) {
      setSelectedVariant(variantEdges[0].node);
    }
  }, [variantEdges]);

  // Resolve price
  const variantPrice = selectedVariant?.priceV2?.amount;
  const variantCurrency = selectedVariant?.priceV2?.currencyCode;
  const fallbackPrice = priceRange?.minVariantPrice?.amount;
  const fallbackCurrency = priceRange?.minVariantPrice?.currencyCode;
  const displayPrice = variantPrice || fallbackPrice;
  const displayCurrency = variantCurrency || fallbackCurrency;

  // Resolve image
  const variantImageUrl = selectedVariant?.image?.url;
  const variantImageAlt = selectedVariant?.image?.altText;
  const productImageUrl = featuredImage?.url;
  const productImageAlt = featuredImage?.altText;
  const activeImageUrl = variantImageUrl || productImageUrl || "";
  const activeImageAlt = variantImageAlt || productImageAlt || title;

  // Second image for hover
  const secondImageUrl =
    variantEdges.length > 1 ? variantEdges[1].node.image?.url : variantImageUrl;
  const secondImageAlt =
    variantEdges.length > 1 ? variantEdges[1].node.image?.altText : variantImageAlt;

  // Fade-in on image change
  const [imageKey, setImageKey] = useState(0);
  useEffect(() => {
    setImageKey((prev) => prev + 1);
  }, [activeImageUrl]);

  return (
    <div
      className={`flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] 
                  lg:flex-[0_0_22%] xl:flex-[0_0_18%] 2xl:flex-[0_0_15%]
                  min-w-[220px] max-w-[300px]
                  h-[400px] relative 
                  rounded-lg overflow-hidden bg-white
                  transition-transform duration-300 
                  hover:scale-[1.02]`}
    >
      {/* Image Area */}
      <div className="w-full h-[80%] bg-gray-100 overflow-hidden relative group">
        {/* Primary Image */}
        <FadeImage key={imageKey} src={activeImageUrl} alt={activeImageAlt} />

        {/* Secondary Image (shown on hover) */}
        {secondImageUrl && (
          <FadeImage
            key={`second-${imageKey}`}
            src={secondImageUrl}
            alt={secondImageAlt || activeImageAlt}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}

        {/* Shopping Bag Icon on Hover */}
        <AnimatePresence>
          <motion.button
            className="absolute bottom-4 right-4 bg-white bg-opacity-70 p-2 rounded-md 
                       shadow-md hover:bg-opacity-100 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleAddToCart(product)}
            aria-label={`Add ${title} to cart`}
          >
            <HiShoppingBag className="w-6 h-6 text-gray-700" />
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Details Area */}
      <div className="h-[20%] flex flex-col p-2">
        {/* Product Name */}
        <h3 className="text-lg font-header text-gray-900 truncate">
          {title}
        </h3>

        {/* Price */}
        {displayPrice && displayCurrency && (
          <p className="text-md font-body font-semibold text-gray-700">
            {displayPrice} {displayCurrency}
          </p>
        )}

        {/* Variant Selection (Optional) */}
        {variantEdges.length > 1 && (
          <select
            value={selectedVariant?.id}
            onChange={(e) => {
              const variant = variantEdges.find(
                (v) => v.node.id === e.target.value
              )?.node;
              setSelectedVariant(variant || null);
            }}
            className="mt-auto p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label={`Select variant for ${title}`}
          >
            {variantEdges.map(({ node }) => (
              <option key={node.id} value={node.id}>
                {node.title}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
});

// -- FADE IMAGE COMPONENT -----------------------------------------------
function FadeImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 ${className} animate-fadeIn`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300"
          priority
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 25vw"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
    </div>
  );
}

// -- ADD TO CART FUNCTION (Placeholder) -----------------------------------
function handleAddToCart(product: ProductNode) {
  // Implement your add to cart functionality here
  // For example, integrate with your cart context or API
  console.log(`Added ${product.title} to cart.`);
}