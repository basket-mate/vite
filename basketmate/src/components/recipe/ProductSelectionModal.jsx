import React, { useEffect, useState } from "react";
import { getRecommendedProducts } from "../../api/video/VideoApi";

const ProductSelectionModal = ({
    sortOption,
    mainCategory,
    subCategory,
    onSelect,
    onClose,
}) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            const data = await getRecommendedProducts(sortOption, mainCategory, subCategory, page);
            setProducts(data.content); // 백엔드에서 `Page` 객체로 반환된 content 사용
            setTotalPages(data.totalPages); // 총 페이지 수
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [sortOption, mainCategory, subCategory, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 mx-4 relative">
                <h2 className="text-lg font-semibold mb-4 text-center">추천 상품 목록</h2>
                {loading ? (
                    <p className="text-center text-gray-500">상품을 불러오는 중...</p>
                ) : (
                    <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <div
                                    key={index}
                                    onClick={() => onSelect(product)}
                                    className="cursor-pointer border rounded-lg p-4 flex items-center hover:bg-gray-100"
                                >
                                    <img
                                        src={product.imgUrl || "/default-image.png"}
                                        alt={product.productName}
                                        className="w-24 h-24 object-cover rounded-md mr-4"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800">
                                            {product.productName}
                                        </p>
                                        <p className="text-gray-600">
                                            가격: {product.price.toLocaleString()}원
                                        </p>
                                        <p className="text-gray-500">
                                            평점: {product.rating}점 | 리뷰 수: {product.reviewCount}개
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">추천 상품이 없습니다.</p>
                        )}
                    </div>
                )}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded ${currentPage === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                    >
                        이전
                    </button>
                    <span className="text-sm text-gray-700">
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage + 1 >= totalPages}
                        className={`px-4 py-2 rounded ${currentPage + 1 >= totalPages
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                    >
                        다음
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default ProductSelectionModal;
