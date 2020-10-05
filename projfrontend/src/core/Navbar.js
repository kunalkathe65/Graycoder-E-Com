import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import { signout, isAuthenticated } from '../auth/helper';

const Navbar = (props) => {
  return (
    <React.Fragment>
      <nav
        className='navbar navbar-expand-lg sticky-top'
        style={{ backgroundColor: '#0A3D62' }}
      >
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <img
              src='https://image.flaticon.com/icons/svg/779/779184.svg'
              width='30'
              height='30'
              className='d-inline-block align-top'
              alt='Logo'
              loading='lazy'
            />{' '}
            <span className='text-white'>
              <strong>GrayCoder</strong>
            </span>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span
              className='navbar-toggler-icon'
              style={{ color: '#fff', paddingTop: '5px' }}
            >
              <i className='fa fa-bars fa-lg'></i>
            </span>
          </button>

          {/* Navbar */}

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto mb-2 mb-lg-0' id='navbar-main'>
              <li className='nav-item'>
                <NavLink
                  exact
                  className='nav-link'
                  aria-current='page'
                  to='/'
                  activeClassName='active-route'
                >
                  Home
                </NavLink>
              </li>
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    aria-current='page'
                    to='/user/dashboard'
                    activeClassName='active-route'
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    aria-current='page'
                    to='/admin/dashboard'
                    activeClassName='active-route'
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              {isAuthenticated() && (
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    aria-current='page'
                    to='/user/cart'
                    activeClassName='active-route'
                  >
                    Cart
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Signin, Signup amd Signout links */}

            <ul className='navbar-nav mr-2 mb-2 mb-lg-0'>
              {!isAuthenticated() && (
                <React.Fragment>
                  <li className='nav-item'>
                    <Link
                      className='nav-link green'
                      aria-current='page'
                      to='/sign-in'
                    >
                      Sign In
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link blue'
                      aria-current='page'
                      to='/sign-up'
                    >
                      Sign Up
                    </Link>
                  </li>
                </React.Fragment>
              )}
              {isAuthenticated() && (
                <li className='nav-item'>
                  <span
                    className='nav-link red'
                    aria-current='page'
                    onClick={() => {
                      signout(() => {
                        props.history.push('/');
                      });
                    }}
                  >
                    Sign out
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default withRouter(Navbar);
