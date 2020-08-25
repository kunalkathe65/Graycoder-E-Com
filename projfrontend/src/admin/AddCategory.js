import React, { useState } from 'react';

import Base from '../core/Base';
import Alert from '../core/Alert';
import { isAuthenticated } from '../auth/helper/index';
import { createCategory } from './helper/adminApiCalls';
import { signout } from '../auth/helper/index';

const AddCategory = (props) => {
  // State
  const [categoryName, setCategoryName] = useState('');
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (categoryName === '') {
      setLoading(false);
      setSuccess(false);
      setAlert('Category Name is required!');
      clearAlert();
    } else {
      const data = await createCategory(user._id, token, { categoryName });
      setLoading(false);

      if (data.error) {
        if (
          data.error === 'Token is invalid!' ||
          data.error === 'No user Found!'
        ) {
          signout(() => {
            props.history.push('/');
          });
        } else {
          setAlert(data.error);
          setCategoryName('');
          setSuccess(false);
          clearAlert();
        }
      } else {
        setAlert(`${data.category.name} category created successfully!`);
        setCategoryName('');
        setSuccess(true);
        clearAlert();
      }
    }
  };

  //Other Methods
  const clearAlert = () => {
    setTimeout(() => {
      setAlert('');
    }, 3000);
  };

  const successMessage = () =>
    success && alert && <Alert msg={alert} type='success' />;

  const errorMessage = () =>
    alert && !success && <Alert msg={alert} type='error' />;

  return (
    <Base title='Add New Category' description='Category for everyone'>
      <div className='row' id='category-form'>
        <div className='col-xs-12 col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4'>
          <h2 className='text-center pt-5'>
            <i className='fa fa-plus-circle'></i> Add New Category{' '}
          </h2>
          {successMessage()}
          {errorMessage()}
          <form>
            <div className='mb-3'>
              <label className='form-label'>Ex: Summer</label>
              <input
                type='text'
                name='categoryName'
                value={categoryName}
                className='form-control form-control-lg'
                onChange={(e) => setCategoryName(e.target.value)}
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
              &nbsp;&nbsp; Add
            </button>
            <button
              type='button'
              className='btn btn-block btn-lg gray-btn'
              onClick={() => props.history.push('/admin/dashboard')}
            >
              Back to Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
