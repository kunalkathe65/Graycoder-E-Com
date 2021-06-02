import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { addProductsInCart, calculateFinalAmt } from './helper/cartHelper';
import API from '../backend';

const Checkout = () => {
  //state
  const [products, setProducts] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);

  //Handlers
  const handleBtn = () => {
    setProducts(addProductsInCart());
    setTotalAmt(calculateFinalAmt());
  };

  const makePayment = (token) => {
    const body = {
      token,
      totalAmt,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`${API}/stripe/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        return response;
        //create order
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
      <h2 style={{ textAlign: 'center' }}>Order summary &amp; Checkout</h2>
      <hr />
      {products.length === 0 && (
        <button
          className='btn btn-lg btn-block blue-btn mb-4'
          onClick={handleBtn}
        >
          Show Order Summary
        </button>
      )}
      {products.length > 0 && (
        <div className='table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl'>
          <table
            className='ml-4 table table-borderless table-striped'
            style={{ width: '100%' }}
          >
            <thead>
              <tr>
                <th scope='col'>Item Name</th>
                <th scope='col'>Item's Price x Item's Qty</th>
                <th scope='col'></th>
                <th scope='col'>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className='text-muted'>{product.name}</td>
                  <td className='text-muted'>
                    ${product.price}.00 x {product.qty} nos.
                  </td>
                  <td className='text-muted'>=</td>
                  <td className='text-muted'>
                    ${product.price * product.qty}.00
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total Amount :</td>
                <td></td>
                <td>=</td>
                <td>$ {totalAmt}.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {products.length > 0 && (
        <button
          className='btn btn-lg btn-block blue-btn mt-4'
          onClick={handleBtn}
        >
          Update Order
        </button>
      )}
      {products.length > 0 && (
        <StripeCheckout
          name='Payment for Graycoder'
          description='Pay for the t-shirt(s)'
          panelLabel='Confirm Payment'
          currency='USD'
          token={makePayment}
          amount={totalAmt * 100}
          stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
          shippingAddress
          billingAddress
        >
          <button className='btn btn-lg btn-block blue-btn mt-4'>
            Continue to Pay
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Checkout;
