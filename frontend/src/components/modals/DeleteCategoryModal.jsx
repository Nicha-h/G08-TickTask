import React from "react";
import close from "../../assets/close.svg";

export default function DeleteCategoryModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
        <div className="flex justify-end pt-2 pr-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <img src={close} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-6 text-center">
          <h3 className="text-xl font-bold mb-4">Delete this Category?</h3>
          <p className="mb-6 text-lg">It will be gone forever!</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-300 rounded-md border border-black hover:bg-gray-400 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-3 bg-red-400 rounded-md border border-black hover:bg-red-500 font-medium"
            >
              Yes, delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
