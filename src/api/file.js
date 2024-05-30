import axios from "./axiosApi"

export const uploadFile = async (file, index) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('index', index);
    const response = await axios.post('/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data.fileId;
};
