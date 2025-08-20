import { useState, useEffect } from 'react';
import type { Photo } from '../types';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const mockPhotos = Array.from({ length: 24 }, (_, index) => ({
      id: index + 1,
      title: `Photo ${index + 1}`,
      url: `https://picsum.photos/300/300?random=${index + 1}`,
      date: new Date(
        Date.now() - Math.random() * 10000000000
      ).toLocaleDateString(),
      liked: Math.random() > 0.7,
      tags: ["nature", "landscape", "photo", "memories"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setPhotos(mockPhotos);
  }, []);

  const toggleLike = (photoId: number) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(photo =>
        photo.id === photoId ? { ...photo, liked: !photo.liked } : photo
      )
    );
  };

  const addPhoto = (newPhoto: Omit<Photo, 'id'>) => {
    const id = Math.max(...photos.map(p => p.id), 0) + 1;
    const photoWithId = { ...newPhoto, id };
    setPhotos(prevPhotos => [photoWithId, ...prevPhotos]);
  };

  return {
    photos,
    toggleLike,
    addPhoto,
  };
};