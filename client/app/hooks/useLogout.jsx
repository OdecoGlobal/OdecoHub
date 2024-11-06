import { useState } from 'react';
import { axiosInstance } from '../utils/axios';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import { showAlert } from '../utils/alert';
import Cookies from 'js-cookie';

export default function useLogout() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance.get('/users/logout');

      if (res.data.status === 'success') {
        Cookies.remove('user');
        dispatch({ type: 'LOGOUT', payload: null });
        showAlert('success', 'Logged Out Successfully');
        setTimeout(() => {
          router.replace('/login');
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
  return { logout, error, isPending };
}
