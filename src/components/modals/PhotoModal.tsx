import React from 'react';
import { X, Heart, Share, Download } from 'lucide-react';
import type { Photo } from '../../types';

interface PhotoModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
  onToggleLike: (photoId: number) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  isOpen,
  onClose,
  onToggleLike,
}) => {
  if (!isOpen) return null;

  const handleShare = () => {
    alert('Share feature coming soon!');
  };

  const handleDownload = () => {
    alert('Download feature coming soon!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-6 left-6 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="absolute top-6 right-6 flex space-x-3 z-10">
          <button
            onClick={() => onToggleLike(photo.id)}
            className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
          >
            <Heart
              className={`w-6 h-6 ${
                photo.liked
                  ? "text-red-500 fill-current"
                  : "text-white"
              }`}
            />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
          >
            <Share className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={handleDownload}
            className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
          >
            <Download className="w-6 h-6 text-white" />
          </button>
        </div>
        <img
          src={photo.url}
          alt={photo.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default PhotoModal;