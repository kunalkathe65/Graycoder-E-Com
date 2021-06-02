import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Base from '../core/Base';
import Alert from '../core/Alert';
import { signin, isAuthenticated, authenticate } from '../auth/helper';

const Signin = (props) => {
  useEffect(() => {
    const googleSignInUrl =
      process.env.REACT_APP_GOOGLE_SIGN_IN_URL +
      '&state=' +
      process.env.REACT_APP_OAUTH_STATE +
      '&nonce=' +
      process.env.REACT_APP_OAUTH_NONCE;
    setURL(googleSignInUrl.toString());
    if (props.location.error) {
      setAlert(props.location.error);
      clearAlert();
    }
    isAuthenticated() && props.history.push('/');
  }, [props.history]);

  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState('');
  const [URL, setURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);

  const { user } = isAuthenticated();

  //Handlers
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (email === '' || password === '') {
      setLoading(false);
      setAlert('Please fill up all the fields!');
      clearAlert();
    } else {
      const data = await signin({ email, password });
      setLoading(false);

      if (data.errors) {
        setErrors(data.errors);
        clearErrors();
      } else if (data.error) {
        setAlert(data.error);
        setEmail('');
        setPassword('');
        clearAlert();
      } else {
        authenticate(data, () => {
          setEmail('');
          setPassword('');
          setDidRedirect(true);
        });
      }
    }
  };

  //Other Methods

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/' />;
      }
    }
  };

  const errorMessage = () => alert && <Alert msg={alert} type='error' />;

  const validationErrorMessages = () =>
    errors &&
    errors.map((error, index) => (
      <Alert key={index} msg={error.msg} type='error' />
    ));

  const clearAlert = () => {
    setTimeout(() => {
      setAlert('');
    }, 3000);
  };

  const clearErrors = () => {
    setTimeout(() => {
      setErrors([]);
    }, 3000);
  };

  return (
    <Base>
      <div className='row' id='signin-form'>
        <div className='col-xs-12 col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4'>
          {errorMessage()}
          {validationErrorMessages()}
          <h2 className='text-center pt-5'>
            <i className='fa fa-user'></i> Sign In
          </h2>
          <form>
            <div className='mb-3'>
              <label className='form-label'>Email address</label>
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
            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                className='form-control form-control-lg'
                onChange={(e) => setPassword(e.target.value)}
                required
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
              &nbsp;&nbsp; Sign In
            </button>
          </form>
          <p className='text-muted mt-3'>
            Don't have an account ? Consider <Link to='/sign-up'>Sign Up</Link>
            <br />
            Forgot Password ? <Link to='/forgot-password'>Click here</Link>
          </p>
          <hr />
          <p style={{ textAlign: 'center' }}>OR</p>
          <a style={{ textDecoration: 'none' }} href={URL}>
            <button
              type='submit'
              className='btn btn-block btn-lg gray-btn mb-1'
            >
              <span>
                <i className='fa fa-google'></i>
              </span>
              &nbsp;&nbsp; Sign in with Google
            </button>
          </a>
          <a
            style={{ textDecoration: 'none' }}
            href='http://localhost:8000/api/facebook'
          >
            <button
              type='submit'
              className='btn btn-block btn-lg gray-btn mb-1'
            >
              <span>
                <i className='fa fa-facebook'></i>
              </span>
              &nbsp;&nbsp; Sign in with Facebook
            </button>
          </a>
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};

export default Signin;
