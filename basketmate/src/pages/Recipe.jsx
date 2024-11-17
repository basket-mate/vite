import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getVideo } from "../api/video/VideoApi";
import ProductCard from "../components/recipe/ProductCard";
import RecipeModal from "../components/recipe/RecipeModal";
import IngredientsModal from "../components/recipe/IngredientsModal";
import { getRecommendedProducts } from "../api/video/VideoApi";

const Recipe = () => {
    const { videoId } = useParams();
    const location = useLocation();
    const initialSortOption = location.state?.sortOption || "lowPrice";
    const [sortOption, setSortOption] = useState(initialSortOption);
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const [isIngredientsModalOpen, setIsIngredientsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedCount, setSelectedCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchVideoData = async (sort) => {
        setLoading(true);
        try {
            const data = await getVideo(videoId.replace("id=", ""));
            setVideoData(data);

            if (data && data.ingredient) {
                const { main_ingredients, seasoning } = JSON.parse(data.ingredient).ingredients;
                const allIngredients = [...main_ingredients, ...seasoning];
                const initialSelected = {};

                for (const item of allIngredients) {
                    const products = await getRecommendedProducts(
                        sort,
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
            setError("Failed to load video data. Please try again.");
            console.error("Error fetching video data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideoData(sortOption);
    }, [videoId, sortOption]);

    useEffect(() => {
        const selectedProducts = Object.values(selectedProduct).filter(Boolean);
        setSelectedCount(selectedProducts.length);
        setTotalPrice(selectedProducts.reduce((sum, product) => sum + (product.price || 0), 0));
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

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-yellow-200">
                <p className="text-lg font-semibold text-gray-600">Loading recipe data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-yellow-200">
                <p className="text-lg font-semibold text-red-600">{error}</p>
            </div>
        );
    }

    const { main_ingredients = [], seasoning = [] } = videoData?.ingredient
        ? JSON.parse(videoData.ingredient).ingredients
        : {};

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-yellow-400 to-yellow-200">
            <header className="bg-yellow-500 shadow-md py-4 sticky top-0 z-10">
                <h1 className="text-3xl font-extrabold text-white text-center">Recipe</h1>
            </header>

            <main className="flex-1 mx-auto mt-4 bg-white rounded-2xl p-6 shadow-lg max-w-4xl">
                <section className="text-center mb-4">
                    <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
                        {videoData?.title || "요리 제목"}
                    </h2>
                    {videoData?.dishName && (
                        <p className="text-base font-medium text-gray-600 mt-2 italic">
                            ― {videoData.dishName} ―
                        </p>
                    )}
                </section>


                <div className="flex justify-between mt-4">
                    {["lowPrice", "mostReviewed", "bestSelling"].map((option, index) => (
                        <button
                            key={index}
                            className={`w-1/3 py-2 text-sm font-semibold rounded-lg transition shadow-md ${sortOption === option
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            onClick={() => handleSortChange(option)}
                        >
                            {option === "lowPrice" && "낮은 가격순"}
                            {option === "mostReviewed" && "리뷰 많은순"}
                            {option === "bestSelling" && "판매량순"}
                        </button>
                    ))}
                </div>

                <hr className="border-t border-red-400 my-4" />

                <div className="flex gap-4">
                    <button
                        className="w-1/2 py-2 text-sm bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600"
                        onClick={() => setIsRecipeModalOpen(true)}
                    >
                        레시피 보기
                    </button>
                    <button
                        className="w-1/2 py-2 text-sm bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600"
                        onClick={() => setIsIngredientsModalOpen(true)}
                    >
                        재료목록 보기
                    </button>
                </div>

                <hr className="border-t border-red-400 my-4" />

                <section className="bg-gray-50 rounded-lg p-4 overflow-y-auto" style={{ height: "350px" }}>
                    {main_ingredients.concat(seasoning).map((item, index) => (
                        <ProductCard
                            key={index}
                            item={item}
                            sortOption={sortOption}
                            selectedProduct={selectedProduct[item.ingredient]}
                            onProductSelect={handleProductSelect}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    ))}
                </section>
            </main>

            <footer className="bg-gray-100 p-4 border-t border-gray-300 shadow-md sticky bottom-0">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm sm:text-lg font-medium text-gray-700">
                        선택한 상품: <span className="font-bold text-gray-900">{selectedCount}개</span> | 총 가격:{" "}
                        <span className="font-bold text-gray-900">{totalPrice.toLocaleString()}원</span>
                    </p>
                    <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700">
                        구매하기
                    </button>
                </div>
            </footer>

            <RecipeModal
                isOpen={isRecipeModalOpen}
                onClose={() => setIsRecipeModalOpen(false)}
                recipe={videoData?.recipe || ""}
            />
            <IngredientsModal
                isOpen={isIngredientsModalOpen}
                onClose={() => setIsIngredientsModalOpen(false)}
                mainIngredients={main_ingredients}
                seasoning={seasoning}
            />
        </div>
    );
};

export default Recipe;
