import React, { useState } from 'react';
import {singUp} from "../../api/user";
import {useRouter} from "next/dist/client/router"
import {handleAxiosError} from "../../api/errorAxiosHandle";
import KakaoSignup from "./KakaoSignup";

const SignUpForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        const singUpData = {
            email:email,
            password:password,
        }
        singUp(singUpData).then(res =>{
            router.push("/user/login")
        }).catch(handleAxiosError)
    };

    return (
        <div className="center-div">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">확인:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
                </div>
                <div className="button-container">
                    <button type="submit">회원가입</button>
                </div>
                <KakaoSignup/>
            </form>
        </div>
    );
};

export default SignUpForm;
