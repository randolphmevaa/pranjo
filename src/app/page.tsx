// app/page.tsx 

import Image from "next/image";
import ReviewSection from "./components/ReviewSection";
import { shopifyFetch } from "../lib/shopify";
import FeatureCarousel from "./components/FeatureCarousel";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import PhilosophySection from "./components/PhilosophySection";
import Header from "./components/Header"; // <-- Import the updated Header
import AnnouncementBanner from "./components/AnnouncementBanner2";
import InfoSection from "./components/InfoSection"; // <-- Import the InfoSection component
import DiscoverMore from "./components/DiscoverMore"; // <-- Import the new component
import GallerySection from "./components/GallerySection"

// -- QUERIES ---------------------------------------------------
const GET_PRODUCTS_QUERY = `
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const GET_COLLECTIONS_QUERY = `
  query getCollections {
    collections(first: 4) {
      edges {
        node {
          id
          title
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

// -- TYPES -----------------------------------------------------
type ProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
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

type CollectionNode = {
  id: string;
  title: string;
  handle: string;
  image?: {
    url: string;
    altText?: string;
  };
};

// -- PAGE COMPONENT -------------------------------------------
export default async function Home() {
  // Fetch products
  const productData = await shopifyFetch({ query: GET_PRODUCTS_QUERY });
  const products = productData?.products?.edges || [];

  // Fetch collections
  const collectionData = await shopifyFetch({ query: GET_COLLECTIONS_QUERY });
  const collections = collectionData?.collections?.edges || [];

  // "Featured" slice: indexes [1..6]
  const featuredProducts = products.slice(1, 7); // Products 2-7

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <AnnouncementBanner />
      <Header />
      <Hero />
      <FeatureCarousel featuredProducts={featuredProducts} />
      <CollectionsSection collections={collections} />

      {/* Pass entire products array to DiscoverMore */}
      <DiscoverMore products={products} />

      {/* Add the Review Section */}
      <ReviewSection />

      {/* Add the Info Section */}
      <InfoSection />

      <GallerySection />

      {/* Add the Philosophy Section */}
      <PhilosophySection />

      <Footer />
    </main>
  );
}

// -- COLLECTIONS -----------------------------------------------
function CollectionsSection({
  collections,
}: {
  collections: { node: CollectionNode }[];
}) {
  if (!collections || collections.length === 0) return null;

  // Only 3 displayed
  const topCollections = collections.slice(0, 3);

  return (
    <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto" id="collections">
      {/* No heading text here */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topCollections.map(({ node }) => {
          const { id, title, image, handle } = node;

          return (
            <a
              key={id}
              href={`/collections/${handle}`}
              className="relative group block w-full h-80 rounded-lg overflow-hidden 
                         transform transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {image?.url ? (
                  <Image
                    src={image.url}
                    alt={image.altText || "Collection"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Collection Name (bottom-left) */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <h3
                className="absolute bottom-4 left-4 z-10 text-white 
                           text-xl font-semibold pointer-events-none font-header"
              >
                {title}
              </h3>

              {/* White Blur Overlay on hover */}
              <div
                className="absolute inset-0 flex items-center justify-center 
                           bg-white/50 backdrop-blur-md text-black text-lg font-semibold 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-body"
              >
                Explore
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
