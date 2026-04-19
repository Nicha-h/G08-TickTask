import { useState } from "react";
import close from "../../assets/close.svg";
import IconPickerModal from "../modals/IconPickerModal";
import CustomColor from "../../assets/CustomColor.svg";
import ColorPickerModal from "../modals/ColorPickerModal";
import { apiClient } from "../../util/apiClient";
import { iconComponents } from "./icon";
import ErrorBox from "../../components/ErrorBox";
const AddCategoryModal = ({
  addModalOpen,
  setAddModalOpen,
  colorOptions = [
    null, 
    "#F24726", "#FAA810", "#FEF445", "#CEE741",
    "#0CA789", "#2D9BF0", "#8948E1",
  ],
  iconOptions,
  saveNewCategory,
  existingCategories,
}) => {
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setCategoryName("");
    setSelectedColor(null);
    setSelectedIcon("");
  };

  const handleSave = async () => {
    if (!categoryName) {
      setErrorMessage("Please enter a category name.");
      return;
    }

    const isDuplicate = existingCategories.some(
      (cat) => {
        const catName = cat.name || cat.Category_Name || cat.category_name || '';
        return catName.trim().toLowerCase() === categoryName.trim().toLowerCase();
      }
    );
    if (isDuplicate) {
      setErrorMessage("This category name already exists. Please choose another name.");
      return;
    }

    const newCategoryData = {
      Category_Name: categoryName,
      Category_Color: selectedColor === null ? "#D3D3D3" : selectedColor,
      Category_Icon: selectedIcon || "iconSmile",
      Category_is_Primary: colorOptions.includes(selectedColor)
    };

    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post('/api/category', newCategoryData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      saveNewCategory(response.data);
      resetForm();
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error creating category:", error);
      setErrorMessage("Something went wrong while creating the category. Please try again later or contact support if the issue persists.");
    }
  };

  if (!addModalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold">New Category</h3>
            <button
              onClick={() => {
                setAddModalOpen(false);
                resetForm();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <img src={close} alt="Close" className="w-6 h-6" />
            </button>
          </div>

          <div className="px-8 py-2">
            <div className="flex justify-between items-start mb-3">
              {/* Category Name */}
              <div className="w-1/2 pr-4">
                <label className="block text-[16px] font-bold mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Whats your category name?"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full border border-black rounded py-2 px-3 text-sm placeholder-gray-400"
                />
              </div>

              {/* Icon Selector */}
              <div className="flex items-center justify-center">
                <div
                  style={selectedColor ? { backgroundColor: selectedColor } : {}}
                  className={`w-24 h-24 rounded-full flex items-center justify-center border border-black cursor-pointer hover:opacity-80 ${
                    !selectedColor ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setIconSelectorOpen(true)}
                >
                  {selectedIcon ? (
                    <img
                      src={iconComponents[selectedIcon]}
                      alt="Category icon"
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <img 
                      src={iconComponents.iconSmile} 
                      alt="Select icon" 
                      className="w-10 h-10 object-contain" 
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Color Picker */}
            <div className="mb-4">
              <p className="text-[16px] font-poppins font-bold">COLOR</p>
              <div className="flex gap-3 mt-2">
                {colorOptions.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`w-6 h-6 rounded-full ${
                      (selectedColor === c || (!selectedColor && idx === 0)) ? "ring-2 ring-black" : ""
                    }`}
                    style={{
                      backgroundColor: c || "transparent",
                      border: !c ? "1px dashed #9CA3AF" : "none",
                    }}
                    onClick={() => setSelectedColor(c)}
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
              onClick={() => {
                setAddModalOpen(false);
                resetForm();
              }}
              className="px-6 py-1 bg-gray-200 border border-black font-semibold rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-1 bg-[#E7FFAE] text-black font-semibold border border-black rounded hover:bg-lime-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Icon Selector Modal */}
      {iconSelectorOpen && (
        <IconPickerModal
          icons={iconOptions}
          selectedIcon={selectedIcon}
          onSelect={(icon) => {
            setSelectedIcon(icon);
            setIconSelectorOpen(false);
          }}
          onClose={() => setIconSelectorOpen(false)}
        />
      )}

      {/* Color Picker Modal */}
      {showColorPickerModal && (
        <ColorPickerModal
          currentColor={selectedColor || colorOptions[0]}
          onSelect={(color) => {
            setSelectedColor(color);
            setShowColorPickerModal(false);
          }}
          onClose={() => setShowColorPickerModal(false)}
        />
      )}

      {/* Error Box Modal */}
      {errorMessage && (
        <ErrorBox
          errorMessage={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </>
  );
};

export default AddCategoryModal;