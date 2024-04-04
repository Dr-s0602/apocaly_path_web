import axios from 'axios';

// Axios 인스턴스 생성
const url = process.env.NEXT_PUBLIC_API_URL
const instance = axios.create({
    baseURL: url
});
console.log(`API URL: ${process.env.REACT_APP_API_URL}`);

// 요청 인터셉터 추가
// instance.interceptors.request.use(
//     config => {
//         // 요청을 보내기 전에 작업 수행
//         const token = localStorage.getItem('token'); // 예시로 토큰을 localStorage에서 가져옵니다.
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`; // 토큰이 있다면 헤더에 추가합니다.
//         }
//         return config;
//     },
//     error => {
//         // 요청 오류 처리를 수행합니다.
//         return Promise.reject(error);
//     }
// );

// 응답 인터셉터 추가
instance.interceptors.response.use(
    response => {
        // 응답 데이터를 처리합니다.
        return response;
    },
    error => {
        // 응답 오류 처리를 수행합니다.
        if (error.response) {
            if (error.response.status === 401) {
                // 401 오류가 발생하면 로그인 페이지 등으로 리다이렉트할 수 있습니다.
            } else if (error.response.status === 400) {
                // 400 오류가 발생하면 응답의 message를 alert로 출력합니다.
                alert(error.response.data.message);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
