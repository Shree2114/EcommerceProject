import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import React from 'react'
import Payment from './Payment';


let stripePromise;
const StripeContainer = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(`${process.env.STRIPE_SECRET_KEY}`);
    }
  
    return (
    <Elements stripe={stripePromise}>
        <Payment/>
    </Elements>
  )
}

export default StripeContainer