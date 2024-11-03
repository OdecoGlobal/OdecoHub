'use client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('AuthcontextHook must be used within an AuthContextProvider');
  }
  return context;
}
