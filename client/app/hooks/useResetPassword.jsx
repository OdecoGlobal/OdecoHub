import { useState } from 'react';
import { axiosInstance } from '../utils/axios';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import { showAlert } from '../utils/alert';

export default function useResetPassword() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const { dispatch } = useAuthContext();
  const router = useRouter();
  const resetPassword = async (token, password, passwordConfirm) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance.patch(`/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });
      if (res.data.status === 'success') {
        showAlert('success', 'Password Reset Successful');
        setTimeout(() => {
          router.replace('/login');
        }, 1000);
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      setError(err.response.data.message);
      showAlert('error', err.response.data.message);
      setIsPending(false);
    }
  };
  return { resetPassword, error, isPending };
}
