import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const { amount } = await req.json();

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(amount * 100);

    const sessionData = await auth.api.getSession({
      headers: headersList,
    });

    const userEmail = sessionData?.user?.email;
    const userName = sessionData?.user?.name;

    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Project Funding Contribution',
              description: 'Thank you for supporting our platform!',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/funding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      metadata: {
        userName: userName || 'Anonymous Donor',
        userEmail: userEmail || '',
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}