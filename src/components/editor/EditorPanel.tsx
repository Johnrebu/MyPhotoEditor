import React from 'react';
import { Edit3 } from 'lucide-react';
import type { Photo } from '../../types';

interface EditorPanelProps {
  photos: Photo[];
  onPhotoSelect: (photo: Photo) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ photos, onPhotoSelect }) => {
  return (
    <div className="px-4 mb-20 max-w-4xl mx-auto">
      <div className="text-center py-8">
        <Edit3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">Photo Editor</h3>
        <p className="text-gray-500 mb-6">Select a photo to start editing</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {photos.slice(0, 6).map((photo) => (
            <div
              key={photo.id}
              className="aspect-square cursor-pointer group relative"
              onClick={() => onPhotoSelect(photo)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all">
                <Edit3 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;