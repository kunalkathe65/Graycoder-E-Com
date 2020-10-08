import React, { useState } from 'react';

import { addProductsInCart, calculateFinalAmt } from './helper/cartHelper';

const Checkout = () => {
  //state
  const [products, setProducts] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);

  //Handlers
  const handleBtn = () => {
    setProducts(addProductsInCart());
    setTotalAmt(calculateFinalAmt());
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
                <th scope='col'>Item Qty</th>
                <th scope='col'></th>
                <th scope='col'>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className='text-muted'>{product.name}</td>
                  <td className='text-muted'>
                    Rs.{product.price} x {product.qty} nos.
                  </td>
                  <td className='text-muted'>=</td>
                  <td className='text-muted'>
                    Rs.{product.price * product.qty}
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total Amount :</td>
                <td></td>
                <td>=</td>
                <td>Rs. {totalAmt}.00</td>
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
        <button
          className='btn btn-lg btn-block blue-btn mt-4'
          onClick={() => console.log('PAID!')}
        >
          Continue to Pay
        </button>
      )}
    </div>
  );
};

export default Checkout;
