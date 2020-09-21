import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';
import Alert from '../core/Alert';
import { getAllProducts, deleteProduct } from './helper/adminApiCalls';
import { isAuthenticated, signout } from '../auth/helper/index';

const ManageProducts = (props) => {
  useEffect(() => {
    preFetchProducts();
    //eslint-disable-next-line
  }, []);

  const { user, token } = isAuthenticated();

  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState('');

  //Handlers
  const deleteAProduct = async (productId) => {
    const data = await deleteProduct(productId, user._id, token);
    if (data?.error) {
      if (
        data?.error === 'Token is invalid!' ||
        data?.error === 'No user Found!'
      ) {
        signout(() => {
          props.history.push('/');
        });
      } else {
        setAlert(data?.error);
        clearAlert();
      }
    } else {
      preFetchProducts();
    }
  };

  //Other Methods
  const preFetchProducts = async () => {
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
    <Base title='Manage Products' description='View,Edit &amp; Delete here'>
      <div className='row' id='products-list'>
        <div className='col-xs-12 col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3'>
          {errorMessage()}
          {products.length > 0 ? (
            products.map((product, index) => (
              <div className='card mb-2' key={index}>
                <img
                  className='card-img-top'
                  src={product.photo}
                  alt={product.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>{product.description}</p>
                  <Link
                    className='btn btn-sm green-btn'
                    to={`/admin/product/update/${product._id}`}
                  >
                    Update
                  </Link>
                  {'  '}
                  <button
                    onClick={() => deleteAProduct(product._id)}
                    className='btn btn-sm red-btn'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No products available!</p>
          )}
          <button
            type='button'
            className='btn btn-block btn-lg gray-btn'
            onClick={() => props.history.push('/admin/dashboard')}
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
