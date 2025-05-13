import { useState, useEffect } from "react";
import close from "../../assets/close.svg";
import IconPickerModal from "../modals/IconPickerModal";
import ColorPickerModal from "../modals/ColorPickerModal";
import CustomColor from "../../assets/CustomColor.svg"; // อย่าลืม import ไอคอน CustomColor

const EditCategoryModal = ({
  editModalOpen,
  setEditModalOpen,
  editingCategory,
  colorOptions = [
    null, 
    "#F24726", "#FAA810", "#FEF445", "#CEE741",
    "#0CA789", "#2D9BF0", "#8948E1",
  ],
  iconOptions,
  saveCategory
}) => {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.name);
      setColor(editingCategory.color === undefined ? null : editingCategory.color);
      setSelectedIcon(editingCategory.icon);
    }
  }, [editingCategory]);

  if (!editModalOpen || !editingCategory) return null;

  const handleSave = () => {
    saveCategory({
      ...editingCategory,
      name: categoryName,
      color: color === null ? "#D3D3D3" : color,
      icon: selectedIcon
    });
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
  };


  const isHexColor = color?.startsWith('#');

  return (
    <>
      <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold">Edit Category</h3>
            <button 
              onClick={() => setEditModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <img src={close} alt="Close" className="w-6 h-6" />
            </button>
          </div>
          
          <div className="px-8 py-2">
            <div className="flex justify-between items-start mb-1">
              <div className="w-1/2 pr-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  disabled={editingCategory.name === "All"}
                  className={`w-full border border-black rounded py-2 px-3 ${
                    editingCategory.name === "All" ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              
              <div className="flex items-center justify-center">
                <div 
          className="w-24 h-24 rounded-full flex items-center justify-center border border-black cursor-pointer hover:opacity-80"
          style={{ 
            backgroundColor: color === null ? "#D3D3D3" : color,
            
          }}
                  onClick={() => {
                    if (editingCategory.name !== "All") {
                      setIconPickerOpen(true);
                    }
                  }}
                >
                  <img 
                    src={selectedIcon} 
                    alt="Category icon" 
                    className="w-14 h-14 object-contain" 
                  />
                </div>
              </div>
            </div>
            
            {/* Color Picker ส่วนที่เพิ่มเข้ามา */}
            <div className="mb-4">
              <p className="text-[16px] font-poppins font-bold">COLOR</p>
              <div className="flex gap-3 mt-2">
                {colorOptions.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`w-6 h-6 rounded-full ${color === c ? "ring-2 ring-black" : ""}`}
                    style={{ backgroundColor: c || "transparent", border: !c ? "1px dashed #9CA3AF" : "none" }}
                    onClick={() => handleColorSelect(c)}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setShowColorPickerModal(true)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <img src={CustomColor} alt="Custom Color" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
            <button
              onClick={() => setEditModalOpen(false)}
              className="px-6 py-1 bg-gray-200 border-1 border-black font-semibold rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-1 bg-[#E7FFAE] text-black font-semibold border-1 border-black rounded hover:bg-lime-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {iconPickerOpen && (
        <IconPickerModal
          icons={iconOptions}
          selectedIcon={selectedIcon}
          onSelect={(icon) => {
            setSelectedIcon(icon);
            setIconPickerOpen(false);
          }}
          onClose={() => setIconPickerOpen(false)}
        />
      )}

      {showColorPickerModal && (
        <ColorPickerModal
          currentColor={isHexColor ? color : ""}
          onSelect={(selectedColor) => {
            setColor(selectedColor);
            setShowColorPickerModal(false);
          }}
          onClose={() => setShowColorPickerModal(false)}
        />
      )}
    </>
  );
};

export default EditCategoryModal;