import React from "react";
import { Outlet } from "react-router-dom";
import Bottom from "../../components/common/bottom/Bottom";

const Layout = () => {
    return (
        <div className="flex flex-col items-center w-full bg-gray-100 h-screen">
            <div className="flex flex-col w-full max-w-4xl bg-white shadow-md h-full">
                <div className="flex-grow overflow-y-auto">
                    <Outlet />
                </div>
                <div className="fixed bottom-0 w-full max-w-4xl z-10">
                    <Bottom />
                </div>
            </div>
        </div>
    );
};

export default Layout;
