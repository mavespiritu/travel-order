import axios from "axios";
import route from '../../../library/route'
import { apiUrl } from '../../../constants/url'

/**
 * APIs
 */
const RESEND_LINK = `${apiUrl}/v1/email/resend/:id`
export const resendLink = (id) => {
  const url = route(RESEND_LINK, {id})
  return axios.get(url)
}