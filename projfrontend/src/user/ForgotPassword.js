import React, { useState, useEffect } from 'react';

import Base from '../core/Base';
import Alert from '../core/Alert';
import { isAuthenticated } from '../auth/helper';

const ForgotPassword = (props) => {
  useEffect(() => {
    isAuthenticated() && props.history.push('/');
  }, [props.history]);

  // State
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);

  //Handlers
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (email === '') {
      setLoading(false);
      setAlert('Email address is mandatory!');
      clearAlert();
    } else {
      setLoading(false);
      //TODO => Implement AWS SES using AWS SDK
      setEmail('');
      console.log('DONE');
    }
  };

  //Other Methods

  const errorMessage = () => alert && <Alert msg={alert} type='error' />;

  const clearAlert = () => {
    setTimeout(() => {
      setAlert('');
    }, 3000);
  };

  return (
    <Base>
      <div className='row' id='forgotPassword-form'>
        <div className='col-xs-12 col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4'>
          {errorMessage()}
          <h2 className='text-center pt-5 mb-4'>
            Forgot Password <i className='fa fa-question-circle'></i>
          </h2>
          <form>
            <div className='mb-3'>
              <label className='form-label'>
                Enter email address ( OTP will be sent here )
              </label>
              <input
                type='email'
                name='email'
                value={email}
                className='form-control form-control-lg'
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button
              type='submit'
              className='btn btn-block btn-lg blue-btn'
              onClick={(e) => onSubmit(e)}
            >
              {loading && (
                <span
                  className='spinner-border '
                  role='status'
                  aria-hidden='true'
                ></span>
              )}
              &nbsp;&nbsp; Send OTP
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default ForgotPassword;
