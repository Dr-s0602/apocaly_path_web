import axios from "./axiosApi"

export const singUp = (singUpData) => {
    return axios.post("/user",singUpData).then(res =>{
        return res;
    })
}