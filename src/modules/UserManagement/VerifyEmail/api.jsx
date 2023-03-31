import axios from "axios";

export const verifyEmail = (url) => {
    return axios.get(url)
}

