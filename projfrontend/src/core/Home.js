import React, { useState, useEffect } from 'react';

import Base from './Base';
import Card from './Card';
import Alert from './Alert';
import { getAllProducts } from '../admin/helper/adminApiCalls';

const Home = () => {
  //state
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    preFetchAllProducts();
    //eslint-disable-next-line
  }, []);

  //other methods
  const preFetchAllProducts = async () => {
    const data = await getAllProducts();
    if (data?.error) {
      setAlert(data?.error);
      clearAlert();
    } else {
      setProducts(data);
    }
  };

  const clearAlert = () => {
    setTimeout(() => {
      setAlert('');
    }, 3000);
  };

  const errorMessage = () => alert && <Alert msg={alert} type='error' />;

  return (
    <Base title='GrayCoder' description='T-Shirts for Coders'>
      {errorMessage()}
      <div className='row'>
        {products ? (
          products.map((product, index) => (
            <div
              key={index}
              className='col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 '
            >
              <Card product={product} showAddBtn={true} />
            </div>
          ))
        ) : (
          <h4 style={{ textAlign: 'center' }}>No products to show!</h4>
        )}
      </div>
    </Base>
  );
};
export default Home;
