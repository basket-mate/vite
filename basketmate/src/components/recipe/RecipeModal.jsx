import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RecipeModal = ({ isOpen, onClose, recipe }) => {
    if (!recipe) return null;

    let steps = [];
    try {
        steps = JSON.parse(recipe).steps;
    } catch (error) {
        console.error("Failed to parse recipe JSON:", error);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white max-w-md mx-auto p-4 rounded-lg shadow-lg outline-none overflow-y-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            style={{
                content: {
                    maxHeight: "80vh", // 모달의 최대 높이 설정
                    overflowY: "auto", // 모달 내부 스크롤 활성화
                },
            }}
        >
            <h2 className="text-xl font-bold mb-4">레시피</h2>
            <div className="space-y-2">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 p-3 rounded-lg shadow-md"
                    >
                        <p className="font-semibold">Step {step.step}</p>
                        <p className="text-gray-700">{step.description}</p>
                    </div>
                ))}
            </div>
            <button
                onClick={onClose}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
                닫기
            </button>
        </Modal>
    );
};

export default RecipeModal;
