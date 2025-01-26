"use client";

import React from "react";

/**
 * A perfectly spaced marquee with separators and no breaks in flow.
 */
export default function AnnouncementBanner() {
  // Define the phrases
  const phrases = [
    "Worldwide shipping",
    "Free UK & EU shipping",
    "Try Pranjo leggings for 30 days",
  ];

  // Add consistent separator spacing between phrases
  const separator = "  •  ";
  const marqueeText = phrases.join(separator) + separator; // Ensure consistent separator at the end

  return (
    <div className="relative bg-gradient-to-r from-[#E1FEA2] to-[#C9F46A] text-gray-800 overflow-hidden">
      <div className="relative max-w-full px-4 sm:px-6 py-2">
        {/* Continuous Marquee */}
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {/* Render the text multiple times for seamless scrolling */}
          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={index}
              className="mx-2 text-xs sm:text-sm md:text-base font-light tracking-wide"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative gradient overlays for polish */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#E1FEA2] to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#C9F46A] to-transparent pointer-events-none"></div>

      {/* Animation Styles */}
      <style jsx>{`
        /* Marquee Animation */
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }

        /* Pause marquee animation on hover */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}