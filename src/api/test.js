import axios from "./axiosApi";

export const test = (data)=>{
    return axios.get(`/test/${data}`).then(res =>{
        return res.data;
    })
}