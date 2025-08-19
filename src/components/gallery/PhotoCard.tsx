import React from 'react';
import { Check, Heart } from 'lucide-react';
import { Photo } from '../../types';

interface PhotoCardProps {
  photo: Photo;
  isSelected: boolean;
  isSelectionMode: boolean;
  onSelect: (photoId: number) => void;
  onOpen: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  isSelected,
  isSelectionMode,
  onSelect,
  onOpen,
}) => {
  const handleClick = () => {
    if (isSelectionMode) {
      onSelect(photo.id);
    } else {
      onOpen(photo);
    }
  };

  return (
    <div
      className="relative aspect-square cursor-pointer group"
      onClick={handleClick}
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />
      {isSelectionMode && (
        <div
          className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected
              ? "bg-blue-500 border-blue-500"
              : "bg-white bg-opacity-70 border-white"
          }`}
        >
          {isSelected && (
            <Check className="w-4 h-4 text-white" />
          )}
        </div>
      )}
      {photo.liked && !isSelectionMode && (
        <Heart className="absolute top-2 right-2 w-5 h-5 text-red-500 fill-current" />
      )}
    </div>
  );
};

export default PhotoCard;