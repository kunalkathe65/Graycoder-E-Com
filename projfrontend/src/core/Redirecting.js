import React, { useEffect } from 'react';
import * as queryString from 'query-string';

import { signInWithGoogle, google } from './helper/coreApiCalls';
import { authenticate } from '../auth/helper';

const Redirecting = ({ location, history }) => {
  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const authCode = queryParams.code;
    const stateFromGoogle = queryParams.state;
    const originalState = process.env.REACT_APP_OAUTH_STATE;

    signIn(authCode, stateFromGoogle, originalState);
  });

  const signIn = async (authCode, stateFromGoogle, originalState) => {
    if (stateFromGoogle.toString() === originalState.toString()) {
      //Ensured that the request is not forged
      const data = await signInWithGoogle(authCode);
      if (data?.error) {
        history.push({
          pathname: '/sign-in',
          error: 'Something went wrong! Please try again...',
        });
      } else {
        // Login/Register the user
        const res = await google(data.id_token);
        if (res?.error) {
          history.push({
            pathname: '/sign-in',
            error: 'Something went wrong! Please try again...',
          });
        } else {
          authenticate(res, () => {
            history.push('/user/dashboard');
          });
        }
      }
    } else {
      //The request is tampered, redirect to login page
      history.push({
        pathname: '/sign-in',
        error: 'Something went wrong! Please try again...',
      });
    }
  };

  return (
    <div>
      <h5 style={{ textAlign: 'center', marginTop: '20%' }}>Redirecting...</h5>
    </div>
  );
};
export default Redirecting;
