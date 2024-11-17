import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getVideo } from "../api/video/VideoApi";
import ProductCard from "../components/recipe/ProductCard";
import RecipeModal from "../components/recipe/RecipeModal";
import { getRecommendedProducts } from "../api/video/VideoApi";

const Recipe = () => {
    const { videoId } = useParams();
    const location = useLocation();
    const [videoData, setVideoData] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedCount, setSelectedCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const sortOption = location.state?.sortOption || "lowPrice";

    const cleanedVideoId = videoId.replace("id=", "");

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const data = await getVideo(cleanedVideoId);
                setVideoData(data);

                if (data) {
                    const mainIngredients = JSON.parse(data.ingredient).ingredients.main_ingredients;
                    const seasoning = JSON.parse(data.ingredient).ingredients.seasoning;
                    const allIngredients = [...mainIngredients, ...seasoning];
                    const initialSelected = {};

                    for (const item of allIngredients) {
                        const products = await getRecommendedProducts(
                            sortOption,
                            item.main_category,
                            item.sub_category,
                            0
                        );
                        if (products.content.length > 0) {
                            initialSelected[item.ingredient] = products.content[0];
                        }
                    }
                    setSelectedProduct(initialSelected);
                }
            } catch (err) {
                setError("Failed to load video data");
                console.error("Error fetching video data:", err);
            }
        };

        fetchVideoData();
    }, [cleanedVideoId, sortOption]);

    useEffect(() => {
        const selectedProducts = Object.values(selectedProduct).filter(Boolean);
        setSelectedCount(selectedProducts.length);
        setTotalPrice(
            selectedProducts.reduce((sum, product) => sum + (product.price || 0), 0)
        );
    }, [selectedProduct]);

    const handleProductSelect = (ingredient, product) => {
        setSelectedProduct((prev) => ({
            ...prev,
            [ingredient]: product,
        }));
    };

    const handleCheckboxChange = (ingredient, checked) => {
        if (!checked) {
            setSelectedProduct((prev) => {
                const updated = { ...prev };
                delete updated[ingredient];
                return updated;
            });
        }
    };

    const seasoning = videoData?.ingredient
        ? JSON.parse(videoData.ingredient).ingredients.seasoning
        : [];

    const mainIngredients = videoData?.ingredient
        ? JSON.parse(videoData.ingredient).ingredients.main_ingredients
        : [];

    return (
        <div className="flex flex-col h-screen bg-yellow-400">
            <div className="flex justify-center items-center py-4 bg-yellow-500 sticky top-0 z-10 shadow-md">
                <h1 className="font-bold text-2xl text-white">Recipe</h1>
            </div>

            <div className="flex-1 mx-auto mt-4 bg-white rounded-lg p-4 max-w-4xl">
                <div className="text-center text-lg font-bold py-2">
                    {videoData ? videoData.title : "Loading..."}
                </div>
                <div className="h-0.5 bg-red-400 mt-2 mx-4"></div>

                <button
                    className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
                    onClick={() => setIsModalOpen(true)}
                >
                    레시피 보기
                </button>
                <div className="h-0.5 bg-red-400 mt-4 mx-4"></div>

                <div className="mt-6">
                    <p className="text-lg font-semibold text-center mb-2">Main Ingredients</p>
                    <div className="grid gap-4 bg-gray-50 rounded-lg p-4 overflow-y-auto" style={{ maxHeight: "300px" }}>
                        {mainIngredients.map((item, index) => (
                            <ProductCard
                                key={index}
                                item={item}
                                sortOption={sortOption}
                                selectedProduct={selectedProduct[item.ingredient]}
                                onProductSelect={handleProductSelect}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-lg font-semibold text-center mb-2">Seasoning</p>
                    <div className="grid gap-4 bg-gray-50 rounded-lg p-4 overflow-y-auto" style={{ maxHeight: "300px" }}>
                        {seasoning.map((item, index) => (
                            <ProductCard
                                key={index}
                                item={item}
                                sortOption={sortOption}
                                selectedProduct={selectedProduct[item.ingredient]}
                                onProductSelect={handleProductSelect}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-300">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">
                        선택한 상품: {selectedCount}개 | 총 가격: {totalPrice.toLocaleString()}원
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        구매하기
                    </button>
                </div>
            </div>

            <RecipeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                recipe={videoData?.recipe || ""}
            />
        </div>
    );
};

export default Recipe;
