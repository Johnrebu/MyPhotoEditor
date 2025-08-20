import React from 'react';
import type { Album } from '../../types';

interface AlbumCardProps {
  album: Album;
  onClick?: (album: Album) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  return (
    <div
      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={() => onClick?.(album)}
    >
      <img
        src={album.cover}
        alt={album.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{album.name}</h3>
        <p className="text-sm text-gray-500">{album.count} photos</p>
      </div>
    </div>
  );
};

export default AlbumCard;