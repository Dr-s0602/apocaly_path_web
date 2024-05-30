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
    console.log("postData : ", postData);
    return axios.post("/notice",postData).then(res =>{
        console.log("res :", res);
        return res;
    })
}

export const postReadCountUp = (postId) => {
    axios.post(`/notice/read/${postId}`).then(response => {
        console.log('Read count incremented successfully', response);
    }).catch(error => {
        console.error('Error incrementing read count', error);
    });
}

export const noticeLikeUp = (requestData) => {
    axios.post("/notice/likes", requestData).then(res =>{
        console.log("successfully like ", res)
    }).catch(err =>{
        console.log("error like", err);
    })
}