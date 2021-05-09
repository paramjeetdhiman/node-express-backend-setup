// this file check to see if token is passed in
// if it is then we set to the global header
// if not then delete it to the global header

import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
