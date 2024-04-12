// WritePostModal.js
import React, { useState } from 'react';

const WritePostModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);

    // 폼 제출 처리
    const handleSubmit = () => {
        // is_pinned 값을 변경하고 싶다면, 여기서 isPinned 상태를 사용하면 됩니다.
        // 예를 들어, checkbox 등의 입력을 통해 사용자가 선택하도록 할 수 있습니다.
        // category는 공지사항(notice)으로 고정되어 있습니다.
        onSubmit({
            title,
            content,
            isPinned,
            category: 'notice'
        });
        onClose(); // 모달 닫기
    };

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
                <button onClick={handleSubmit}>제출</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default WritePostModal;
