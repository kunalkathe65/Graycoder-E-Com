import React from 'react';
import { PropTypes } from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';

const Base = ({ title, description, children }) => {
  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-sm-12'>
          <header>
            {/* Navbar */}
            <Navbar />
            <div>
              {title && description && (
                <React.Fragment>
                  <h4
                    className='text-center pt-3'
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {title} |{' '}
                    <span style={{ color: '#535C68', fontSize: '20px' }}>
                      {description}
                    </span>
                  </h4>
                  <hr />
                </React.Fragment>
              )}
            </div>
          </header>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          {/* Main Content */}
          <main>{children}</main>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

Base.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Base;
