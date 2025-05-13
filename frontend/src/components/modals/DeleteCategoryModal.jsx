import close from "../../assets/close.svg";

const DeleteCategoryModal = ({ 
  deleteModalOpen, 
  setDeleteModalOpen, 
  confirmDeleteCategory 
}) => {
  if (!deleteModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
        <div className="flex justify-end pt-2 pr-2">
          <button 
            onClick={() => setDeleteModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <img src={close} alt="Close" className="w-6 h-6 mt-2" />
          </button>
        </div>
      
        <div className="px-6 pb-5 text-center">
          <h3 className="text-xl font-bold mb-3">Delete this Category?</h3>
          <div className="w-full my-3 border-t border-gray-300"></div>
          <p className="mb-3 text-lg">it will be gone forever!</p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-7 py-2 bg-gray-200 rounded-md border border-black hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteCategory}
              className="px-7 py-2 bg-red-400 rounded-md border border-black hover:bg-red-500 font-semibold"
            >
              Yes, delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
