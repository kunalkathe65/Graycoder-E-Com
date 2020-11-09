import React, { useState } from 'react';

import Base from '../core/Base';
import Alert from '../core/Alert';
import { resetPassword, changePassword } from '../auth/helper';
import { isAuthenticated } from '../auth/helper';

const ChangePassword = ({ match }) => {
  // State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  //Handlers
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      match.params.token &&
      (newPassword === '' || confirmNewPassword === '')
    ) {
      setAlert('All fields are mandatory!');
      clear();
    } else if (
      !match.params.token &&
      (oldPassword === '' || newPassword === '' || confirmNewPassword === '')
    ) {
      setAlert('All fields are mandatory!');
      clear();
    } else if (newPassword !== confirmNewPassword) {
      setAlert("New passwords don't match!");
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      clear();
    } else {
      setLoading(true);
      if (match.params.token) {
        const token = match.params.token;
        const data = await resetPassword({ newPassword, token });
        setLoading(false);

        if (data.errors) {
          setErrors(data.errors);
          clearErrors();
        } else if (data.error) {
          setAlert(data.error);
          setNewPassword('');
          setConfirmNewPassword('');
          clear();
        } else {
          setNewPassword('');
          setConfirmNewPassword('');
          setSuccess(data.success);
          clear();
        }
      } else {
        const data = await changePassword(user._id, token, {
          oldPassword,
          newPassword,
        });
        setLoading(false);

        if (data.errors) {
          setErrors(data.errors);
          clearErrors();
        } else if (data.error) {
          setAlert(data.error);
          setOldPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
          clear();
        } else {
          setOldPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
          setSuccess(data.success);
          clear();
        }
      }
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      clear();
    }
  };

  //Other Methods
  const errorMessage = () => alert && <Alert msg={alert} type='error' />;

  const validationErrorMessages = () =>
    errors &&
    errors.map((error, index) => (
      <Alert key={index} msg={error.msg} type='error' />
    ));

  const successMessage = () =>
    success && <Alert msg={success} type='success' />;

  const clearErrors = () => {
    setTimeout(() => {
      setErrors([]);
    }, 3000);
  };

  const clear = () => {
    setTimeout(() => {
      setAlert('');
      setSuccess('');
    }, 3000);
  };

  return (
    <Base>
      <div className='row' id='chngPwd-form'>
        <div className='col-xs-12 col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4'>
          {errorMessage()}
          {validationErrorMessages()}
          {successMessage()}
          <h2 className='text-center pt-5'>
            <i className='fa fa-lock'></i>{' '}
            {match.params.token ? 'Reset Password' : 'Change Password'}
          </h2>
          <form>
            {!match.params.token ? (
              <div className='mb-3'>
                <label className='form-label'>Old password</label>
                <input
                  type='password'
                  name='oldPassword'
                  value={oldPassword}
                  className='form-control form-control-lg'
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
            ) : null}
            <div className='mb-3'>
              <label className='form-label'>New password</label>
              <input
                type='password'
                name='newPassword'
                value={newPassword}
                className='form-control form-control-lg'
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Confirm new password</label>
              <input
                type='password'
                name='confirmNewPassword'
                value={confirmNewPassword}
                className='form-control form-control-lg'
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
              &nbsp;&nbsp;{' '}
              {!match.params.token ? 'Change Password' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};
export default ChangePassword;
