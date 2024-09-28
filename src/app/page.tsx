'use client'

import convertToSubcurrency from "../lib/convertToSubcurrency";
import CheckoutPage from "../components/CheckoutPage";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export default function Home() {

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY == undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined")
  };

  // integrating Stripe, Stripe API to handle payments in a Next.js app. The publishable key is safely exposed, while secret keys (e.g., for server-side operations) remain hidden on the backend
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const amount = 49.99;

  return (
    <div className="">
      <div style={{ width: "900px" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Elements is a higher-order component provided by Stripe that wraps your React application (or a part of it) where Stripe functionality is needed. Without the Elements provider, you cannot use Stripe’s React components to manage payments. */}
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd"
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
