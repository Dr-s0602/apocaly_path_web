import React, {useEffect, useState} from 'react';
import {uploadFile} from "../../api/file"; // 파일 업로드 API를 import 합니다.

const WritePostModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async () => {
        try {
            const fileUploadPromises = Array.from(files).map((file, index) => uploadFile(file, index));
            const uploadedFileIds = await Promise.all(fileUploadPromises);

            onSubmit({
                title,
                content,
                isPinned,
                fileIds: uploadedFileIds,
                category: 'notice'
            });
            onClose();
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    useEffect(()=>{
        setTitle("")
        setContent("")
        setIsPinned(false)
        setFiles(null);
    },[isOpen])

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h2>글쓰기</h2>
                <input
                    type="text"
                    placeholder="제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    rows="5"
                    placeholder="내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isPinned}
                        onChange={(e) => setIsPinned(e.target.checked)}
                    />
                    공지사항으로 등록
                </label>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleSubmit}>제출</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default WritePostModal;
