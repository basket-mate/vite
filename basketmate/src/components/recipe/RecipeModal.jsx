import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RecipeModal = ({ isOpen, onClose, recipe }) => {
    if (!recipe) return null;

    let steps = [];
    try {
        const parsedRecipe = JSON.parse(recipe);
        steps = parsedRecipe.steps.map((step, index) => ({
            step: `Step ${index + 1}`,
            description: step.description,
        }));
    } catch (error) {
        console.error("Failed to parse recipe JSON:", error);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white max-w-md mx-auto p-4 rounded-lg shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            style={{
                content: {
                    maxHeight: "80vh",
                    overflowY: "auto",
                },
            }}
        >
            <h2 className="text-xl font-bold mb-4">레시피</h2>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg shadow-md"
                    >
                        <p className="font-semibold text-gray-900">
                            {step.step}
                        </p>
                        <p className="text-gray-700 mt-1">{step.description}</p>
                    </div>
                ))}
            </div>
            <button
                onClick={onClose}
                className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
                닫기
            </button>
        </Modal>
    );
};

export default RecipeModal;
