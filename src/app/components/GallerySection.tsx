// app/components/GallerySection.tsx

"use client";

import React from "react";
import Image from "next/image"; // If using Next.js. Otherwise, use a standard <img> tag.
import { motion } from "framer-motion"; // For animations

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1649887974297-4be052375a67?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Person practicing yoga outdoors",
    className: "lg:col-span-2 lg:row-span-2",
    aspectRatio: "4/3", // Large image aspect ratio
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Yoga class in session",
    className: "",
    aspectRatio: "3/2", // Smaller image aspect ratio
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1552286450-4a669f880062?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Close-up of yoga gear",
    className: "",
    aspectRatio: "3/2",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1593164842249-d74fc06dae05?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Sunset yoga session",
    className: "",
    aspectRatio: "3/2",
  },
];

export default function GallerySection() {
  return (
    <section
      className="py-16 px-6 sm:px-8 bg-white"
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          id="gallery-heading"
          className="text-3xl sm:text-4xl font-header text-gray-800 mb-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          IN REAL LIFE @Pranjo.
        </motion.h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden rounded-lg ${image.className} aspect-w-${
                image.aspectRatio.split("/")[0]
              } aspect-h-${image.aspectRatio.split("/")[1]}`}
              style={{ height: "300px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                className="transform transition-transform duration-500 ease-in-out hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}