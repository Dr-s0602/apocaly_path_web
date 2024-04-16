import axios from "./axiosApi"
import {authStore} from "../stores/authStore";

const baseUrl = "/api/auth"
export const singUp = (singUpData) => {
    return axios.post(baseUrl + "/user",singUpData).then(res =>{
        return res;
    })
}

export const login = (loginData) => {
    return axios.post("/login", loginData)
        .then(response => {
            // 성공적인 응답 처리
            const token = response.headers['authorization'] || response.headers['Authorization'];
            if (token) {
                const pureToken = token.split(' ')[1];
                window.localStorage.setItem("token", pureToken);
                window.localStorage.setItem("isAdmin", response.data.isAdmin);
                window.localStorage.setItem("refresh", response.data.refresh)
                authStore.setIsAdmin(response.data.isAdmin)
                authStore.checkLoggedIn()
            }
            return response;
        })
};

export const logout = () =>{
    return axios.post("/logout").then(res =>{
        return res
    })
}