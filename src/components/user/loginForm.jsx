import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../../api/user';
import { handleAxiosError } from '../../api/errorAxiosHandle';
import { useRouter } from 'next/router';
import KakaoLogin from "./KakaoLogin";

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const loginMutation = useMutation(loginData => login(loginData), {
        onSuccess: (data) => {
            // 로그인 성공 후의 동작을 정의합니다.
            router.push('/'); // 예를 들어, 사용자를 홈 페이지로 리다이렉션합니다.
        },
        onError: (error) => {
            // 에러 핸들러를 호출하여 사용자에게 에러를 알립니다.
            handleAxiosError(error);
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData); // mutate 함수로 로그인 요청을 보냅니다.
    };

    return (
        <div className="center-div">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="button-container">
                    {loginMutation.isLoading ? (
                        // 로그인 중일 때는 로딩 텍스트를 표시합니다.
                        <p>로그인 중...</p>
                    ) : (
                        // 로그인 중이 아닐 때는 로그인 버튼을 표시합니다.
                        <button type="submit">로그인</button>
                    )}
                    {/* 에러 발생 시 에러 메시지는 handleAxiosError 함수에서 처리합니다.
                        따라서 여기에 별도로 에러 메시지를 표시할 필요는 없습니다. */}
                </div>
                <KakaoLogin/>
            </form>
        </div>
    );
};

export default LoginForm;
