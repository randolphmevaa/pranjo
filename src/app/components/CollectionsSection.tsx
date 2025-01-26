// components/CollectionsSection.tsx

"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

// -- TYPES --
type CollectionNode = {
  id: string;
  title: string;
  handle: string;
  image?: {
    url: string;
    altText?: string;
  };
};

// -- COLLECTIONS COMPONENT -----------------------------------------------
export default function CollectionsSection({
  collections,
}: {
  collections: { node: CollectionNode }[];
}) {
  if (!collections || collections.length === 0) return null;

  // Only display the top 3 collections
  const topCollections = collections.slice(0, 3);

  // Embla carousel setup for mobile responsiveness
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    speed: 8, // Adjusted speed for smoother transition
    draggable: true,
    axis: "x",
    align: "start",
    skipSnaps: false,
    breakpoints: {
      "(min-width: 768px)": {
        slidesToScroll: 1,
        dragFree: false,
      },
    },
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Handle Embla Carousel resize to ensure smooth looping
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, topCollections]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        emblaApi?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        emblaApi?.scrollNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi]);

  return (
    <section className="py-16 px-4 sm:px-8 bg-gray-50" id="collections">
      <div className="relative group max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-left text-gray-900">
            Our Collections
          </h2>
        </div>

        {/* Embla viewport + container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {topCollections.map(({ node }) => (
              <CollectionCard key={node.id} collection={node} />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="opacity-0 group-hover:opacity-100 transition-opacity 
                     absolute left-3 top-1/2 -translate-y-1/2 
                     bg-white text-gray-700 p-2 rounded-full 
                     shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 z-10"
          aria-label="Previous Collection"
        >
          <HiOutlineChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="opacity-0 group-hover:opacity-100 transition-opacity 
                     absolute right-3 top-1/2 -translate-y-1/2 
                     bg-white text-gray-700 p-2 rounded-full 
                     shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 z-10"
          aria-label="Next Collection"
        >
          <HiOutlineChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

// -- SINGLE COLLECTION CARD COMPONENT ----------------------------------------------
function CollectionCard({ collection }: { collection: CollectionNode }) {
  const { id, title, image, handle } = collection;

  return (
    <a
      href={`/collections/${handle}`}
      className="relative group block w-full h-80 rounded-lg overflow-hidden 
                 transform transition-transform duration-300 hover:scale-105 shadow-lg"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.altText || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Collection Name */}
      <h3 className="absolute bottom-4 left-4 z-10 text-white 
                 text-xl font-header truncate">
        {title}
      </h3>

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center 
                   bg-white/50 backdrop-blur-sm text-gray-800 text-lg font-semibold 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Explore Collection
      </div>
    </a>
  );
}