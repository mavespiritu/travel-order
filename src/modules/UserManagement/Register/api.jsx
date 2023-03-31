import axios from "axios";
import { apiUrl } from '../../../constants/url'

/**
 * APIs
*/
export const register = (payload) => {
    const endpoint = 'v1/auth/register'
    const url = `${apiUrl}/${endpoint}`
    return axios.post(url, payload)
}