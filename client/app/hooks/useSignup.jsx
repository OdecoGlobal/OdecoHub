import { useState } from 'react';
import { axiosInstance } from '../utils/axios';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import { showAlert } from '../utils/alert';
import Cookies from 'js-cookie';

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const signup = async (name, email, userName, password, passwordConfirm) => {
    setData(null);
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance.post('/signup', {
        name,
        email,
        userName,
        password,
        passwordConfirm,
      });
      console.log(res.data);

      if (!res) {
        throw new Error('Signup incomplete');
      }

      if (res.data.status === 'success') {
        // Cookies.set('user', JSON.stringify(res.data.data.user), { expires: 7 });
        // dispatch({ type: 'LOGIN', payload: res.data.data.user });
        showAlert('success', 'Signup successful');
        setTimeout(() => {
          router.replace('/login');
        }, 1000);
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);

      console.log(err.response.data.message);
      setError(err.response.data.message);
      showAlert('error', err.response.data.message);
      setIsPending(false);
    }
  };
  return { signup, error, isPending, data };
}
