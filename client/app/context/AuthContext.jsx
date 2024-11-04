'use client';
import Cookies from 'js-cookie';

import { createContext, useEffect, useReducer } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const userData = Cookies.get('user');

    if (userData) {
      console.log(JSON.parse(userData));
      dispatch({ type: 'AUTH_IS_READY', payload: JSON.parse(userData) });
    }
  }, []);

  console.log('AuthContext State: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function AuthParams() {
  const { authIsReady } = useAuthContext();
  return { authIsReady };
}
