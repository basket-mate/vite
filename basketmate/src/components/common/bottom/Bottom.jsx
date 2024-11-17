import React from "react";
import { useNavigate } from "react-router-dom";
import bottomIcon from "../../../constants/bottom/bottom.image";

const Bottom = () => {
    const navigate = useNavigate();

    const onClick = (page) => {
        navigate(page);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#E95322] rounded-t-3xl flex justify-around p-4 shadow-lg">
            {[
                { label: "알림", icon: bottomIcon.noticeIcon, route: "/messages" },
                { label: "홈", icon: bottomIcon.homeIcon, route: "/" },
                { label: "프로필", icon: bottomIcon.profileIcon, route: "/profile" },
            ].map((item) => (
                <div
                    key={item.label}
                    aria-label={item.label}
                    className="flex flex-col items-center text-white hover:text-gray-300 text-center"
                    onClick={() => onClick(item.route)}
                >
                    <img src={item.icon} alt={`${item.label} 아이콘`} className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Bottom;
