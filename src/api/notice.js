import axios from "./axiosApi"

export const getNoticeList = ({ category, status, title, page, size }) => {
    // 쿼리 파라미터를 사용하여 URL 생성
    const params = new URLSearchParams({
        category,
        status,
        title,
        page,
        size
    }).toString();

    return axios.get(`/notice?${params}`)
        .then(res => {
            return res.data;
        });
}

export const writePost = (postData) =>{
    return axios.post("/notice",postData).then(res =>{
        console.log("res :", res);
        return res;
    })
}
