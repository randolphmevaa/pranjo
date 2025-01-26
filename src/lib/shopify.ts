// src/lib/shopify.ts

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Define the shape of the Shopify response
interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
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
      // Next.js 13 recommendation for server components: revalidate data after 60 seconds (optional)
      next: { revalidate: 60 },
    });

    const json: ShopifyResponse<T> = await res.json();

    if (json.errors) {
      console.error(json.errors);
      throw new Error('Failed to fetch Shopify data');
    }

    return json.data;
  } catch (error) {
    console.error(error);
    throw new Error('Shopify fetch failed');
  }
}
