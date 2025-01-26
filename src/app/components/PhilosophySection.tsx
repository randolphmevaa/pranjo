// app/components/PhilosophySection.tsx

"use client";

import React from "react";
import Image from "next/image"; // If using Next.js. Otherwise, use a standard <img> tag.
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"; // Decorative icons
import { motion } from "framer-motion"; // For animations

export default function PhilosophySection() {
  return (
    <section className="relative w-full border-black" id="philosophy">
      {/* Background Image with Enhanced Overlay */}
      <div className="w-full h-80 sm:h-96 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?q=80&w=2292&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Pranjo Philosophy"
          layout="fill"
          objectFit="cover"
          className="brightness-50 transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        {/* Overlay Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-white text-3xl sm:text-5xl font-header uppercase tracking-wide drop-shadow-md">
            AUTHENTICITY
          </h2>
        </motion.div>
      </div>

      {/* Descriptive Text and Button with Enhanced UI */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 bg-white">
        <div className="flex flex-col items-center text-center">
          {/* Decorative Icons with Animation */}
          <motion.div
            className="text-gray-300 mb-4 flex items-center justify-center space-x-2"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            aria-hidden="true"
          >
            <FaQuoteLeft size={40} />
            <FaQuoteRight size={40} />
          </motion.div>

          {/* Descriptive Text with Fade-In Effect */}
          <motion.p
            className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
          >
            We&apos;re born from the desire for less but better performance-wear. Products precision engineered to perform - day after day. Every product is developed with an understated style and quality that lasts.
          </motion.p>
          <motion.p
            className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
          >
            We don&apos;t do seasonal trends or motivational messages that tell you &apos;you can do it&apos;. We&apos;re straight up, tell it like it is - No bullshit. Like the fact we&apos;re far from the cheapest, but we might just be the best.
          </motion.p>

          {/* Call-to-Action Button with Hover Animation */}
          {/* <motion.a
            href="/about-us"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-blue-700 transition-colors duration-200 shadow-lg transform hover:scale-105 font-body"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            viewport={{ once: true }}
            aria-label="Learn more about us"
          >
            About Us
          </motion.a> */}
          {/* CTA Button */}
                    <motion.a
                      href="/about-us"
                      className={`inline-flex items-center bg-[#E1FEA2] text-black text-sm sm:text-base font-semibold font-body px-8 py-3 rounded-lg shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1FEA2] focus:ring-opacity-50`}
                      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(225, 254, 162, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>About Us</span>
                    </motion.a>
        </div>
      </div>
    </section>
  );
}