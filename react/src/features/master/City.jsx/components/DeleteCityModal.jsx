import React from "react";

const DeleteCityModal = ({ message, onDelete, onClose }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center z-50 justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-[350px]">
          <p className="text-gray-600 mb-6">{message}</p>{" "}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-300 text-white hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500 hover:text-white cursor-pointer"
              onClick={onDelete}
            >
              {" "}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCityModal;
