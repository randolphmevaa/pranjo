// lib/shopify.js

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Reusable function to send GraphQL requests to Shopify
export async function shopifyFetch({ query, variables = {} }) {
  const endpoint = `https://${domain}/api/2023-07/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const body = await res.json();
    if (body.errors) {
      console.error(JSON.stringify(body.errors));
    }
    return body.data;
  } catch (error) {
    console.error(error);
    throw new Error('Could not fetch from Shopify');
  }
}