import React from 'react';
import { X, Camera, Upload, FolderPlus } from 'lucide-react';

interface AddPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onUploadPhoto: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddPhotoModal: React.FC<AddPhotoModalProps> = ({
  isOpen,
  onClose,
  onTakePhoto,
  onUploadPhoto,
}) => {
  if (!isOpen) return null;

  const handleCreateAlbum = () => {
    onClose();
    alert("Create Album feature coming soon!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-t-2xl p-6 transform transition-transform">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Add Photo</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={onTakePhoto}
            className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Take Photo</h4>
              <p className="text-sm text-gray-500">Use camera to capture</p>
            </div>
          </button>

          <label className="w-full flex items-center space-x-4 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Upload Photos</h4>
              <p className="text-sm text-gray-500">Select from device</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onUploadPhoto}
              className="hidden"
            />
          </label>

          <button
            onClick={handleCreateAlbum}
            className="w-full flex items-center space-x-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <FolderPlus className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Create Album</h4>
              <p className="text-sm text-gray-500">New photo album</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhotoModal;