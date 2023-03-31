import axios from "axios"
import { apiUrl } from '../../../constants/url'

const PASSWORD_LINK = `${apiUrl}/v1/password/link`

export const passwordLink = ({email}) => {
  return axios.post(PASSWORD_LINK, { email })
}