import axios from "axios";

export const loginApi = (req) =>
  axios.post("http://localhost:5000/api/sessions", req);
