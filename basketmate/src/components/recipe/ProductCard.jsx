import React, { useState, useEffect } from "react";
import ProductSelectionModal from "./ProductSelectionModal";
import { getRecommendedProducts } from "../../api/video/VideoApi";

const ProductCard = ({
    item,
    sortOption,
    onProductSelect,
    selectedProduct,
    onCheckboxChange,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recommendedProduct, setRecommendedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendedProduct = async () => {
            setLoading(true);
            try {
                const data = await getRecommendedProducts(
                    sortOption,
                    item.main_category,
                    item.sub_category,
                    0
                );
                if (data && data.content && data.content.length > 0) {
                    setRecommendedProduct(data.content[0]);
                } else {
                    setRecommendedProduct(null);
                }
            } catch (error) {
                console.error("Error fetching recommended product:", error);
                setRecommendedProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedProduct();
    }, [sortOption, item]);

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;

        if (checked) {
            // 체크박스 선택 시, 추천 상품 또는 선택된 상품을 추가
            onProductSelect(item.ingredient, selectedProduct || recommendedProduct);
        } else {
            // 체크박스 해제 시, 상태를 삭제
            onCheckboxChange(item.ingredient, false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col">
            <div className="flex items-start">
                <input
                    type="checkbox"
                    className="mr-4 mt-2"
                    onChange={handleCheckboxChange}
                    checked={!!selectedProduct}
                />
                <img
                    src={(selectedProduct || recommendedProduct)?.imgUrl || ""}
                    alt={(selectedProduct || recommendedProduct)?.productName || "상품 이미지"}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                        재료명: {item.ingredient} <span className="text-gray-500">({item.quantity})</span>
                    </p>
                    {loading ? (
                        <p className="text-gray-500 text-sm mt-2">추천 상품을 불러오는 중...</p>
                    ) : recommendedProduct || selectedProduct ? (
                        <div className="mt-2">
                            <p className="text-gray-800 font-medium text-sm">
                                추천 상품: {(selectedProduct || recommendedProduct).className}
                            </p>
                            <p className="text-gray-600 text-sm">
                                가격: {(selectedProduct || recommendedProduct).price.toLocaleString()}원
                            </p>
                            <p className="text-gray-500 text-sm">
                                평점: {(selectedProduct || recommendedProduct).rating}점 | 리뷰: {(selectedProduct || recommendedProduct).reviewCount}개
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm mt-2">추천 상품 없음</p>
                    )}
                </div>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 w-full px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                다른 상품 선택
            </button>
            {isModalOpen && (
                <ProductSelectionModal
                    sortOption={sortOption}
                    ingredient={item.ingredient}
                    mainCategory={item.main_category}
                    subCategory={item.sub_category}
                    onSelect={(product) => {
                        onProductSelect(item.ingredient, product);
                        setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProductCard;

