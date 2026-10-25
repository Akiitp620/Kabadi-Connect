import API from "./axios.api"

//my-crops
export const getCropById=(id)=>{
    const res= API.get(`/crops/${id}`)
    return res
}

//save address
export const saveAddress=(data)=>{
    const res=API.post("/orders/address",data)
    return res
}

//create order
export const createOrder=(data)=>{
    const res=API.post("/orders/create",data)
    return res
}