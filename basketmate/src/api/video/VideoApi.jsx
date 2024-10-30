import { axiosInstance } from "../common/axiosInstance";
import { url } from "../../constants/defaultUrl";

export const getVideo = async (videoId) => {
    try {
        const response = await axiosInstance.get(`${url}/api/video/${videoId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};