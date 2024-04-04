import axios from "./axiosApi"

const baseUrl = "/api/auth"
export const singUp = (singUpData) => {
    return axios.post(baseUrl + "/user",singUpData).then(res =>{
        return res;
    })
}

export const login = (loginData) =>{
    return axios.post(baseUrl + "/user/login",loginData).then(res =>{
        window.localStorage.setItem("token", res.data.token);
        return res;
    })
}