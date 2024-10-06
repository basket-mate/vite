import basket_image from "../assets/common/basket_image.svg";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../stores/authentication";
import { postEmailLogin } from "../api/user/UserApi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (accessToken, refreshToken) => {
        useAuthenticationStore.getState().setAccessToken(accessToken);
        useAuthenticationStore.getState().setRefreshToken(refreshToken);
        navigate("/");
    };

    useEffect(() => {
        localStorage.removeItem('jwt-storage');
        useAuthenticationStore.getState().logout();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postEmailLogin({ email, password });
            const { authorization: accessToken, 'authorization-refresh': refreshToken } = response.data;

            handleLogin(accessToken, refreshToken);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };



    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#E95322]">
            <img
                src={basket_image}
                className="w-[182px] h-[192px] object-contain mb-5"
                alt="Basket Mate"
            />
            <p className="font-league-spartan-extrabold text-[35px] text-white mb-2">
                Basket Mate
            </p>
            <p className="text-white text-[15px] mb-5">
                간편하게 도와드립니다!
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 text-black border border-gray-300 rounded-md"
                />

                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-5 text-black border border-gray-300 rounded-md"
                />

                <button
                    type="submit"
                    className="w-full p-2 bg-white text-[#E95322] rounded-md mb-3 font-semibold"
                >
                    로그인
                </button>
            </form>

            <p className="text-white">
                계정이 없으신가요? <a href="/signup" className="underline">회원가입</a>
            </p>
        </div>
    );
};

export default Login;
