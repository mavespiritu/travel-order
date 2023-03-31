import axios from "axios";
import { apiUrl } from '../../../constants/url'

/**
 * APIs
 */
const PASSWORD_RESET = `${apiUrl}/v1/password/reset`
export const passwordReset = (payload) => {
  return axios.post(PASSWORD_RESET,payload)
}