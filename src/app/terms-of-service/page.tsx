// app/terms-of-service/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./termsOfService.css";  // <-- Import your custom styles here

/* Hook: Intersection Observer for fade-in animations */
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

export default function TermsOfService() {
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

  // Scroll-to-top button
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollBtn(true);
      else setShowScrollBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Intersection Observer for fade-in
  const section1Ref = useIntersectionFadeIn();
  const section2Ref = useIntersectionFadeIn();
  const section3Ref = useIntersectionFadeIn();
  const section4Ref = useIntersectionFadeIn();

  return (
    <>
      <Header featuredProducts={featuredProducts} />

      {/* Hero / Parallax Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-white bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/images/leaf-pattern.svg')`,
          backgroundColor: "#56ab2f", // fallback color
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#a8e063cc] to-[#56ab2fcc]" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h1 className="text-5xl sm:text-6xl font-header font-bold mb-4 animate-fadeInUp">
            Terms of Service
          </h1>
          <p className="text-lg sm:text-xl font-body font-light animate-fadeInUp delay-150">
            These terms govern your use of <strong>Pranjo</strong> and ensure fairness and
            transparency for all.
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

      {/* Main Content */}
      <main className="bg-[#F7F9F4] pb-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
          <section className="space-y-10">
            {/* Introduction */}
            <div
              ref={section1Ref.ref}
              className={`p-8 bg-white rounded-2xl shadow-lg card-hover transform-gpu
                ${
                  section1Ref.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } duration-700 ease-out`}
            >
              <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">
                Introduction
              </h2>
              <p className="font-body text-gray-700 leading-relaxed">
                Welcome to <strong>Pranjo</strong>. By using this site, you agree to these terms.
                Please read them carefully.
              </p>
            </div>

            {/* Prohibited Activities */}
            <div
              ref={section2Ref.ref}
              className={`p-8 bg-[#E1FEA2] rounded-2xl shadow-md card-hover transform-gpu
                ${
                  section2Ref.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } duration-700 ease-out`}
            >
              <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">
                Prohibited Activities
              </h2>
              <p className="font-body text-gray-700 leading-relaxed">
                Users may not engage in activities that disrupt our website’s functionality, violate
                laws, or harm others.
              </p>
            </div>

            {/* Changes to Terms */}
            <div
              ref={section3Ref.ref}
              className={`p-8 bg-white rounded-2xl shadow-lg card-hover transform-gpu
                ${
                  section3Ref.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } duration-700 ease-out`}
            >
              <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">
                Changes to Terms
              </h2>
              <p className="font-body text-gray-700 leading-relaxed">
                Pranjo reserves the right to update these terms as needed. Notifications of
                significant changes will be posted.
              </p>
            </div>

            {/* Contact Information */}
            <div
              ref={section4Ref.ref}
              className={`p-8 bg-[#E1FEA2] rounded-2xl shadow-md card-hover transform-gpu
                ${
                  section4Ref.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } duration-700 ease-out`}
            >
              <h2 className="text-3xl font-header font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="font-body text-gray-700">
                Have questions? Email us at{" "}
                <a
                  href="mailto:terms@pranjo.com"
                  className="text-[#6B8F3D] underline hover:text-[#4F6B2A]"
                >
                  terms@pranjo.com
                </a>.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Second Wave Divider */}
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

      {/* Scroll-to-top Button */}
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
