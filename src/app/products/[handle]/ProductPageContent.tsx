// src/app/products/[handle]/ProductPageContent.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from "@/app/components/Header";
import Footer from '@/app/components/Footer';
import VariantSelector from '@/app/components/VariantSelector';
import AddToCartButton from '@/app/components/AddToCartButton';
import RelatedProducts from '@/app/components/RelatedProducts'; // Client Component
import ImageModal from '@/app/components/ImageModal'; // Client Component

type VariantNode = {
  id: string;
  title: string;
  priceV2?: {
    amount?: string;
    currencyCode?: string;
  };
  image?: {
    url: string;
    altText?: string;
  };
};

type ProductNode = {
  id: string;
  title: string;
  description: string;
  handle: string;
  images?: {
    edges: { node: { url: string; altText?: string } }[];
  };
  variants?: {
    edges: { node: VariantNode }[];
  };
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
      currencyCode?: string;
    };
  };
};

interface ProductPageContentProps {
  product: ProductNode;
  relatedProducts: Array<{
    id: string;
    title: string;
    handle: string;
    price: string;
    imageUrl: string;
    altText: string;
  }>;
}

const ProductPageContent: React.FC<ProductPageContentProps> = ({ product, relatedProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentAlt, setCurrentAlt] = useState<string>('');

  const openModal = (url: string, alt: string) => {
    setCurrentImage(url);
    setCurrentAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
    setCurrentAlt('');
  };

  return (
    <main className="min-h-screen bg-brandGray text-gray-900 font-body">
      <Header />

      {/* Product Details */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col space-y-6">
          {/* Main Image */}
          {product.images && product.images.edges.length > 0 && (
            <div
              className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openModal(product.images.edges[0].node.url, product.images.edges[0].node.altText || product.title)}
            >
              <Image
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText || product.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       50vw"
              />
            </div>
          )}

          {/* Thumbnail Images */}
          {product.images && product.images.edges.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.edges.slice(1).map(({ node }, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-md overflow-hidden shadow-sm flex-shrink-0 cursor-pointer"
                  onClick={() => openModal(node.url, node.altText || `${product.title} thumbnail ${index + 2}`)}
                >
                  <Image
                    src={node.url}
                    alt={node.altText || `${product.title} thumbnail ${index + 2}`}
                    fill
                    className="object-cover hover:opacity-80 transition-opacity duration-300"
                    sizes="(max-width: 768px) 25vw,
                           (max-width: 1200px) 20vw,
                           20vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-4xl font-header text-brandGreen">{product.title}</h1>
            <p className="text-2xl text-brandGreen font-semibold mt-4">
              {product.priceRange?.minVariantPrice?.amount} {product.priceRange?.minVariantPrice?.currencyCode}
            </p>
          </div>

          <div
            className="prose prose-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Variant Selection */}
          {product.variants && product.variants.edges.length > 0 && (
            <VariantSelector variants={product.variants.edges} />
          )}

          {/* Add to Cart Button */}
          <AddToCartButton product={product} />

          {/* Additional Information */}
          <div className="mt-6">
            <h2 className="text-xl font-header text-brandGreen">Product Details</h2>
            <p className="text-gray-600">
              {/* Replace with actual product details */}
              Experience the excellence of our product, crafted with the finest materials to ensure durability and style. Perfect for any occasion, it seamlessly blends functionality with modern aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts related={relatedProducts} />

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={currentImage}
        altText={currentAlt}
        onClose={closeModal}
      />

      <Footer />
    </main>
  );
};

export default ProductPageContent;
