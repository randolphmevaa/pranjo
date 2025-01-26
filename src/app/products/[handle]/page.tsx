// src/app/products/[handle]/page.tsx

import { notFound } from 'next/navigation';
import { shopifyFetch } from '@/lib/shopify';
import React from 'react';
import ProductPageContent from './ProductPageContent'; // Client Component

// -- GraphQL Query to Fetch a Single Product by Handle --
const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      relatedProducts: collections(first: 1) {
        edges {
          node {
            products(first: 4) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
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
        }
      }
    }
  }
`;

// -- Types --
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
  relatedProducts?: {
    edges: {
      node: {
        products: {
          edges: {
            node: {
              id: string;
              title: string;
              handle: string;
              images: {
                edges: { node: { url: string; altText?: string } }[];
              };
              priceRange: {
                minVariantPrice: {
                  amount: string;
                  currencyCode: string;
                };
              };
            };
          }[];
        };
      };
    }[];
  };
};

// -- Page Component --
interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const { handle } = resolvedParams;

  // Fetch product data with type safety
  const productData = await shopifyFetch<{ productByHandle: ProductNode }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  const product: ProductNode | null = productData.productByHandle;

  // If product not found, render 404
  if (!product) {
    notFound();
  }

  // Extract related products if available
  const related = product.relatedProducts?.edges?.[0]?.node.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    imageUrl: node.images?.edges?.[0]?.node.url || '',
    altText: node.images?.edges?.[0]?.node.altText || node.title,
  })) || [];

  return <ProductPageContent product={product} relatedProducts={related} />;
}
