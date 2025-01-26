// app/contact/page.tsx

"use client";

import React, { useState } from "react";
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
import Header from "../components/Header"; // Import Header component
import Footer from "../components/Footer"; // Import Footer component
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
        headers: {
          "Content-Type": "application/json",
        },
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
        {/* Add more meta tags as needed */}
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50 font-body">
        {/* Header */}
        <Header featuredProducts={featuredProducts} />

        {/* Hero Section */}
        <section className="relative w-full h-80 sm:h-96 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1559057393-ef95b18ff70d?auto=format&fit=crop&w=1950&q=80"
            alt="Contact Pranjo Yoga"
            fill
            className="object-cover brightness-50 transition-transform duration-700 ease-in-out transform hover:scale-110"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              className="text-white text-3xl sm:text-5xl font-header uppercase tracking-wider text-center px-4"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Get in Touch
            </motion.h1>
          </div>
        </section>

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
                We&apos;d love to hear from you! Whether you have a question about our
                products, need assistance with your order, or just want to share
                your experience, feel free to reach out.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
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
                  <FaPhoneAlt className="text-primary text-3xl" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Phone
                  </h3>
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
                  <FaEnvelope className="text-primary text-3xl" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Email
                  </h3>
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
                  <FaMapMarkerAlt className="text-primary text-3xl" />
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
              className="bg-white bg-opacity-20 backdrop-blur-xs p-10 rounded-2xl shadow-2xl glassmorphism"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
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
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
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
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
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
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
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
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                    placeholder="Your message..."
                    rows={5}
                  ></textarea>
                </div>
              </div>
              {/* Submit Button */}
              <div className="mt-8 text-center">
                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center bg-primary text-black font-body px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 15px 25px rgba(225, 254, 162, 0.4)",
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
              transition={{ duration: 1, delay: 0.5 }}
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

        {/* Social Media & Trust Badges */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Social Media Links */}
              <div className="flex space-x-6">
                <a
                  href="https://facebook.com/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition"
                  aria-label="Pranjo Yoga on Facebook"
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="https://instagram.com/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition"
                  aria-label="Pranjo Yoga on Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://twitter.com/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition"
                  aria-label="Pranjo Yoga on Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://linkedin.com/company/pranjoyoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition"
                  aria-label="Pranjo Yoga on LinkedIn"
                >
                  <FaLinkedinIn size={24} />
                </a>
              </div>
              {/* Trust Badges */}
              <div className="flex space-x-4">
                {/* Replace with actual trust badges or certifications */}
                <Image
                  src="/trust-badge1.png" // Place trust badge images in public directory
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
      </div>
    </>
  );
}