import { useState } from 'react';
import { axiosInstance } from '../utils/axios';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import { showAlert } from '../utils/alert';
import Cookies from 'js-cookie';

export default function useLogin() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance.post('/login', {
        email,
        password,
      });

      if (res.data.status === 'success') {
        Cookies.set('user', JSON.stringify(res.data.data.user), { expires: 7 });
        dispatch({ type: 'LOGIN', payload: res.data.data.user });
        showAlert('success', 'Logged In Successfully');
        setTimeout(() => {
          router.replace('/');
        }, 1000);
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
      showAlert('error', err.response.data.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending };
}
