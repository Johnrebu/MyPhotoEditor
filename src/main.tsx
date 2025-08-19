import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PhotoGalleryApp from './PhotoGalleryApp'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PhotoGalleryApp />
  </StrictMode>
);
