import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const {
  STRIPE_SECRET_KEY,
  STRIPE_PRICE_ID,
  STRIPE_PRICE_ID_DISCOUNT,
  SITE_ORIGIN = ''
} = process.env;

const stripeClient = stripe(STRIPE_SECRET_KEY);

const allowedOrigin = SITE_ORIGIN;

async function createSession(useDiscount) {
  const price = useDiscount ? STRIPE_PRICE_ID_DISCOUNT : STRIPE_PRICE_ID;
  return stripeClient.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price, quantity: 1 }],
    success_url: `${allowedOrigin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${allowedOrigin}/cancel`
  });
}

const handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  if (event.headers.origin !== allowedOrigin) {
    return {
      statusCode: 403,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin
      },
      body: JSON.stringify({ error: 'Forbidden' })
    };
  }

  try {
    const { useDiscount } = JSON.parse(event.body || '{}');
    const session = await createSession(Boolean(useDiscount));
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId: session.id })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin
      },
      body: JSON.stringify({ error: 'Failed to create session' })
    };
  }
};

export { handler };
export default handler;
