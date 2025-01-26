// src/app/components/ImageCarousel.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom, A11y } from 'swiper/modules'; // Added A11y for accessibility
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

import SwiperCore from 'swiper';

// Initialize Swiper modules
SwiperCore.use([Navigation, Thumbs, Zoom, A11y]);

type ImageNode = {
  url: string;
  altText?: string;
};

type ImageCarouselProps = {
  images: ImageNode[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <div className="w-full">
      {/* Main Swiper */}
      <Swiper
        style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        zoom={true}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          slideLabelMessage: '{{index}} / {{slidesLength}}',
        }}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container relative w-full h-96">
              <Image
                src={image.url}
                alt={image.altText || `Product Image ${index + 1}`}
                fill
                className="object-contain rounded-lg"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                loading={index === 0 ? 'eager' : 'lazy'} // Lazy loading for non-first images
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className="mt-4"
        breakpoints={{
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        a11y={{
          enabled: true,
          slideLabelMessage: 'Thumbnail {{index}}',
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div className="relative w-full h-24">
              <Image
                src={image.url}
                alt={image.altText || `Thumbnail Image ${index + 1}`}
                fill
                className="object-cover rounded-md border border-gray-300 group-hover:opacity-80 transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       25vw"
                loading="lazy" // Lazy loading for thumbnails
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}