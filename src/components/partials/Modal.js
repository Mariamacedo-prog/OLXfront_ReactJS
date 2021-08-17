import React from "react";

const Modal = ({ open, children, onClose, user }) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
      <div className="fixed left-1/4 top-0.5 bg-gray-50 -translate-y-1/2 -translate-x-1/2 z-50">
        <img
          src="https://img.icons8.com/material-rounded/24/000000/close-window.png"
          alt="close_popup"
          onClick={onClose}
        />
        {children}
      </div>
    </>
  );
};

export default Modal;
