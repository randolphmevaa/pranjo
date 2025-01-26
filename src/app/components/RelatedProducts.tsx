// src/app/components/RelatedProducts.tsx

import Image from 'next/image';
import Link from 'next/link';

interface RelatedProductsProps {
  related: Array<{
    id: string;
    title: string;
    handle: string;
    price: string;
    imageUrl: string;
    altText: string;
  }>;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ related }) => {
  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-header text-brandGreen mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {related.map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`} className="group">
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src={product.imageUrl}
                alt={product.altText}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       25vw"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-header text-gray-800 group-hover:text-brandGreen transition-colors duration-300">
                {product.title}
              </h3>
              <p className="text-indigo-600 font-semibold">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
