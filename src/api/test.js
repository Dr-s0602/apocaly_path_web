import axios from "./axiosApi";

export const test = (data)=>{
    console.log(`API URL: ${process.env.REACT_APP_API_URL}`);
    return axios.get(`/test/${data}`).then(res =>{
        return res;
    })
}