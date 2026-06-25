import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id');
  }

  
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === 'open') {
    return redirect('/');
  }

  if (session.status === 'complete') {
    
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      
      await fetch(`${backendUrl}/api/funding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: session.customer_details?.name || 'Anonymous Donor',
          email: session.customer_details?.email,
          amount: session.amount_total / 100, 
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }),
      });
    } catch (error) {
      console.error("Failed to save funding details to database:", error);
    }

    return (
      <section id="success" className="max-w-md mx-auto my-20 p-6 bg-white dark:bg-slate-900 border rounded-2xl text-center shadow-xl">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Payment Successful!</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Thank you for your generous support, <span className="font-semibold text-slate-700 dark:text-slate-200">{session.customer_details?.name}</span>! 
          A confirmation email has been sent to {session.customer_details?.email}.
        </p>
        <a href="/funding" className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-2 rounded-xl text-sm transition-colors">
          Go Back to Funding Page
        </a>
      </section>
    );
  }
}