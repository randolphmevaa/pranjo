// app/components/ReviewSection.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -- TYPES --
type Review = {
  id: number;
  name: string;
  location: string;
  text: string;
  avatarUrl?: string; // Optional field for reviewer avatar
};

// Only female names with locations
const reviews: Review[] = [
  {
    id: 1,
    name: "CLARIS",
    location: "USA",
    text: "I've tried many yoga brands, but Pranjo stands out for their commitment to quality and sustainability. Their products enhance my daily yoga routine beautifully.",
    avatarUrl: "/images/avatars/claris.jpg", // Ensure this path is correct
  },
  {
    id: 2,
    name: "SARAH",
    location: "AUS",
    text: "Pranjo's yoga mats are incredibly supportive and eco-friendly. They've made my practice more enjoyable and environmentally conscious.",
    avatarUrl: "/images/avatars/sarah.jpg",
  },
  {
    id: 3,
    name: "EMMA",
    location: "CAN",
    text: "Absolutely love Pranjo's apparel! It's both stylish and comfortable, perfect for my yoga sessions and everyday wear.",
    avatarUrl: "/images/avatars/emma.jpg",
  },
  {
    id: 4,
    name: "OLIVIA",
    location: "NZ",
    text: "Pranjo's commitment to quality is unmatched. Their products have elevated my yoga practice to a whole new level.",
    avatarUrl: "/images/avatars/olivia.jpg",
  },
  {
    id: 5,
    name: "AVA",
    location: "UK",
    text: "The eco-friendly materials used in Pranjo's products make me feel good about my purchases. Love the new yoga pants!",
    avatarUrl: "/images/avatars/ava.jpg",
  },
];

export default function ReviewSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isFading, setIsFading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(false);
      setTimeout(() => {
        setCurrentReviewIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
        setIsFading(true);
      }, 700); // Duration matches the CSS transition
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 px-6 sm:px-8 bg-[#E5E6E1]" id="reviews">
      {/* Review Count Display */}
      <p className="text-center text-sm sm:text-base font-body mb-3 text-gray-700">
        Over 10,000 ★★★★★ Reviews
      </p>

      {/* Enhanced Separator */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Review Display with Framer Motion */}
        <AnimatePresence>
          {isFading && (
            <motion.div
              key={reviews[currentReviewIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              <ReviewCard review={reviews[currentReviewIndex]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// -- SINGLE REVIEW CARD COMPONENT ----------------------------------------------
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Reviewer Avatar */}
      {/* {review.avatarUrl && (
        <img
          src={review.avatarUrl}
          alt={`${review.name}'s avatar`}
          className="w-16 h-16 rounded-full mb-4 object-cover"
          loading="lazy"
        />
      )} */}

      {/* Quote Icon */}
      {/* <svg
        className="w-8 h-8 text-gray-400 mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7.17 6C4.61 6 2.5 8.11 2.5 10.67V13.33C2.5 15.89 4.61 18 7.17 18H8.83C11.39 18 13.5 15.89 13.5 13.33V10.67C13.5 8.11 11.39 6 8.83 6H7.17ZM16.83 6C14.27 6 12.16 8.11 12.16 10.67V13.33C12.16 15.89 14.27 18 16.83 18H18.5C21.06 18 23.17 15.89 23.17 13.33V10.67C23.17 8.11 21.06 6 18.5 6H16.83Z" />
      </svg> */}

      {/* Review Text with Quotes */}
      <blockquote className="text-xl sm:text-2xl italic font-body text-gray-800 mb-4">
        “{review.text}”
      </blockquote>

      {/* Reviewer Name and Location in All Caps */}
      <p className="text-md sm:text-lg font-semibold font-header text-gray-900 uppercase">
        {review.name}, {review.location}
      </p>
    </div>
  );
}