import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Photo, EditorFilters } from '../../types';

interface PhotoEditorModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  photo,
  isOpen,
  onClose,
  onSave,
}) => {
  const [filters, setFilters] = useState<EditorFilters>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
  });

  if (!isOpen || !photo) return null;

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      grayscale: 0,
    });
  };

  const handleSave = () => {
    onSave();
    resetFilters();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Editor Header */}
      <div className="flex justify-between items-center p-4 bg-black text-white">
        <button
          onClick={onClose}
          className="px-4 py-2 text-white"
        >
          Cancel
        </button>
        <h3 className="text-lg font-medium">Edit Photo</h3>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Save
        </button>
      </div>

      {/* Photo Preview */}
      <div className="flex-1 bg-black flex items-center justify-center p-4">
        <img
          src={photo.url}
          alt={photo.title}
          className="max-w-full max-h-full object-contain"
          style={{
            filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) blur(${filters.blur}px) grayscale(${filters.grayscale}%)`,
          }}
        />
      </div>

      {/* Editor Controls */}
      <div className="bg-gray-900 text-white p-4 max-h-64 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Adjustments</h4>
          <button
            onClick={resetFilters}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-lg text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm">Brightness</label>
              <span className="text-sm text-gray-400">
                {filters.brightness}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.brightness}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  brightness: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm">Contrast</label>
              <span className="text-sm text-gray-400">
                {filters.contrast}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.contrast}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  contrast: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm">Saturation</label>
              <span className="text-sm text-gray-400">
                {filters.saturation}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.saturation}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  saturation: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm">Blur</label>
              <span className="text-sm text-gray-400">
                {filters.blur}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={filters.blur}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  blur: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm">Grayscale</label>
              <span className="text-sm text-gray-400">
                {filters.grayscale}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.grayscale}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  grayscale: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditorModal;