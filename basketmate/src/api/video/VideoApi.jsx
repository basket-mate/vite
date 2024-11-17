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

export const getRecommendedProducts = async (
    sortOption,
    mainCategory,
    subCategory,
    page = 0
) => {
    try {
        const response = await axiosInstance.get(`${url}/api/product/recommend`, {
            params: {
                sortOption,
                mainCategory,
                subCategory,
                page,
            },
        });
        if (!response.data) {
            throw new Error("응답 데이터가 비어 있습니다.");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching recommended products:", error);
        throw error;
    }
};


