import React, { useState, useEffect } from 'react';

import Base from '../core/Base';
import Alert from '../core/Alert';
import { isAuthenticated } from '../auth/helper';
import { signup } from '../auth/helper/index';

const Signup = (props) => {
  useEffect(() => {
    isAuthenticated() && props.history.push('/');
  }, [props.history]);
  //State
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    success: false,
  });

  const { firstName, lastName, email, password, success } = values;

  //Handlers
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (firstName === '' || email === '' || password === '') {
      setLoading(false);
      setAlert('Please fill up all the fields!');
      clearAlert();
    } else {
      const data = await signup({ firstName, lastName, email, password });
      setLoading(false);

      if (data.errors) {
        setErrors(data.errors);
        clearErrors();
      } else if (data.error) {
        setAlert(data.error);
        setValues({
          ...values,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          success: false,
        });
        clearAlert();
      } else {
        setAlert(data.success);
        setValues({
          ...values,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          success: true,
        });
        clearAlert();
      }
    }
  };

  //Other Methods
  const successMessage = () =>
    success && alert && <Alert msg={alert} type='success' />;

  const errorMessage = () =>
    alert && !success && <Alert msg={alert} type='error' />;

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
      <div className='row' id='signup-form'>
        <div className='col-xs-12 col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4'>
          {successMessage()}
          {errorMessage()}
          {validationErrorMessages()}
          <h2 className='text-center pt-5'>
            <i className='fa fa-user-plus'></i> Sign Up
          </h2>
          <form>
            <div className='mb-3'>
              <label className='form-label'>First Name</label>
              <input
                type='text'
                name='firstName'
                value={firstName}
                className='form-control form-control-lg'
                onChange={onChangeHandler}
                required
                autoFocus
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input
                type='text'
                name='lastName'
                value={lastName}
                className='form-control form-control-lg'
                onChange={onChangeHandler}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                name='email'
                value={email}
                className='form-control form-control-lg'
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                className='form-control form-control-lg'
                onChange={onChangeHandler}
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
              &nbsp;&nbsp; Sign Up
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};
export default Signup;
