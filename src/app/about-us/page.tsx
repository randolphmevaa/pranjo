"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Scroll-to-top button hook
function useScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { showBtn, scrollToTop };
}

// Team Members Data
const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    image: "/team/alice.jpg",
  },
  {
    name: "Bob Smith",
    role: "Head of Design",
    image: "/team/bob.jpg",
  },
  {
    name: "Charlie Davis",
    role: "Marketing Lead",
    image: "/team/charlie.jpg",
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "Emma Wilson",
    feedback:
      "Pranjo has transformed my yoga practice with their high-quality gear. Highly recommend!",
  },
  {
    name: "Liam Brown",
    feedback:
      "Exceptional products and outstanding customer service. Pranjo truly cares about their customers.",
  },
];

export default function AboutUs() {
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

  // Scroll-to-top button logic
  const { showBtn, scrollToTop } = useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-body relative">
      <Header featuredProducts={featuredProducts} />

      {/* Hero Section (Parallax-like) */}
      <section
        className="relative w-full h-96 sm:h-[500px] bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80")`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Hero text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            className="text-white text-4xl sm:text-6xl font-header uppercase tracking-wide"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Pranjo
          </motion.h1>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative -mt-8">
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-gray-50"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,186.7C672,181,768,171,864,160C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-header text-gray-800">
              Our Story
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Founded in 2020, Pranjo was born out of a passion for yoga and a
              desire to provide high-quality, sustainable yoga apparel and
              accessories. Our journey began in a small studio, where we saw a
              need for products that not only perform but also align with the
              mindful practices of our community.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col md:flex-row items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1526406915896-02e0b8dce5f7?auto=format&fit=crop&w=800&q=80"
                alt="Our Journey"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-10 mt-8 md:mt-0">
              <p className="text-gray-700 mb-4">
                From day one, our mission has been to blend functionality with
                style, ensuring that every product supports your practice while
                reflecting your personal aesthetic. We&apos;ve collaborated
                with designers and artisans who share our vision, resulting in
                a collection that&apos;s both beautiful and durable.
              </p>
              <p className="text-gray-700">
                As we continue to grow, we remain committed to sustainability
                and ethical manufacturing practices. We believe that true
                well-being extends beyond the mat, and we&apos;re dedicated to
                making a positive impact on our community and the environment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative">
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-white"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,224L40,186.7C80,149,160,75,240,74.7C320,75,400,149,480,176C560,203,640,181,720,165.3C800,149,880,139,960,144C1040,149,1120,171,1200,181.3C1280,192,1360,192,1400,192L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      {/* Our Mission */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-header text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              At Pranjo, our mission is to empower individuals through mindful
              movement and high-quality yoga products. We strive to create a
              community where everyone feels supported in their yoga journey,
              regardless of their level of experience.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <FaQuoteLeft size={30} className="text-[#6B8F3D] mx-auto mb-4" />
              <h3 className="text-xl font-header text-gray-800 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                We ensure every product meets our high standards for quality,
                durability, and comfort.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <FaQuoteLeft size={30} className="text-[#6B8F3D] mx-auto mb-4" />
              <h3 className="text-xl font-header text-gray-800 mb-2">
                Sustainability
              </h3>
              <p className="text-gray-600">
                Committed to environmentally friendly practices, we prioritize
                sustainable materials and ethical manufacturing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <FaQuoteLeft size={30} className="text-[#6B8F3D] mx-auto mb-4" />
              <h3 className="text-xl font-header text-gray-800 mb-2">
                Community Focus
              </h3>
              <p className="text-gray-600">
                We’re building a supportive community where everyone can grow
                and thrive in their yoga practice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative">
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-gray-100"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L40,106.7C80,149,160,235,240,256C320,277,400,235,480,186.7C560,139,640,85,720,90.7C800,96,880,160,960,197.3C1040,235,1120,245,1200,213.3C1280,181,1360,107,1400,69.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-header text-gray-800">
              Our Team
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals dedicated to bringing the best
              yoga products to our community.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-header text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative">
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-white"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,160L40,133.3C80,107,160,53,240,69.3C320,85,400,171,480,208C560,245,640,235,720,192C800,149,880,75,960,58.7C1040,43,1120,85,1200,96C1280,107,1360,85,1400,74.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-header text-gray-800">
              Testimonials
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Hear what our customers have to say about their experiences with
              Pranjo.
            </p>
          </motion.div>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <FaQuoteLeft size={24} className="text-[#6B8F3D] mr-2" />
                  <h3 className="text-lg font-header text-gray-800">
                    {testimonial.name}
                  </h3>
                </div>
                <p className="text-gray-600">{testimonial.feedback}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Scroll-to-Top Button */}
      {showBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#6B8F3D] text-white p-3 rounded-full shadow-lg hover:bg-[#4F6B2A] transition-colors"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
