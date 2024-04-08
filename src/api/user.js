import axios from "./axiosApi"
import {authStore} from "../stroes/authStore";

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
                authStore.checkLoggedIn()
            }
            return response;
        })
        .catch(error => {
            // 에러 처리
            console.error("Login error : ", error.response);
            throw error;
        });
};
