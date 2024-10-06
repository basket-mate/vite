import React from "react";
import { useNavigate } from "react-router-dom";
import bottomIcon from "../../../constants/bottom/bottom.image";

const Bottom = () => {
    const navigate = useNavigate();

    const onClick = (page) => {
        navigate(page);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#E95322] rounded-t-3xl flex justify-between p-4 shadow-lg">
            <div
                aria-label="알림"
                className="flex flex-col items-center text-white hover:text-gray-300 flex-1 text-center"
                onClick={() => onClick("/messages")}
            >
                <img
                    src={bottomIcon.noticeIcon}
                    alt="알림 아이콘"
                    className="w-6 h-6 mb-1"
                />
            </div>

            <div
                aria-label="홈"
                className="flex flex-col items-center text-white hover:text-gray-300 flex-1 text-center"
                onClick={() => onClick("/")}
            >
                <img
                    src={bottomIcon.homeIcon}
                    alt="홈 아이콘"
                    className="w-6 h-6 mb-1"
                />
            </div>

            <div
                aria-label="프로필"
                className="flex flex-col items-center text-white hover:text-gray-300 flex-1 text-center"
                onClick={() => onClick("/profile")}
            >
                <img
                    src={bottomIcon.profileIcon}
                    alt="프로필 아이콘"
                    className="w-6 h-6 mb-1"
                />
            </div>
        </div>
    );
};

export default Bottom;