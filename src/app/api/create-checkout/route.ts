// src/app/api/create-checkout/route.ts

import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

interface CheckoutCreateResponse {
  checkoutCreate: {
    checkout: {
      webUrl: string;
    };
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export async function POST(request: Request) {
  try {
    const { lineItems } = await request.json();

    if (!lineItems || !Array.isArray(lineItems)) {
      console.error('Invalid line items:', lineItems);
      return NextResponse.json({ error: 'Invalid line items' }, { status: 400 });
    }

    console.log('Creating checkout with line items:', lineItems);

    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            webUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lineItems: lineItems,
      },
    };

    const data: CheckoutCreateResponse = await shopifyFetch<CheckoutCreateResponse>({
      query: mutation,
      variables,
    });

    const { checkout, userErrors } = data.checkoutCreate;

    if (userErrors.length > 0) {
      console.error('Checkout creation userErrors:', userErrors);
      return NextResponse.json({ errors: userErrors }, { status: 400 });
    }

    console.log('Checkout created successfully:', checkout.webUrl);

    return NextResponse.json({ checkoutUrl: checkout.webUrl }, { status: 200 });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
