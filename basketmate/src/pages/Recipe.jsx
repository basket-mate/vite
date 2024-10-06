import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Recipe = () => {
    const { videoId } = useParams();
    const location = useLocation();
    const sortOption = location.state?.sortOption || "lowPrice";

    return (
        <div className="flex flex-col h-screen bg-yellow-400">
            <div className="flex justify-center items-center py-4 bg-yellow-400 sticky top-0 z-10">
                <h1 className="font-league-spartan-extrabold text-3xl text-white">
                    Recipe
                </h1>
            </div>
            <div className="flex-1 overflow-y-auto mx-auto mt-10 bg-white rounded-lg p-4 max-w-md">
                <div className="bg-gray-300 w-full h-20 rounded-lg flex items-center justify-center text-lg font-bold">
                    {`영상 제목 (Video ID: ${videoId})`}
                </div>
                <div className="h-0.5 bg-red-400 mt-4 mx-4"></div>

                <div className="bg-gray-300 w-full h-12 rounded-lg flex items-center justify-center text-sm font-medium mt-4">
                    레시피
                </div>
                <div className="h-0.5 bg-red-400 mt-2 mx-4"></div>

                <p className="mt-4 ml-4 text-sm font-medium">요리 재료</p>
                <div className="bg-gray-300 w-full h-60 rounded-lg mt-2"></div>
            </div>
        </div>
    );
};

export default Recipe;
