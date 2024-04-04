import React, { useState } from 'react';
import {login} from "../../api/user";
import {handleAxiosError} from "../../api/errorAxiosHandle";
import {useRouter} from "next/dist/client/router"

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        // 로그인 로직을 여기에 구현하세요.
        const { email, password} = formData;
        const loginData = {
            email:email,
            password:password,
        }
        login(loginData).then(res =>{
            router.push("/");
        }).catch(handleAxiosError)
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
                    <button type="submit">로그인</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
