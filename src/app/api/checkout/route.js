import { NextResponse } from 'next/server';
import { shopifyFetch } from '../../../lib/shopify';

const CREATE_CHECKOUT_MUTATION = `
  mutation createCheckout($lineItems: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: { lineItems: $lineItems }) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        message
        field
      }
    }
  }
`;

export async function POST(request) {
  const { lineItems } = await request.json(); 
  // lineItems should be an array of { variantId, quantity }

  const data = await shopifyFetch({
    query: CREATE_CHECKOUT_MUTATION,
    variables: { lineItems },
  });

  const checkout = data?.checkoutCreate?.checkout;
  if (!checkout) {
    return NextResponse.json({ error: 'Could not create checkout' }, { status: 400 });
  }

  return NextResponse.json({ checkoutUrl: checkout.webUrl });
}