import axios from "axios";

const API = axios.create({
  baseURL:
    "https://smart-campus-connect-cuef.onrender.com",
});

// ATTACH TOKEN
API.interceptors.request.use(
  (req) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;

    }

    return req;

  }
);

export default API;