import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getVideo } from "../api/video/VideoApi";
import RecipeModal from "../components/recipe/RecipeModal";

const Recipe = () => {
    const { videoId } = useParams();
    const location = useLocation();
    const [videoData, setVideoData] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cleanedVideoId = videoId.replace("id=", "");

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const data = await getVideo(cleanedVideoId);
                setVideoData(data);
            } catch (err) {
                setError("Failed to load video data");
                console.error("Error fetching video data:", err);
            }
        };

        fetchVideoData();
    }, [cleanedVideoId]);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const seasoning = videoData && videoData.ingredient
        ? JSON.parse(videoData.ingredient).ingredients.seasoning
        : [];

    const mainIngredients = videoData && videoData.ingredient
        ? JSON.parse(videoData.ingredient).ingredients.main_ingredients
        : [];

    return (
        <div className="flex flex-col h-screen bg-yellow-400">
            <div className="flex justify-center items-center py-2 bg-yellow-400 sticky top-0 z-10">
                <h1 className="font-league-spartan-extrabold text-2xl text-white">
                    Recipe
                </h1>
            </div>
            <div className="flex-1 overflow-y-auto mx-auto mt-4 bg-white rounded-lg p-4 max-w-md">
                <div className="text-center text-lg font-bold py-2">
                    {videoData ? videoData.title : "Loading..."}
                </div>
                <div className="h-0.5 bg-red-400 mt-2 mx-4"></div>

                <button
                    className="bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
                    onClick={handleModalOpen}
                >
                    레시피 보기
                </button>
                <div className="h-0.5 bg-red-400 mt-2 mx-4"></div>

                <p className="mt-4 ml-4 text-sm font-medium">요리 재료</p>
                <div
                    className="bg-gray-100 w-full flex-grow rounded-lg mt-2 p-4 overflow-y-auto"
                    style={{ maxHeight: "200px" }}
                >
                    {seasoning.length > 0 || mainIngredients.length > 0 ? (
                        <>
                            <p className="font-semibold">Main Ingredients</p>
                            {mainIngredients.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <p className="font-semibold">{item.ingredient}</p>
                                    <p className="text-gray-600 text-sm">{`수량: ${item.quantity}`}</p>
                                    <p className="text-gray-600 text-sm">{`카테고리: ${item.main_category}`}</p>
                                </div>
                            ))}
                            <p className="font-semibold mt-4">Seasoning</p>
                            {seasoning.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <p className="font-semibold">{item.ingredient}</p>
                                    <p className="text-gray-600 text-sm">{`수량: ${item.quantity}`}</p>
                                    <p className="text-gray-600 text-sm">{`카테고리: ${item.main_category}`}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className="text-gray-500">재료를 불러오는 중...</p>
                    )}
                </div>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            <RecipeModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                recipe={videoData ? videoData.recipe : ""}
            />
        </div>
    );
};

export default Recipe;
