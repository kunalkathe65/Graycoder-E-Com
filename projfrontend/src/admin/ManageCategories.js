import React, { useState, useEffect } from 'react';

import Base from '../core/Base';
import Alert from '../core/Alert';
import { getAllCategories, deleteCategory } from './helper/adminApiCalls';
import { isAuthenticated, signout } from '../auth/helper/index';

const ManageCategories = (props) => {
  useEffect(() => {
    preFetchCategories();
    //eslint-disable-next-line
  }, []);

  const { user, token } = isAuthenticated();

  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState('');
  const [category, setCategory] = useState('');

  //Handlers

  const onChangeHandler = (e) => {
    //TODO:come here to handle category edit & update
    setCategory(e.target.value);
  };

  const deleteACategory = async (categoryId) => {
    const data = await deleteCategory(categoryId, user._id, token);
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
      preFetchCategories();
    }
  };

  //Other Methods
  const preFetchCategories = async () => {
    const data = await getAllCategories();
    if (data?.error) {
      setAlert(data?.error);
      clearAlert();
    } else {
      setCategories(data.categories);
    }
  };

  const clearAlert = () => {
    setTimeout(() => {
      setAlert('');
    }, 3000);
  };

  const errorMessage = () => alert && <Alert msg={alert} type='error' />;

  return (
    <Base title='Manage Categories' description='View,Edit &amp; Delete here'>
      <div className='row' id='products-list'>
        <div className='col-xs-12 col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3'>
          {errorMessage()}
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <ul className='list-group' key={index}>
                <li className='list-group-item d-flex justify-content-between align-items-center mb-1'>
                  {category.name}
                  <span>
                    <button
                      type='button'
                      className='btn edit-btn'
                      data-toggle='modal'
                      data-target='#editCategoryModal'
                    >
                      <i className='fa fa-edit fa-lg'></i>
                    </button>{' '}
                    <button
                      className='btn trash-btn'
                      onClick={() => deleteACategory(category._id)}
                    >
                      <i className='fa fa-trash fa-lg'></i>
                    </button>
                  </span>
                </li>
                {/* Edit Category Modal */}
                <div
                  className='modal fade'
                  id='editCategoryModal'
                  tabIndex='-1'
                  role='dialog'
                  aria-labelledby='exampleModalCenterTitle'
                  aria-hidden='true'
                >
                  <div
                    className='modal-dialog modal-dialog-centered'
                    role='document'
                  >
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title'>Update Category</h5>
                        <button
                          type='button'
                          className='close'
                          data-dismiss='modal'
                          aria-label='Close'
                        >
                          <span aria-hidden='true'>
                            <i className='fa fa-times-circle'></i>
                          </span>
                        </button>
                      </div>
                      <div className='modal-body'>
                        <input
                          className='form-control'
                          type='text'
                          value={category.name}
                          onChange={onChangeHandler}
                        />
                      </div>
                      <div className='modal-footer'>
                        <button type='button' className='btn blue-btn'>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No categories available!</p>
          )}
          <button
            type='button'
            className='btn btn-block btn-lg blue-btn'
            onClick={() => props.history.push('/admin/create/category')}
          >
            Add category
          </button>
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

export default ManageCategories;
