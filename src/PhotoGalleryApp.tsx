import React, { useState } from "react";
import type { Photo, TabType } from "./types";
import { usePhotos } from "./hooks/usePhotos";
import { useAlbums } from "./hooks/useAlbums";

// Components
import StatusBar from "./components/common/StatusBar";
import Header from "./components/common/Header";
import BottomNavigation from "./components/common/BottomNavigation";
import AddButton from "./components/common/AddButton";
import PhotoGrid from "./components/gallery/PhotoGrid";
import AlbumsGrid from "./components/albums/AlbumsGrid";
import EditorPanel from "./components/editor/EditorPanel";
import ProfilePanel from "./components/profile/ProfilePanel";
import PhotoModal from "./components/modals/PhotoModal";
import AddPhotoModal from "./components/modals/AddPhotoModal";
import CameraModal from "./components/modals/CameraModal";
import PhotoEditorModal from "./components/modals/PhotoEditorModal";

const PhotoGalleryApp = () => {
  // State management
  const [activeTab, setActiveTab] = useState<TabType>("Gallery");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  
  // Modal states
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  // Custom hooks
  const { photos, toggleLike, addPhoto } = usePhotos();
  const { albums } = useAlbums();

  // Filter photos based on search
  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Photo selection handlers
  const togglePhotoSelection = (photoId: number) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (!isSelectionMode) {
      setSelectedPhotos([]);
    }
  };

  // Photo modal handlers
  const openPhoto = (photo: Photo) => {
    if (!isSelectionMode) {
      setCurrentPhoto(photo);
      setShowPhotoModal(true);
    }
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
    setCurrentPhoto(null);
  };

  // Add photo handlers
  const handleTakePhoto = () => {
    setShowCamera(true);
    setShowAddModal(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          title: file.name.split(".")[0] || `Upload ${Date.now() + index}`,
          url: e.target?.result as string,
          date: new Date().toLocaleDateString(),
          liked: false,
          tags: "upload",
        };
        addPhoto(newPhoto);
      };
      reader.readAsDataURL(file);
    });
    setShowAddModal(false);
  };

  const capturePhoto = () => {
    const newPhoto = {
      title: `Camera ${Date.now()}`,
      url: `https://picsum.photos/400/600?random=${Date.now()}`,
      date: new Date().toLocaleDateString(),
      liked: false,
      tags: "camera",
    };

    addPhoto(newPhoto);
    setShowCamera(false);

    setTimeout(() => {
      alert("Photo captured successfully!");
    }, 300);
  };

  // Editor handlers
  const openEditor = (photo: Photo) => {
    setEditingPhoto(photo);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingPhoto(null);
  };

  const applyEditorChanges = () => {
    alert("Filters applied successfully!");
    closeEditor();
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Gallery":
        return (
          <PhotoGrid
            photos={filteredPhotos}
            selectedPhotos={selectedPhotos}
            isSelectionMode={isSelectionMode}
            onPhotoSelect={togglePhotoSelection}
            onPhotoOpen={openPhoto}
          />
        );
      case "Albums":
        return <AlbumsGrid albums={albums} />;
      case "Editor":
        return <EditorPanel photos={photos} onPhotoSelect={openEditor} />;
      case "Profile":
        return <ProfilePanel photoCount={photos.length} albumCount={albums.length} />;
      default:
        return (
          <PhotoGrid
            photos={filteredPhotos}
            selectedPhotos={selectedPhotos}
            isSelectionMode={isSelectionMode}
            onPhotoSelect={togglePhotoSelection}
            onPhotoOpen={openPhoto}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto bg-white min-h-screen flex flex-col relative">
      <StatusBar />
      
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSelectionMode={isSelectionMode}
        onToggleSelectionMode={toggleSelectionMode}
        selectedCount={selectedPhotos.length}
      />

      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      <AddButton onClick={() => setShowAddModal(true)} />

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Modals */}
      {currentPhoto && (
        <PhotoModal
          photo={currentPhoto}
          isOpen={showPhotoModal}
          onClose={closePhotoModal}
          onToggleLike={toggleLike}
        />
      )}

      <AddPhotoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onTakePhoto={handleTakePhoto}
        onUploadPhoto={handleFileUpload}
      />

      <CameraModal
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={capturePhoto}
      />

      <PhotoEditorModal
        photo={editingPhoto}
        isOpen={showEditor}
        onClose={closeEditor}
        onSave={applyEditorChanges}
      />
    </div>
  );
};

export default PhotoGalleryApp;