import React from 'react';
import { X, Camera } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Camera Header */}
      <div className="flex justify-between items-center p-6 text-white">
        <button
          onClick={onClose}
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-lg font-medium">Camera</h3>
        <div className="w-10 h-10"></div>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="w-20 h-20 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">Camera Preview</p>
            <p className="text-sm opacity-75">
              Tap the button below to capture
            </p>
          </div>
        </div>

        {/* Camera Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full border-2 border-white border-opacity-20">
            <div className="w-full h-1/3 border-b border-white border-opacity-20"></div>
            <div className="w-full h-1/3 border-b border-white border-opacity-20"></div>
          </div>
          <div className="absolute inset-0">
            <div className="w-1/3 h-full border-r border-white border-opacity-20 float-left"></div>
            <div className="w-1/3 h-full border-r border-white border-opacity-20 float-left"></div>
          </div>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="p-6 bg-black">
        <div className="flex justify-center items-center">
          <button
            onClick={onCapture}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95"
          >
            <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;