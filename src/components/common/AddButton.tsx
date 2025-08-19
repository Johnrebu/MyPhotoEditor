import React from 'react';
import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <div className="absolute bottom-24 right-6">
      <button
        onClick={onClick}
        className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105 active:scale-95"
      >
        <Plus className="w-7 h-7 text-white" strokeWidth="2.5" />
      </button>
    </div>
  );
};

export default AddButton;