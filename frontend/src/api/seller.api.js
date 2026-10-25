import API from "./axios.api.js";

//add scrap
export const addscrap=(data)=>{return API.post("/scrap/add",data, {headers: {
    "Content-Type": "multipart/form-data",
  }},)}

//all 
export const allscrapForBuyers=(data)=>{return API.get("/scrap/all-scrap",data)}

//my-scrap
export const myscrap=(data)=>{return API.get("/scrap/my-scrap",data)}

//delete scrap
export const deletescrap=(id)=>{return API.delete(`/scrap/delete/${id}`)}


