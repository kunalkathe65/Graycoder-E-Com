import React from 'react';
import { PropTypes } from 'prop-types';

import API from '../backend';

const Card = ({ product, showAddBtn, showRemoveBtn }) => {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : 'https://png.pngtree.com/png-clipart/20190612/original/pngtree-black-t-shirt-png-image_3417104.jpg';

  return (
    <div
      className='card'
      style={{
        width: '18rem',
      }}
    >
      <img
        className='card-img-top'
        style={{ height: '15rem' }}
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
          <span
            className='badge bg mr-4'
            style={{ color: '#000', width: '60%', backgroundColor: '#67E6DC' }}
          >
            {product.category.name}
          </span>
          <span
            className='badge bg'
            style={{ color: '#fff', width: '30%', backgroundColor: '#0A3D62' }}
          >
            <i className='fa fa-rupee fa-lg'></i> {product.price}
          </span>
        </li>
      </ul>
      {showAddBtn && (
        <button className='btn btn-sm green-btn m-3'>
          <i className='fa fa-cart-plus fa-lg'></i> Add to cart
        </button>
      )}
      {'  '}
      {showRemoveBtn && (
        <button className='btn btn-sm red-btn m-3'>
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
