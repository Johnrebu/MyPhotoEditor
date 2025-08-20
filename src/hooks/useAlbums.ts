import { useState } from 'react';
import type { Album } from '../types';

export const useAlbums = () => {
  const [albums] = useState<Album[]>([
    {
      id: 1,
      name: "Recent",
      count: 127,
      cover: "https://picsum.photos/300/300?random=1",
    },
    {
      id: 2,
      name: "Favorites",
      count: 23,
      cover: "https://picsum.photos/300/300?random=2",
    },
    {
      id: 3,
      name: "Screenshots",
      count: 45,
      cover: "https://picsum.photos/300/300?random=3",
    },
    {
      id: 4,
      name: "Vacation 2024",
      count: 89,
      cover: "https://picsum.photos/300/300?random=4",
    },
  ]);

  return { albums };
};