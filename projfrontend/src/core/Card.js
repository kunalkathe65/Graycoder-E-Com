import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../backend';
import {
  addProductToLocalStorage,
  removeFromLocalStorage,
} from './helper/cardHelper';

const Card = ({ product, showAddBtn, showRemoveBtn, reload, setReload }) => {
  //state
  let [qty, setQty] = useState(1);

  const toastConfigObject = {
    position: 'bottom-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  };

  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : 'https://png.pngtree.com/png-clipart/20190612/original/pngtree-black-t-shirt-png-image_3417104.jpg';

  //Handlers
  const addToLocalStorage = (product) => {
    addProductToLocalStorage(product, () => {
      toast.success('Added to cart!', toastConfigObject);
    });
  };

  return (
    <div className='card m-4'>
      <ToastContainer
        position='bottom-center'
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <img
        className='card-img-top'
        style={{ height: '12rem' }}
        alt='Product'
        src={imageURL}
      />
      <div className='card-body'>
        <h4 className='card-title'>{product.name}</h4>
        <p className='card-text'>
          <i className='fa fa-arrow-right'></i> {product.description}
        </p>
      </div>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item'>
          <p className='text-muted'>
            {' '}
            <i className='fa fa-bomb'></i> Just {product.stock} remaining.
          </p>
          <p className='text-muted'>
            {' '}
            <i className='fa fa-star'></i> {product.category.name}&nbsp;
            {showRemoveBtn && (
              <span style={{ float: 'right' }}>
                Qty : {qty}
                <button className='plus-btn m-2' onClick={() => setQty(qty++)}>
                  +
                </button>
                <button
                  className='minus-btn mr-1'
                  onClick={() =>
                    setQty(() => {
                      return qty > 1 ? qty-- : 1;
                    })
                  }
                >
                  -
                </button>
              </span>
            )}
          </p>
          <span
            className='badge bg'
            style={{ color: '#fff', width: '100%', backgroundColor: '#0A3D62' }}
          >
            <i className='fa fa-rupee fa-lg'></i>{' '}
            {showRemoveBtn ? product.price * qty : product.price}
          </span>
        </li>
      </ul>
      {showAddBtn && (
        <button
          onClick={() => addToLocalStorage(product)}
          className='btn btn-sm green-btn m-3'
        >
          <i className='fa fa-cart-plus fa-lg'></i> Add to cart
        </button>
      )}
      {'  '}
      {showRemoveBtn && (
        <button
          className='btn btn-sm red-btn m-3'
          onClick={() => {
            removeFromLocalStorage(product._id);
            setReload(!reload);
          }}
        >
          <i className='fa fa-trash fa-lg'></i> Remove from cart
        </button>
      )}
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.object,
  showRemoveBtn: PropTypes.bool,
  showAddBtn: PropTypes.bool,
};

export default Card;
