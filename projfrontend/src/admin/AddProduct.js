import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import Alert from '../core/Alert';

import { getAllCategories, createProduct } from './helper/adminApiCalls';
import { isAuthenticated, signout } from '../auth/helper/index';

const AddProduct = (props) => {
  useEffect(() => {
    preFetchCategories();
    //eslint-disable-next-line
  }, []);

  const { user, token } = isAuthenticated();

  //State
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: '',
    category: '',
    createdProduct: '',
    categories: [],
    formData: '',
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    photo,
    createdProduct,
    formData,
  } = values;

  //Handlers
  const onChangeHandler = (e) => {
    const value =
      e.target.name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      name === '' ||
      description === '' ||
      price === '' ||
      stock === '' ||
      photo === '' ||
      category === ''
    ) {
      setLoading(false);
      setAlert('Please fill in all the fields!');
      clearAlert();
    } else {
      const data = await createProduct(user._id, token, formData);
      setLoading(false);
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
          setValues({
            ...values,
            name: '',
            description: '',
            price: '',
            stock: '',
            photo: '',
            category: '',
            createdProduct: '',
          });
          clearAlert();
        }
      } else {
        setAlert(`${data.product.name} product created successfully!`);
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          stock: '',
          photo: '',
          category: '',
          createdProduct: data.product.name,
        });
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
    alert && createdProduct && <Alert msg={alert} type='success' />;

  const errorMessage = () =>
    alert && !createdProduct && <Alert msg={alert} type='error' />;

  const preFetchCategories = async () => {
    const data = await getAllCategories();
    if (data?.error) {
      setAlert(data?.error);
      clearAlert();
    } else {
      setValues({
        ...values,
        categories: data.categories,
        formData: new FormData(),
      });
    }
  };

  return (
    <Base title='Add New Product' description='Product for everyone'>
      <div className='row' id='add-product-form'>
        <div className='col-xs-12 col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4'>
          <h2 className='text-center pt-3'>
            <i className='fa fa-plus-circle'></i> Add New Product{' '}
          </h2>
          {successMessage()}
          {errorMessage()}
          <form>
            <div className='form-group'>
              <div className='mb-1'>
                <label className='form-label'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={name}
                  className='form-control form-control-lg'
                  onChange={onChangeHandler}
                  required
                  autoFocus
                />
              </div>
              <div className='mb-1'>
                <label className='form-label'>Description</label>
                <input
                  type='text'
                  name='description'
                  value={description}
                  className='form-control form-control-lg'
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className='mb-1'>
                <label className='form-label'>Category</label>
                <select
                  type='text'
                  name='category'
                  value={category}
                  className='form-control form-control-lg'
                  onChange={onChangeHandler}
                >
                  <option>Select Category</option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='mb-1'>
                <label className='form-label'>Price</label>
                <input
                  type='number'
                  name='price'
                  value={price}
                  className='form-control form-control-lg'
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className='mb-1'>
                <label className='form-label'>Stock</label>
                <input
                  type='number'
                  name='stock'
                  value={stock}
                  className='form-control form-control-lg'
                  onChange={onChangeHandler}
                  required
                />
                <div className='mb-1'>
                  <label className='form-label'>Photo</label>
                  <input
                    type='file'
                    name='photo'
                    accept='image'
                    className='form-control form-control-lg'
                    onChange={onChangeHandler}
                    required
                  />
                </div>
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
            </div>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
