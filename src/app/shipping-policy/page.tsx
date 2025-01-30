// app/shipping-policy/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./shippingPolicy.css";  // <-- Import global or module CSS here

function useIntersectionFadeIn() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
    }
  }, []);

  return { ref, isVisible };
}

export default function ShippingPolicy() {
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

  // Scroll-to-top button visibility
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollBtn(true);
      else setShowScrollBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade-in Refs
  const processingRef = useIntersectionFadeIn();
  const shippingRatesRef = useIntersectionFadeIn();
  const internationalRef = useIntersectionFadeIn();
  const contactRef = useIntersectionFadeIn();

  // Smooth scroll to top
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header featuredProducts={featuredProducts} />

      {/* Parallax Hero Section */}
      <section
        className="relative h-[70vh] flex flex-col items-center justify-center text-white bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/images/leaf-pattern.svg')`,
          backgroundColor: "#56ab2f", // fallback color
        }}
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#a8e063cc] to-[#56ab2fcc]" />

        {/* Floating Leaves (CSS in shippingPolicy.css) */}
        <div className="leaf-animation leaf-left" />
        <div className="leaf-animation leaf-right" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-6xl sm:text-7xl font-header font-bold drop-shadow-md mb-6 animate-fadeInUp">
            Shipping Policy
          </h1>
          <p className="text-xl sm:text-2xl font-body font-light animate-fadeInUp delay-150">
            We ensure your yoga essentials reach you swiftly and in perfect condition.
          </p>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative -mt-8">
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-white"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,218.7C672,245,768,235,864,213.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <main className="bg-[#F7F9F4] pb-16 relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
          {/* Intro Paragraph */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-header font-bold text-[#4F6B2A] mb-4">
              Delivering Peace of Mind
            </h2>
            <p className="text-lg font-body text-gray-700 max-w-2xl mx-auto">
              At <strong>Pranjo</strong>, each shipment is an opportunity to deliver calm and
              confidence. Here is everything you need to know about our shipping process.
            </p>
          </div>

          <section className="space-y-12">
            {/* Processing Times Card */}
            <div
              ref={processingRef.ref}
              className={`relative p-8 bg-white rounded-2xl shadow-lg transform-gpu transition-transform hover:-rotate-1 hover:scale-[1.02]
              ${
                processingRef.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } duration-700 ease-out`}
            >
              <div className="absolute -top-6 -right-6">
                <span className="block w-16 h-16 rounded-full bg-[#E1FEA2] flex items-center justify-center text-[#6B8F3D] text-3xl shadow-md select-none">
                  🌿
                </span>
              </div>
              <h3 className="text-3xl font-header font-semibold text-gray-900 mb-4">
                Processing Times
              </h3>
              <p className="font-body text-gray-700 leading-relaxed">
                Orders are processed within <strong>1-2 business days</strong>. Orders placed on
                weekends or holidays will be processed the following business day.
              </p>
            </div>

            {/* Shipping Rates & Delivery Estimates */}
            <div
              ref={shippingRatesRef.ref}
              className={`p-8 bg-white rounded-2xl shadow-lg transform-gpu transition-transform hover:rotate-1 hover:scale-[1.02]
              ${
                shippingRatesRef.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } duration-700 ease-out`}
            >
              <h3 className="text-3xl font-header font-semibold text-[#6B8F3D] mb-4">
                Shipping Rates & Delivery Estimates
              </h3>
              <p className="font-body text-gray-700 leading-relaxed mb-6">
                Below are estimated delivery times for our shipping methods:
              </p>
              <ul className="font-body text-gray-700 space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-[#6B8F3D] mt-1">🌱</span>
                  <p>
                    <strong>Standard Shipping:</strong> 5-7 business days.
                  </p>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#6B8F3D] mt-1">🚚</span>
                  <p>
                    <strong>Express Shipping:</strong> 2-3 business days.
                  </p>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#6B8F3D] mt-1">⚡</span>
                  <p>
                    <strong>Overnight Shipping:</strong> 1 business day.
                  </p>
                </li>
              </ul>
            </div>

            {/* International Shipping */}
            <div
              ref={internationalRef.ref}
              className={`p-8 bg-white border-l-8 border-[#6B8F3D] rounded-r-2xl shadow-lg transform-gpu transition-transform hover:-rotate-1 hover:scale-[1.02]
              ${
                internationalRef.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } duration-700 ease-out`}
            >
              <h3 className="text-3xl font-header font-semibold text-gray-900 mb-4">
                International Shipping
              </h3>
              <p className="font-body text-gray-700 leading-relaxed">
                We ship to select international destinations. Delivery times and rates vary by
                location. Customs fees and duties may apply.
              </p>
            </div>

            {/* Contact Us */}
            <div
              ref={contactRef.ref}
              className={`relative p-8 bg-gradient-to-br from-[#FFFFFF] to-[#E1FEA2] rounded-2xl shadow-xl transform-gpu transition-transform hover:rotate-1 hover:scale-[1.02]
              ${
                contactRef.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } duration-700 ease-out`}
            >
              <div className="absolute -top-5 left-4 text-[#6B8F3D] opacity-50 text-4xl">
                💌
              </div>
              <h3 className="text-3xl font-header font-semibold text-gray-900 mb-4">Contact Us</h3>
              <p className="font-body text-gray-700">
                Questions? Email us at{" "}
                <a
                  href="mailto:shipping@pranjo.com"
                  className="text-[#6B8F3D] underline hover:text-[#4F6B2A] transition-colors"
                >
                  shipping@pranjo.com
                </a>
                , and we’ll be happy to assist you.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Second Wave Divider (above the footer) */}
      <div className="relative">
        <svg
          className="block w-full h-16 md:h-32 lg:h-40 text-[#F7F9F4]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L40,90.7C80,117,160,171,240,181.3C320,192,400,160,480,138.7C560,117,640,107,720,106.7C800,107,880,117,960,149.3C1040,181,1120,235,1200,224C1280,213,1360,139,1400,101.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollBtn && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#6B8F3D] text-white p-3 rounded-full shadow-lg hover:bg-[#4F6B2A] transition-colors"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
