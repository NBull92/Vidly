import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
import { process } from "joi-browser";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error); //  Provide proper logging
    toast.error("An unexpected error occured.");
  }

  return Promise.reject(error);
});
//  axios.interceptors.response.use(success method, error method);
//  In some applications you may want to make use of the success method. Logging is an exmaple. Sounds like a good idea really.

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
