'use client';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';

import { createContext, useEffect, useReducer } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useRouter, usePathname } from 'next/navigation';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    case 'UPDATED':
      return { ...state, user: action.payload };
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
      dispatch({ type: 'AUTH_IS_READY', payload: JSON.parse(userData) });
    } else {
      dispatch({ type: 'AUTH_IS_READY', payload: null });
    }
  }, []);

  console.log('AuthContext State: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthStatus({ children }) {
  const { dispatch, authIsReady, user } = useAuthContext();
  useEffect(() => {
    if (user) {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    } else {
      dispatch({ type: 'AUTH_IS_READY', payload: null });
    }
  }, [dispatch, user]);
  return (
    <>
      {!authIsReady && (
        <div className="grid place-items-center min-h-screen bg-gradient-to-b from-white to-gray-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
            {/* <p className="text-gray-600 font-medium">Authenticating...</p> */}
          </div>
        </div>
      )}
      {authIsReady && <>{children}</>}
    </>
  );
}

export function RouteGuard({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authRoutes = ['/login', '/signup', '/forgotPassword'];
    // List of routes that require authentication
    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
    if (user && authRoutes.includes(pathname)) {
      router.push('/');
      return;
    }

    if (!user && protectedRoutes.includes(pathname)) {
      router.push('/login');
      return;
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
