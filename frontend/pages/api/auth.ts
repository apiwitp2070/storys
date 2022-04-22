/* /api/auth.js */

import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = "http://localhost:1337/api";

//register a new user
export const registerUser = async (username: any, email: any, password: any) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') return;

  const response = await axios.post(`${API_URL}/auth/local/register`, {
    username,
    email,
    password,
  });
  Cookie.set('token', response.data.jwt);
  return response.data.user;
  //resolve the promise to set loading to false in SignUp form
};

export const loginUser = async (identifier: any, password: any) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') return;

  const response = await axios.post(`${API_URL}/auth/local/`, {
    identifier,
    password,
  });

  Cookie.set('token', response.data.jwt);
  return response.data.user;
};

export const logout = async () => {
  //remove token and user cookie
  Cookie.remove('token');
  // @ts-ignore: no reason
  delete window.__user;

  // sync logout between multiple windows
  window.localStorage.setItem('logout', Date.now().toString());
  //redirect to the home page
};

export const getMyId = async () => {
  const token = Cookie.get('token');
  const {
    data: {
      id,
      username,
      stories,
    },
  } = await axios.get(`${API_URL}/users/me?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return {
    id,
    username,
    stories: stories.map(({id, title}: any) =>
      ({
        id,
        title: title,
      })
    ),
  };
};