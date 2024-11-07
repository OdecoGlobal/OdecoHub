import { useState } from 'react';
import { axiosInstance } from '../utils/axios';
import { useRouter } from 'next/navigation';
import { showAlert } from '../utils/alert';
import { useAuthContext } from './useAuthContext';
import Cookies from 'js-cookie';

export function useUpdateAccount() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { dispatch } = useAuthContext();

  const updateAccount = async (data, type) => {
    setError(null);
    setIsPending(true);
    try {
      const url =
        type === 'password' ? '/users/updateMyPassword' : '/users/updateMe';

      const res = await axiosInstance.patch(url, data);
      if (res.data.status === 'success') {
        console.log(res.data.data.user);
        Cookies.set('user', JSON.stringify(res.data.data.user), { expires: 7 });

        dispatch({ type: 'UPDATED', payload: res.data.data.user });
        showAlert('success', `${type.toUpperCase()} Updated Successfully`);
        setTimeout(() => {
          router.replace('/');
        }, 1000);
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);

      console.log(err.response?.data.message);
      setError(err.response.data.message);
      showAlert('error', err.response.data.message);
      setIsPending(false);
    }
  };
  return { updateAccount, isPending, error };
}
