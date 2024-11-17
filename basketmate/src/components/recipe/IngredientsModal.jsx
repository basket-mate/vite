import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const IngredientsModal = ({ isOpen, onClose, mainIngredients, seasoning }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white max-w-md mx-auto p-4 rounded-lg shadow-lg outline-none overflow-y-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            style={{
                content: {
                    maxHeight: "80vh",
                    overflowY: "auto",
                },
            }}
        >
            <h2 className="text-xl font-bold mb-4">재료목록</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">주재료</h3>
                    <ul className="list-disc list-inside">
                        {mainIngredients.map((item, index) => (
                            <li key={index}>{item.ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">양념</h3>
                    <ul className="list-disc list-inside">
                        {seasoning.map((item, index) => (
                            <li key={index}>{item.ingredient}</li>
                        ))}
                    </ul>
                </div>
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

export default IngredientsModal;
