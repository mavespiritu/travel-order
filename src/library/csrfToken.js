import axios from "axios";
import { apiUrl } from "../constants/url";

const csrfToken = () => {

  return axios.get(`${apiUrl}/sanctum/csrf-cookie`)

}

export default csrfToken