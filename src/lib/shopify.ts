// src/lib/shopify.ts

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// GraphQL request wrapper
export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}) {
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

    const { data, errors } = await res.json();
    if (errors) {
      console.error(errors);
      throw new Error('Failed to fetch Shopify data');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Shopify fetch failed');
  }
}