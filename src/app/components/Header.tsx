// src/app/components/Header.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiX, HiMenu, HiChevronDown } from "react-icons/hi";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import Link from 'next/link';

// type VariantNode = {
//   id: string;
//   title: string;
//   image?: {
//     url: string;
//     altText?: string;
//   };
//   priceV2?: {
//     amount?: string;
//     currencyCode?: string;
//   };
// };

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
      currencyCode?: string;
    };
  };
};

const countries = [
  { name: "United Kingdom (GBP £)", display: "GBP £" },
  { name: "United States (USD $)", display: "USD $" },
  { name: "France (EUR €)", display: "EUR €" },
  { name: "Germany (EUR €)", display: "EUR €" },
  { name: "Australia (AUD $)", display: "AUD $" },
  { name: "Canada (CAD $)", display: "CAD $" }, // Corrected currency code
  { name: "Netherlands (EUR €)", display: "EUR €" },
  { name: "Singapore (SGD $)", display: "SGD $" }, // Corrected currency code
  { name: "United Arab Emirates (AED د.إ)", display: "AED د.إ" }, // Corrected currency code and symbol
];

export default function Header({
  featuredProducts = [],
}: {
  featuredProducts: { node: ProductNode }[];
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductNode[]>([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // For mobile dropdowns

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Handle navbar visibility based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsNavbarVisible(false); // Hide navbar on scroll down
      } else {
        setIsNavbarVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery) {
      const results = featuredProducts
        .map(({ node }) => node)
        .filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, featuredProducts]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle Escape key to close modals
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-md transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left Section: Hamburger Menu and Search Icon (Mobile) */}
        <div className="flex items-center md:hidden">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-700 hover:text-black focus:outline-none mr-4"
            aria-label="Open Menu"
          >
            <HiMenu className="w-6 h-6" />
          </button>
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-700 hover:text-black focus:outline-none"
            aria-label="Open Search"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Center Section: Logo */}
        <div className="flex-1 flex justify-center md:hidden">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://cdn.prod.website-files.com/65666b7d3e4d8058ee4c34d2/6790b7e16a4d77727353361c_Pranjo..svg"
              alt="Pranjo Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </ Link>
        </div>

        {/* Right Section: Login and Cart Icons (Mobile) */}
        <div className="flex items-center md:hidden">
          {/* Login Icon */}
          <Link
            href="/login"
            className="text-gray-700 hover:text-black mr-4"
            aria-label="Login"
          >
            <FiUser className="w-6 h-6" />
          </ Link>
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="text-gray-700 hover:text-black relative"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1">
              3
            </span>
          </ Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#shop"
            className="font-body text-gray-700 hover:text-black transition-colors duration-200"
          >
            Shop
          </ Link>
          <Link
            href="#leggings"
            className="font-body text-gray-700 hover:text-black transition-colors duration-200"
          >
            Leggings
          </Link>
          <Link
            href="#discover"
            className="font-body text-gray-700 hover:text-black transition-colors duration-200"
          >
            Discover
          </ Link>
          <Link
            href="#sale"
            className="font-body text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            SALE
          </ Link>
        </div>

        {/* Center Section: Logo */}
        <div className="hidden md:flex-1 md:flex md:justify-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://cdn.prod.website-files.com/65666b7d3e4d8058ee4c34d2/6790b7e16a4d77727353361c_Pranjo..svg"
              alt="Pranjo Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </ Link>
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center text-gray-700 hover:text-black focus:outline-none"
            aria-label="Open Search"
          >
            <FiSearch className="w-5 h-5 mr-2" />
            <span className="font-body">Search</span>
          </button>

          {/* Currency and Country Selector */}
          <div className="relative">
            <button
              className="text-sm font-body border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setOpenDropdown(openDropdown === "currency" ? null : "currency")}
              aria-haspopup="listbox"
              aria-expanded={openDropdown === "currency"}
            >
              {selectedCountry.display}
              <HiChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <AnimatePresence>
              {openDropdown === "currency" && (
                <motion.ul
                  className="absolute top-12 left-0 w-56 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="listbox"
                  aria-label="Currency and Country Selector"
                >
                  {countries.map((country) => (
                    <li
                      key={country.name}
                      onClick={() => {
                        setSelectedCountry(country);
                        setOpenDropdown(null);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                      role="option"
                      aria-selected={selectedCountry.name === country.name}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSelectedCountry(country);
                          setOpenDropdown(null);
                        }
                      }}
                    >
                      {country.name}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Login Icon */}
          <Link
            href="/login"
            className="text-gray-700 hover:text-black"
            aria-label="Login"
          >
            <FiUser className="w-6 h-6" />
          </ Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="text-gray-700 hover:text-black relative"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1">
              3
            </span>
          </ Link>
        </div>
      </nav>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <FocusTrap>
            <motion.div
              ref={searchBarRef}
              className="absolute top-full left-0 w-full bg-white shadow-md z-40"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="dialog"
              aria-modal="true"
              aria-label="Search"
            >
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 px-4 text-sm font-body border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label="Search Input"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-3 text-gray-700 hover:text-black"
                    aria-label="Close Search"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
                {searchResults.length > 0 && (
                  <ul className="mt-4 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
                    {searchResults.map((product) => (
                      <li
                        key={product.id}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-4"
                      >
                        {product.featuredImage?.url ? (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-body font-medium text-gray-800">
                            {product.title}
                          </p>
                          <p className="text-sm font-body text-gray-500">
                            {product.priceRange?.minVariantPrice?.amount}{" "}
                            {product.priceRange?.minVariantPrice?.currencyCode}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <FocusTrap>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              style={{ height: "1000px" }}
              aria-modal="true"
              aria-label="Mobile Menu"
            >
              <motion.div
                ref={mobileMenuRef}
                className="w-full bg-white h-full p-6 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-black focus:outline-none"
                    aria-label="Close Menu"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation Links with Dropdowns */}
                <ul className="mt-8 space-y-4">
                  {/* New Year Sale */}
                  <li>
                    <button
                      className="w-full flex justify-between items-center font-body text-gray-700 hover:text-black transition-colors duration-200 focus:outline-none"
                      onClick={() =>
                        setOpenDropdown(openDropdown === "sale" ? null : "sale")
                      }
                      aria-haspopup="true"
                      aria-expanded={openDropdown === "sale"}
                    >
                      New Year Sale
                      <HiChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === "sale" ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === "sale" && (
                        <motion.ul
                          className="mt-2 ml-4 space-y-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <li>
                            <Link
                              href="#holiday-deals"
                              className="block font-body text-gray-600 hover:text-black transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Holiday Deals
                            </ Link>
                          </li>
                          <li>
                            <Link
                              href="#winter-collection"
                              className="block font-body text-gray-600 hover:text-black transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Winter Collection
                            </ Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* Shop All */}
                  <li>
                    <Link
                      href="#shop-all"
                      className="block font-body text-gray-700 hover:text-black transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Shop All
                    </ Link>
                  </li>

                  {/* Shop Leggings */}
                  <li>
                    <Link
                      href="#shop-leggings"
                      className="block font-body text-gray-700 hover:text-black transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Shop Leggings
                    </ Link>
                  </li>

                  {/* Discover */}
                  <li>
                    <Link
                      href="#discover"
                      className="block font-body text-gray-700 hover:text-black transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Discover
                    </ Link>
                  </li>

                  {/* More */}
                  <li>
                    <button
                      className="w-full flex justify-between items-center font-body text-gray-700 hover:text-black transition-colors duration-200 focus:outline-none"
                      onClick={() =>
                        setOpenDropdown(openDropdown === "more" ? null : "more")
                      }
                      aria-haspopup="true"
                      aria-expanded={openDropdown === "more"}
                    >
                      More
                      <HiChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === "more" ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === "more" && (
                        <motion.ul
                          className="mt-2 ml-4 space-y-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <li>
                            <Link
                              href="/about-us"
                              className="block font-body text-gray-600 hover:text-black transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              About Us
                            </ Link>
                          </li>
                          <li>
                            <Link
                              href="/contact"
                              className="block font-body text-gray-600 hover:text-black transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Contact
                            </ Link>
                          </li>
                          <li>
                            <Link
                              href="#careers"
                              className="block font-body text-gray-600 hover:text-black transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Careers
                            </ Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                </ul>

                {/* Country and Currency Selector at Bottom */}
                <div className="mt-8">
                  <h3 className="text-gray-700 font-body mb-2">Select Country & Currency</h3>
                  <div className="relative">
                    <button
                      className="w-full text-sm font-body border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() =>
                        setOpenDropdown(openDropdown === "currency" ? null : "currency")
                      }
                      aria-haspopup="listbox"
                      aria-expanded={openDropdown === "currency"}
                    >
                      {selectedCountry.display}
                      <HiChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === "currency" && (
                        <motion.ul
                          className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          role="listbox"
                          aria-label="Country and Currency Selector"
                        >
                          {countries.map((country) => (
                            <li
                              key={country.name}
                              onClick={() => {
                                setSelectedCountry(country);
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false); // Close menu after selection
                              }}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                              role="option"
                              aria-selected={selectedCountry.name === country.name}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  setSelectedCountry(country);
                                  setOpenDropdown(null);
                                  setIsMobileMenuOpen(false);
                                }
                              }}
                            >
                              {country.name}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </header>
  );
}
