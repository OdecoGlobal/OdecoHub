import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axios';

export default function useAxios(url, method = 'GET') {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (requestData = null) => {
      setIsPending(true);
      setError(null);

      try {
        const options = {
          method,
          ...(requestData &&
            ['POST', 'PATCH', 'PUT'].includes(method) && {
              data: requestData,
            }),
        };

        const res = await axiosInstance(url, options);
        if (res.data.status === 'success') {
          console.log(res.data.data.data);

          setData(res.data.data.data);
        }
        setIsPending(false);
      } catch (err) {
        setError('Could not fetch the data');
        setIsPending(false);
        console.error(err);
      }
    };
    fetchData();
  }, [url, method]);

  return { data, isPending, error };
}
