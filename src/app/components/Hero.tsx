// components/Hero.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      role="banner"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
        poster="/images/hero-poster.jpg" // Provide a fallback image
      >
        <source
          src="https://videos.pexels.com/video-files/3327806/3327806-hd_1920_1080_24fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/3327806/3327806-hd_1920_1080_24fps.webm"
          type="video/webm"
        />
        Your browser does not support HTML5 video.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

      {/* Hero Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Backdrop Blur Panel */}
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/20 px-8 py-10 rounded-2xl shadow-2xl max-w-2xl mx-auto transition-transform duration-700 hover:scale-105"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold font-header text-white leading-tight tracking-wide drop-shadow-lg mb-6`}
          >
            Elevate Your Practice, Embrace Your Journey
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg sm:text-xl md:text-2xl font-body text-gray-200 mb-8`}
          >
            Discover unparalleled comfort and style with every movement.
          </p>

          {/* CTA Button */}
          <motion.a
            href="#products"
            className={`inline-flex items-center bg-[#E1FEA2] text-black text-sm sm:text-base font-semibold font-body px-8 py-3 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1FEA2] focus:ring-opacity-50`}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(225, 254, 162, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Shop Now</span>
            {/* Right Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-10 left-8 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-600 rounded-full blur-3xl opacity-40"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-28 right-24 w-10 h-10 bg-gradient-to-br from-green-400 to-teal-600 rounded-full blur-3xl opacity-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Scroll Indicator */}
      <div className="absolute bottom-10">
        <a href="#products" aria-label="Scroll Down">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </a>
      </div>

      {/* Tailwind Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;