import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [sortOption, setSortOption] = useState("lowPrice");

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleUrlSubmit = () => {
        const videoId = extractYoutubeVideoId(url);
        if (videoId) {
            navigate(`/recipe/id=${videoId}`, { state: { videoId, sortOption } });
        } else {
            alert("유효한 유튜브 URL을 입력해주세요.");
        }
    };

    const extractYoutubeVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className="flex flex-col h-screen bg-yellow-400">
            <div className="flex justify-center items-center py-4 bg-yellow-400 sticky top-0 z-10">
                <h1 className="font-league-spartan-extrabold text-3xl text-white">
                    Basket Mate
                </h1>
            </div>
            <div className="flex-1 overflow-y-auto mx-auto mt-10 bg-white rounded-lg p-4 max-w-md">
                <div className="grid grid-cols-5 gap-2 mt-2">
                    <div className="bg-orange-200 w-full h-20 rounded-lg"></div>
                    <div className="bg-orange-200 w-full h-20 rounded-lg"></div>
                    <div className="bg-orange-200 w-full h-20 rounded-lg"></div>
                    <div className="bg-orange-200 w-full h-20 rounded-lg"></div>
                    <div className="bg-orange-200 w-full h-20 rounded-lg"></div>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center mt-1 text-xs">
                    <span>해산물</span>
                    <span>육류</span>
                    <span>야채류</span>
                    <span>소스류</span>
                    <span>기타</span>
                </div>

                <div className="h-0.5 bg-red-400 mt-4 mx-4"></div>

                <div className="bg-[#E95322] text-white font-bold px-4 py-1 mt-4 rounded-md text-center w-full text-xs">
                    영상 속 재료들을 자동으로 장바구니에 생성해드릴게요!
                </div>

                <p className="text-center text-sm mt-4 text-gray-500">
                    어떤 기준으로 장바구니를 담아드릴까요?
                </p>
                <div className="flex justify-center mt-2">
                    <div className="w-full mx-6 p-2 bg-gray-100 rounded-lg">
                        <div className="flex justify-around">
                            <label className="text-xs">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="lowPrice"
                                    checked={sortOption === "lowPrice"}
                                    onChange={handleSortChange}
                                />
                                낮은 가격순
                            </label>
                            <label className="text-xs">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="mostReviewed"
                                    checked={sortOption === "mostReviewed"}
                                    onChange={handleSortChange}
                                />
                                리뷰 많은순
                            </label>
                            <label className="text-xs">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="bestSelling"
                                    checked={sortOption === "bestSelling"}
                                    onChange={handleSortChange}
                                />
                                판매량순
                            </label>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs mt-4 text-gray-500">
                    *유튜브 숏츠나 영상의 URL만 가능합니다.
                </p>
                <div className="flex justify-center mt-2">
                    <div className="flex w-full mx-6 p-2 bg-gray-100 rounded-lg">
                        <input
                            type="text"
                            placeholder="영상의 URL을 입력해주세요."
                            className="flex-1 bg-transparent text-sm px-2"
                            value={url}
                            onChange={handleUrlChange}
                        />
                        <button className="ml-2" onClick={handleUrlSubmit}>
                            <img alt="검색" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="h-0.5 bg-red-400 mt-4 mx-4"></div>

                <p className="text-left text-xs ml-4 mt-4 text-gray-500">배송지</p>
                <div className="flex justify-start items-center w-auto mx-6 p-2 bg-gray-100 rounded-lg mt-2">
                    <button className="text-xs text-red-600 border border-red-600 rounded px-2 py-1">
                        배송지 수정
                    </button>
                </div>

                <p className="text-left text-xs ml-4 mt-4 text-gray-500">배송 요청사항</p>
                <div className="flex justify-center mt-2">
                    <input
                        type="text"
                        placeholder="문 앞에 두고 가주세요."
                        className="w-full mx-6 p-2 bg-gray-100 rounded-lg text-sm"
                    />
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className="w-full mx-6 p-2 bg-red-600 text-white rounded-lg text-center text-lg"
                        onClick={handleUrlSubmit}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
