import React from "react";
import useAppProvider from "../Hooks/useAppProvider";

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useAppProvider();
  return (
    <div className={`modal-container ${isModalOpen && "isOpen"}`}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>
          You Answered {((correct / questions.length) * 100).toFixed(0)}% of
          Question correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
