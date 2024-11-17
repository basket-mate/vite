import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import ytIcon from "../assets/home/ytIcon.png";

const Home = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [sortOption, setSortOption] = useState("lowPrice");
    const [address, setAddress] = useState("서울특별시 강남구 테헤란로 123");
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleUrlSubmit = () => {
        const videoId = extractYoutubeVideoId(url);
        if (videoId) {
            navigate(`/recipe/id=${videoId}`, { state: { sortOption } });
        } else {
            alert("유효한 유튜브 URL을 입력해주세요.");
        }
    };

    const extractYoutubeVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setAddress(fullAddress);
        setIsPostcodeOpen(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-200">
            <div className="flex justify-center items-center py-6 bg-yellow-500 shadow-md">
                <h1 className="font-extrabold text-4xl text-white tracking-wide">Basket Mate</h1>
            </div>
            <div className="flex-1 mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 max-w-lg">
                <div className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg text-center text-sm shadow-md">
                    영상 속 재료들을 자동으로 장바구니에 생성해드릴게요!
                </div>
                <p className="text-center text-base mt-6 text-gray-600 font-medium">
                    어떤 기준으로 장바구니를 담아드릴까요?
                </p>
                <div className="flex justify-center mt-4">
                    <div className="w-full bg-gray-100 rounded-lg px-6 py-4">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="lowPrice"
                                    checked={sortOption === "lowPrice"}
                                    onChange={handleSortChange}
                                    className="mr-2 accent-orange-500"
                                />
                                낮은 가격순
                            </label>
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="mostReviewed"
                                    checked={sortOption === "mostReviewed"}
                                    onChange={handleSortChange}
                                    className="mr-2 accent-orange-500"
                                />
                                리뷰 많은순
                            </label>
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="bestSelling"
                                    checked={sortOption === "bestSelling"}
                                    onChange={handleSortChange}
                                    className="mr-2 accent-orange-500"
                                />
                                판매량순
                            </label>
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs mt-4 text-gray-500">
                    *유튜브 숏츠나 영상의 URL만 가능합니다.
                </p>
                <div className="flex justify-center mt-4">
                    <div className="flex w-full bg-gray-100 rounded-lg px-4 py-3 items-center shadow-sm">
                        <input
                            type="text"
                            placeholder="영상의 URL을 입력해주세요."
                            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                            value={url}
                            onChange={handleUrlChange}
                        />
                        <button
                            className="ml-3 bg-orange-500 text-white rounded-lg p-2 shadow-md hover:bg-orange-600 transition"
                            onClick={handleUrlSubmit}
                        >
                            <img src={ytIcon} alt="유튜브 검색" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="h-0.5 bg-orange-500 mt-6 mx-4"></div>
                <p className="text-left text-sm mt-6 text-gray-600 font-semibold">배송지</p>
                <div className="flex justify-between items-center w-full bg-gray-100 rounded-lg px-4 py-3 mt-2 shadow-sm">
                    <p className="text-sm text-gray-700">{address}</p>
                    <button
                        className="text-sm font-semibold text-orange-500 border border-orange-500 rounded px-3 py-1 hover:bg-orange-100"
                        onClick={() => setIsPostcodeOpen(true)}
                    >
                        배송지 수정
                    </button>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="w-full bg-orange-500 text-white rounded-lg px-4 py-3 shadow-md text-lg font-semibold hover:bg-orange-600 transition"
                        onClick={handleUrlSubmit}
                    >
                        다음
                    </button>
                </div>
            </div>

            {isPostcodeOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-4 rounded-lg max-w-[500px] w-full">
                        <DaumPostcode onComplete={handleComplete} />
                        <button
                            className="mt-2 w-full py-2 bg-red-600 text-white rounded-md"
                            onClick={() => setIsPostcodeOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
