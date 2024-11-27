import { AxiosError } from 'axios';
import axiosInstance from '@/shared/config/axios.config';
// import { useLayoutContext } from '@/context/LayoutContext';
import useNotification from './useNotification';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface ApiParameters {
  url: string;
  method: Method;
  body: any;
}

const useApi = () => {
  // const { setLoading } = useLayoutContext();
  const { errors } = useNotification();
  const axios = axiosInstance;

  const api = async <T>(url: string, method: Method = 'GET', body: any = null) => {
    // setLoading(true);
    try {
      const response = await axios<T>({
        url,
        method,
        data: body,
      });

      return response.data;
    } catch (err) {
      errors({ message: (err as AxiosError).message || 'An error occurred' });
    } finally {
      // setLoading(false);
    }
  };

  return { axios, api };
};

export default useApi;
