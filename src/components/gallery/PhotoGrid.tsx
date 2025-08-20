import React from 'react';
import PhotoCard from './PhotoCard';
import type { Photo } from '../../types';

interface PhotoGridProps {
  photos: Photo[];
  selectedPhotos: number[];
  isSelectionMode: boolean;
  onPhotoSelect: (photoId: number) => void;
  onPhotoOpen: (photo: Photo) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  selectedPhotos,
  isSelectionMode,
  onPhotoSelect,
  onPhotoOpen,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-20 px-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isSelected={selectedPhotos.includes(photo.id)}
          isSelectionMode={isSelectionMode}
          onSelect={onPhotoSelect}
          onOpen={onPhotoOpen}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;