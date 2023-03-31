import axios from "axios";
import { apiUrl } from '../../../constants/url'

/**
 * APIs
*/

export const login = (payload) => {
    const endpoint = 'v1/auth/login'
    const url = `${apiUrl}/${endpoint}`
    return axios.post(url, payload)
}

export const logout = () => {
    const endpoint = 'v1/auth/logout'
    const url = `${apiUrl}/${endpoint}`
    return axios.post(url)
}
