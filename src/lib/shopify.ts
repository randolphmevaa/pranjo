// src/lib/shopify.ts

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Define the shape of the Shopify response
interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

// Fetch the first variant ID for a given product handle
export async function fetchVariantId(handle: string): Promise<string> {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  const variables = { handle };

  try {
    const data = await shopifyFetch<{
      productByHandle: {
        variants: {
          edges: Array<{
            node: {
              id: string;
            };
          }>;
        };
      };
    }>({ query, variables });

    if (
      data.productByHandle &&
      data.productByHandle.variants.edges.length > 0
    ) {
      return data.productByHandle.variants.edges[0].node.id;
    }

    throw new Error(`No variants found for product with handle: ${handle}`);
  } catch (error) {
    console.error('Error fetching variantId:', error);
    throw error;
  }
}

// GraphQL request wrapper with generics
export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  if (!domain || !accessToken) {
    throw new Error('Missing Shopify domain or access token in environment variables.');
  }

  const endpoint = `https://${domain}/api/2023-07/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables }),
      // Removed 'next' option as it's unnecessary in API routes
    });

    const responseText = await res.text(); // Read response as text first

    let json: ShopifyResponse<T>;

    try {
      json = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Shopify response as JSON:', parseError, responseText);
      throw new Error('Failed to parse Shopify response');
    }

    if (!res.ok) {
      console.error('Shopify API responded with status:', res.status);
      console.error('Response body:', json);
      throw new Error('Failed to fetch Shopify data');
    }

    if (json.errors) {
      console.error('Shopify API Errors:', json.errors);
      throw new Error('Failed to fetch Shopify data');
    }

    return json.data;
  } catch (error) {
    console.error('Shopify Fetch Error:', error);
    throw new Error('Shopify fetch failed');
  }
}

