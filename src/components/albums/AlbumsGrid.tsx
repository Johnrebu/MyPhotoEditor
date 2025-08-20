import React from 'react';
import AlbumCard from './AlbumCard';
import type { Album } from '../../types';

interface AlbumsGridProps {
  albums: Album[];
  onAlbumClick?: (album: Album) => void;
}

const AlbumsGrid: React.FC<AlbumsGridProps> = ({ albums, onAlbumClick }) => {
  return (
    <div className="px-4 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onClick={onAlbumClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumsGrid;