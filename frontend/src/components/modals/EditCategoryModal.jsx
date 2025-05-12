import React from "react";
import close from "../../assets/close.svg";
import IconSelectorModal from "./IconSelectorModal";

export default function EditCategoryModal({
  editingCategory,
  editCategoryName,
  setEditCategoryName,
  editCategoryColor,
  setEditCategoryColor,
  editCategoryIcon,
  setEditCategoryIcon,
  colorOptions,
  iconOptions,
  iconSelectorOpen,
  setIconSelectorOpen,
  saveCategory,
  closeModal,
}) {
  if (!editingCategory) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold">Edit Category</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <img src={close} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              disabled={editingCategory.name === "All"}
              className={`w-full border border-black rounded py-2 px-3 ${editingCategory.name === "All" ? "bg-gray-100" : ""}`}
            />
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Color</label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map(color => (
                <div
                  key={color.id}
                  className={`w-8 h-8 rounded-full ${color.class} border border-black cursor-pointer hover:scale-110 transition-transform ${editCategoryColor === color.id ? "ring-2 ring-black ring-offset-2" : ""}`}
                  onClick={() => setEditCategoryColor(color.id)}
                ></div>
              ))}
            </div>
          </div>

          {/* Icon */}
          {editingCategory.name !== "All" && (
            <div className="mb-4">
              <div 
                className={`w-16 h-16 rounded-full ${editCategoryColor} flex items-center justify-center border border-black mx-auto cursor-pointer hover:opacity-80`}
                onClick={() => setIconSelectorOpen(true)}
              >
                <img src={editCategoryIcon} alt="Category icon" className="w-10 h-10" />
              </div>
            </div>
          )}

          {/* If "All" just show the icon */}
          {editingCategory.name === "All" && (
            <div className="mb-4">
              <div className={`w-16 h-16 rounded-full ${editCategoryColor} flex items-center justify-center border border-black mx-auto`}>
                <img src={editCategoryIcon} alt="Category icon" className="w-10 h-10" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={saveCategory} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
        </div>
      </div>

      {/* Nested Icon Selector */}
      {iconSelectorOpen && (
        <IconSelectorModal 
          iconOptions={iconOptions}
          selectedIcon={editCategoryIcon}
          onSelect={(icon) => {
            setEditCategoryIcon(icon);
            setIconSelectorOpen(false);
          }}
          onClose={() => setIconSelectorOpen(false)}
        />
      )}
    </div>
  );
}
