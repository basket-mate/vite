import { axiosInstance } from "../common/axiosInstance";
import { url } from "../../constants/defaultUrl";

export const postUser = async (userInfo) => {
    const body = {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        detailAddress: userInfo.detailAddress
    };

    try {
        const res = await axiosInstance.post(`${url}/api/auth/signup`, body);
        return res;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : "서버 오류");
    }
};

export const postEmailLogin = async (userInfo) => {
    const body = {
        email: userInfo.email,
        password: userInfo.password
    };

    try {
        const res = await axiosInstance.post(`${url}/api/auth/login`, body);
        return res;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : "서버 오류");
    }
};


export const postLogout = async () => {
    try {
        const response = await axiosInstance.post(`${url}/api/auth/logout`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error("로그아웃 요청 중 오류가 발생했습니다.");
    }
};
