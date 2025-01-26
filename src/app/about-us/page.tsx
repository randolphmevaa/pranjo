// app/about-us/page.tsx

"use client";

import React from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../components/Header"; // Import Header component
import Footer from "../components/Footer"; // Import Footer component

// Team Members Data
const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    image: "/team/alice.jpg", // Ensure these images are in the public/team/ directory
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
  // Add more team members as needed
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
  // Add more testimonials as needed
];

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-body">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-96 sm:h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80"
          alt="Yoga Practice"
          fill
          className="object-cover brightness-50 transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
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
              Founded in 2020, Pranjo was born out of a passion for yoga and a desire to provide high-quality, sustainable yoga apparel and accessories. Our journey began in a small studio, where we saw a need for products that not only perform but also align with the mindful practices of our community.
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
                From day one, our mission has been to blend functionality with style, ensuring that every product supports your practice while reflecting your personal aesthetic. We've collaborated with designers and artisans who share our vision, resulting in a collection that's both beautiful and durable.
              </p>
              <p className="text-gray-700">
                As we continue to grow, we remain committed to sustainability and ethical manufacturing practices. We believe that true well-being extends beyond the mat, and we're dedicated to making a positive impact on our community and the environment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

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
              At Pranjo, our mission is to empower individuals through mindful movement and high-quality yoga products. We strive to create a community where everyone feels supported in their yoga journey, regardless of their level of experience.
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
              <FaQuoteLeft size={30} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-header text-gray-800 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                We ensure that every product meets our high standards for quality, durability, and comfort.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <FaQuoteLeft size={30} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-header text-gray-800 mb-2">
                Sustainability
              </h3>
              <p className="text-gray-600">
                Committed to environmentally friendly practices, we prioritize sustainable materials and ethical manufacturing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <FaQuoteLeft size={30} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-header text-gray-800 mb-2">
                Community Focus
              </h3>
              <p className="text-gray-600">
                Building a supportive community where individuals can grow and thrive in their yoga practices.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

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
              Meet the passionate individuals dedicated to bringing the best yoga products to our community.
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
              Hear what our customers have to say about their experiences with Pranjo.
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
                  <FaQuoteLeft size={24} className="text-primary mr-2" />
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
