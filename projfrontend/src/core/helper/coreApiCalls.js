import API from '../../backend';

//Sign in with Google
export const signInWithGoogle = (authCode) => {
  const body = {
    code: authCode,
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    grant_type: 'authorization_code',
  };
  let formBody = [];
  for (let property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Login/Register user
export const google = (idToken) => {
  return fetch(`${API}/google/${idToken}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
