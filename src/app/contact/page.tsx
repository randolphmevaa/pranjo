// app/contact/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Track scroll position for "scroll-to-top" button
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollBtn(true);
      else setShowScrollBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus("error");
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  };

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

  return (
    <>
      <Head>
        <title>Contact Us | Pranjo Yoga</title>
        <meta
          name="description"
          content="Get in touch with Pranjo Yoga for inquiries, support, and feedback. We&apos;re here to help you elevate your yoga practice."
        />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50 font-body relative">
        {/* Header */}
        <Header featuredProducts={featuredProducts} />

        {/* Parallax Hero Section */}
        <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat flex items-center justify-center">
          {/* Using a background image with next/image fill */}
          <Image
            src="https://images.unsplash.com/photo-1559057393-ef95b18ff70d?auto=format&fit=crop&w=1950&q=80"
            alt="Contact Pranjo Yoga"
            fill
            className="object-cover brightness-75 transition-transform duration-700 ease-in-out transform hover:scale-110"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6B8F3D66] to-[#A8E06366]" />

          {/* Hero Text */}
          <div className="relative z-10 text-center max-w-2xl px-4">
            <motion.h1
              className="text-white text-4xl sm:text-5xl md:text-6xl font-header uppercase tracking-wider drop-shadow-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Get in Touch
            </motion.h1>
          </div>
        </section>

        {/* Wave Divider #1 */}
        <div className="relative -mt-8">
          <svg
            className="block w-full h-16 md:h-32 lg:h-40 text-gray-50"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,32L48,53.3C96,75,192,117,288,133.3C384,149,480,139,576,128C672,117,768,107,864,128C960,149,1056,203,1152,224C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-header text-gray-800">
                Contact Information
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                We&apos;d love to hear from you! Whether you have a question about
                our products, need assistance with your order, or just want to
                share your experience, feel free to reach out.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Phone */}
              <motion.div
                className="flex items-start space-x-4 bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaPhoneAlt className="text-[#6B8F3D] text-3xl" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (234) 567-890</p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-start space-x-4 bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaEnvelope className="text-[#6B8F3D] text-3xl" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@pranjoyoga.com</p>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                className="flex items-start space-x-4 bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaMapMarkerAlt className="text-[#6B8F3D] text-3xl" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    123 Yoga Street, Harmony City, CA 90210
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Wave Divider #2 */}
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-white"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,320L40,293.3C80,267,160,213,240,170.7C320,128,400,96,480,85.3C560,75,640,85,720,117.3C800,149,880,203,960,186.7C1040,171,1120,85,1200,42.7C1280,0,1360,0,1400,0L1440,0L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          />
        </svg>

        {/* Contact Form */}
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
                Send Us a Message
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Have a question or feedback? Fill out the form below and we&apos;ll
                get back to you as soon as possible.
              </p>
            </motion.div>

            <motion.form
              className="bg-white bg-opacity-20 backdrop-blur-xs p-10 rounded-2xl shadow-2xl"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E063] transition"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E063] transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="subject"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Subject<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E063] transition"
                    placeholder="Subject"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Message<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E063] transition resize-none"
                    placeholder="Your message..."
                    rows={5}
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#A8E063] text-gray-800 font-body px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A8E063] focus:ring-opacity-50"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 15px 25px rgba(168, 224, 99, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={formStatus === "loading"}
                >
                  {formStatus === "loading" ? "Sending..." : "Send Message"}
                </motion.button>
              </div>

              {/* Form Status Messages */}
              {formStatus === "success" && (
                <motion.p
                  className="mt-6 text-green-600 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Your message has been sent successfully!
                </motion.p>
              )}
              {formStatus === "error" && (
                <motion.p
                  className="mt-6 text-red-600 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Something went wrong. Please try again later.
                </motion.p>
              )}
            </motion.form>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-header text-gray-800">
                Our Location
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Visit us at our headquarters or drop by for a friendly chat!
              </p>
            </motion.div>
            <motion.div
              className="w-full h-96 rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019895939591!2d-122.4194150846813!3d37.77492927975916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c3f6f7e7b%3A0x7abaf3f0b1c0c1a5!2s123%20Yoga%20St%2C%20San%20Francisco%2C%20CA%2094114%2C%20USA!5e0!3m2!1sen!2sin!4v1615465426340!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Pranjo Yoga Location"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* Wave Divider #3 */}
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-gray-50"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L60,96C120,128,240,192,360,208C480,224,600,192,720,160C840,128,960,96,1080,85.3C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>

        {/* Social Media & Trust Badges */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Social Media Links */}
              <div className="flex space-x-6">
                <a
                  href="https://facebook.com/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#6B8F3D] transition"
                  aria-label="Pranjo Yoga on Facebook"
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="https://instagram.com/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#6B8F3D] transition"
                  aria-label="Pranjo Yoga on Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://twitter.com/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#6B8F3D] transition"
                  aria-label="Pranjo Yoga on Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://linkedin.com/company/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#6B8F3D] transition"
                  aria-label="Pranjo Yoga on LinkedIn"
                >
                  <FaLinkedinIn size={24} />
                </a>
              </div>
              {/* Trust Badges (dummy images) */}
              <div className="flex space-x-4">
                <Image
                  src="/trust-badge1.png"
                  alt="Secure Payment"
                  width={50}
                  height={50}
                />
                <Image
                  src="/trust-badge2.png"
                  alt="Free Shipping"
                  width={50}
                  height={50}
                />
                <Image
                  src="/trust-badge3.png"
                  alt="24/7 Support"
                  width={50}
                  height={50}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Scroll-to-Top Button */}
        {showScrollBtn && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#6B8F3D] text-white p-3 rounded-full shadow-lg hover:bg-[#4F6B2A] transition-colors z-50"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </div>
    </>
  );
}
