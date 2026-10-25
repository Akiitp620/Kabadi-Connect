import axios from "axios"

const API=axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true,
     headers: {
    "Content-Type": "application/json"
  }
})

API.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("ERROR RESPONSE:", error.response);
    return Promise.reject(error);
  }
);

export default API;