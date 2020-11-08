import React from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';

const AdminDashboard = () => {
  const { name, email } = isAuthenticated().user;

  const adminInfo = () => {
    return (
      <div className='card card-top'>
        <h4
          className='card-header'
          style={{ textAlign: 'center', color: '#fff' }}
        >
          Admin Information
        </h4>
        <ul className='list-group'>
          <li className='list-group-item item'>
            <span className='badge bg mr-3'>Admin's Name :</span>
            {name}
          </li>
          <li className='list-group-item item'>
            <span className='badge bg mr-3'>Admin's Email :</span>
            {email}
          </li>
        </ul>
      </div>
    );
  };

  const adminNavigation = () => {
    return (
      <div className='card mt-4 card-top'>
        <h4
          className='card-header'
          style={{ textAlign: 'center', color: '#fff' }}
        >
          Admin Navigation
        </h4>
        <ul className='list-group'>
          <li className='list-group-item item'>
            <Link
              to='/admin/create/category'
              className='nav-link'
              style={{ color: '#000' }}
            >
              <i className='fa fa-plus-circle fa-lg'></i> Create Category
            </Link>
          </li>
          <li className='list-group-item item'>
            <Link
              to='/admin/categories'
              className='nav-link'
              style={{ color: '#000' }}
            >
              <i className='fa fa-list-ul fa-lg'></i> Manage Categories
            </Link>
          </li>
          <li className='list-group-item item'>
            <Link
              to='/admin/create/product'
              className='nav-link'
              style={{ color: '#000' }}
            >
              <i className='fa fa-plus-circle fa-lg'></i> Create Product
            </Link>
          </li>{' '}
          <li className='list-group-item item'>
            <Link
              to='/admin/products'
              className='nav-link'
              style={{ color: '#000' }}
            >
              <i className='fa fa-list-ul fa-lg'></i> Manage Products
            </Link>
          </li>{' '}
          <li className='list-group-item item'>
            <Link
              to='/admin/create/category'
              className='nav-link'
              style={{ color: '#000' }}
            >
              <i className='fa fa-list-alt fa-lg'></i> Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title='Admin Dashboard'
      description='Manage Orders &amp; Products here'
    >
      <div className='row mt-2 p-4'>
        <div className='col-xs-12 col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4'>
          {adminInfo()}
          {adminNavigation()}
        </div>
      </div>
    </Base>
  );
};
export default AdminDashboard;
