// app/components/Footer.tsx

"use client";

import React from "react";
import Image from "next/image"; // If using Next.js. Otherwise, use a regular <img> tag.
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="bg-gray-100 py-16 px-6 sm:px-8 mt-16"
      id="footer"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <a href="/" aria-label="Pranjo Home">
            <Image
              src="https://cdn.prod.website-files.com/65666b7d3e4d8058ee4c34d2/6790b7e16a4d77727353361c_Pranjo..svg"
              alt="Pranjo Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </a>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-lg font-header mb-4">About Us</h4>
            <p className="text-sm text-gray-700 font-body">
              Crafted for movement and mindful living, we deliver timeless
              designs and innovative yoga gear.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-header mb-4">Contact</h4>
            <ul className="text-sm text-gray-700 space-y-1 font-body">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@yogastore.com"
                  className="hover:underline"
                >
                  support@yogastore.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:underline">
                  +1 234 567 890
                </a>
              </li>
              <li>
                Address:{" "}
                <a
                  href="https://goo.gl/maps/your-location"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  123 Yoga Street, London, UK
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h4 className="text-lg font-header mb-4">Stay Updated</h4>
            <form className="flex flex-col sm:flex-row gap-2" aria-label="Subscribe to newsletter">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                aria-label="Email Address"
                required
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 bg-[#E1FEA2] text-sm sm:text-base font-semibold font-body px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors duration-200 font-body"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-header mb-4">Follow Us</h4>
            <ul className="flex gap-4">
              <li>
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Links and Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
          <ul className="flex gap-4 text-sm text-gray-700 font-body">
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/shipping-policy" className="hover:underline">
                Shipping Policy
              </a>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-4 sm:mt-0 font-body">
            © {new Date().getFullYear()} Pranjo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;