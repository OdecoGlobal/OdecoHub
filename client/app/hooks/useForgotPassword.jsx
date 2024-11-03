import { useState } from 'react';
import { axiosInstance } from '../utils/axios';
import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/navigation';
import { showAlert } from '../utils/alert';
export default function useForgotPassword() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const forgotPassword = async email => {
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance.post('/forgotPassword', {
        email,
      });
      console.log(res);

      //   dispatch({ type: 'LOGIN', payload: res.data.user });

      if (res.data.status === 'success') {
        showAlert('success', 'Reset Link Sent to email');
        // setTimeout(() => {
        //   router.push('/');
        // }, 1000);
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.response.data.message);

      setError(err.response.data.message);
      showAlert('error', err.response.data.message);
      setIsPending(false);
    }
  };
  return { forgotPassword, error, isPending };
}

/*


export default function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const login = async (email, password) => {
    

    try {
      const res = await axiosInstance.post('/login', {
        email,
        password,
      });

      
    } catch (err) {
      
    }
  };
 
}

*/
