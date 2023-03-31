import axios from 'axios'
import useStorage from './useStorage'
import csrfToken from '../library/csrfToken'
import { useQuery } from "@tanstack/react-query"

const useToken = () => {

  const csrf = useQuery(['csrfToken'], csrfToken)

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.withCredentials = true;

  /**
   * Add Token
   */
   axios.interceptors.request.use(function (config) {
    const { token } = JSON.parse(useStorage().get())
      config.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${token}`,
      }

      return config;
  
  });
  
  axios.interceptors.request.use()
  /**
   * Validation sequence
   * 401 for invalid token e.g., expired or non-passport token
   */
   axios.interceptors.response.use(
  
      response => response,
      // eslint-disable-next-line func-names
      async function(error) {
          if (error?.response?.status === 401) {

          }
          return Promise.reject(error);
      },
  );

}

export default useToken