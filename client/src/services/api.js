import axios from "axios";

export const getDashboardData = () =>
  axios.get("http://127.0.0.1:5000/api/dashboard");