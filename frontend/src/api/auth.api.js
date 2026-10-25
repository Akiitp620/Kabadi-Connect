import API from "./axios.api.js";

//user register
export const signupUser=(data)=>{return API.post("/auth/signup",data)}

//user login 
export const userLogin=(data)=>{return API.post("/auth/login",data)}

//user logout
export const userLogout=(data)=>{return API.post("/auth/logout",data)}