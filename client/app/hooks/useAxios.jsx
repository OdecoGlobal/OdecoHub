import { useState } from 'react';
import { axiosInstance } from '../utils/axios';

export default function useAxios(url, method = 'GET') {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (fetchOption, id = '') => {
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance({
        method,
        url: id ? `${url}/${id}` : url,
        ...(method !== 'GET' && fetchOption),
      });
      if (res.data.status === 'success') {
        setData(res.data.data.data);
      }
      setIsPending(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message || 'Could not fetch the data');

      setIsPending(false);
    }
  };

  return { data, isPending, error, fetchData };
}
