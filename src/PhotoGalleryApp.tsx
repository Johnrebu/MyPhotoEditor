import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Image,
  Layers,
  Edit3,
  User,
  Check,
  Menu,
  X,
  Heart,
  Share,
  Download,
  Camera,
  Upload,
  FolderPlus,
  RotateCcw,
} from "lucide-react";

type Photo = {
  id: number;
  title: string;
  url: string;
  date: string;
  liked: boolean;
  tags: string;
};

type Album = {
  id: number;
  name: string;
  count: number;
  cover: string;
};

type EditorFilters = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
};

const PhotoGalleryApp = () => {
  const [activeTab, setActiveTab] = useState<string>("Gallery");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
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
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [editorFilters, setEditorFilters] = useState<EditorFilters>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
  });

  // Initialize photos
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

  // Filter photos based on search
  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const openPhoto = (photo: Photo) => {
    if (!isSelectionMode) {
      setCurrentPhoto(photo);
      setShowPhotoModal(true);
    }
  };

  const toggleLike = (photoId: number) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === photoId ? { ...photo, liked: !photo.liked } : photo
      )
    );
  };

  const addNewPhoto = (type: "camera" | "upload") => {
    if (type === "camera") {
      setShowCamera(true);
      setShowAddModal(false);
      return;
    }

    const newPhotoId = Math.max(...photos.map((p) => p.id), 0) + 1;
    const newPhoto = {
      id: newPhotoId,
      title: `Upload ${newPhotoId}`,
      url: `https://picsum.photos/300/300?random=${newPhotoId + 100}`,
      date: new Date().toLocaleDateString(),
      liked: false,
      tags: "upload",
    };

    setPhotos([newPhoto, ...photos]);
    setShowAddModal(false);
  };

  const capturePhoto = () => {
    const newPhotoId = Math.max(...photos.map((p) => p.id), 0) + 1;
    const newPhoto = {
      id: newPhotoId,
      title: `Camera ${newPhotoId}`,
      url: `https://picsum.photos/400/600?random=${newPhotoId + 200}`,
      date: new Date().toLocaleDateString(),
      liked: false,
      tags: "camera",
    };

    setPhotos([newPhoto, ...photos]);
    setShowCamera(false);

    setTimeout(() => {
      alert("Photo captured successfully!");
    }, 300);
  };

  const openEditor = (photo: Photo) => {
    setEditingPhoto(photo);
    setShowEditor(true);
    setEditorFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      grayscale: 0,
    });
  };

  const applyEditorChanges = () => {
    if (editingPhoto) {
      alert("Filters applied successfully!");
      setShowEditor(false);
      setEditingPhoto(null);
    }
  };

  const resetEditorFilters = () => {
    setEditorFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      grayscale: 0,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhotoId = Math.max(...photos.map((p) => p.id), 0) + 1 + index;
        const newPhoto = {
          id: newPhotoId,
          title: file.name.split(".")[0] || `Upload ${newPhotoId}`,
          url: e.target?.result as string,
          date: new Date().toLocaleDateString(),
          liked: false,
          tags: "upload",
        };
        setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
      };
      reader.readAsDataURL(file);
    });
    setShowAddModal(false);
  };

  const PhotoGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-20 px-4">
      {filteredPhotos.map((photo) => (
        <div
          key={photo.id}
          className="relative aspect-square cursor-pointer group"
          onClick={() =>
            isSelectionMode ? togglePhotoSelection(photo.id) : openPhoto(photo)
          }
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
                selectedPhotos.includes(photo.id)
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white bg-opacity-70 border-white"
              }`}
            >
              {selectedPhotos.includes(photo.id) && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
          )}
          {photo.liked && !isSelectionMode && (
            <Heart className="absolute top-2 right-2 w-5 h-5 text-red-500 fill-current" />
          )}
        </div>
      ))}
    </div>
  );

  const AlbumsGrid = () => (
    <div className="px-4 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <img
              src={album.cover}
              alt={album.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{album.name}</h3>
              <p className="text-sm text-gray-500">{album.count} photos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EditorPanel = () => (
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
              onClick={() => openEditor(photo)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
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

  const ProfilePanel = () => (
    <div className="px-4 mb-20 max-w-md mx-auto">
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Your Gallery</h3>
        <p className="text-gray-500 mb-6">
          {photos.length} photos • {albums.length} albums
        </p>
        <div className="space-y-3">
          <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">
            Sync Photos
          </button>
          <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium">
            Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Gallery":
        return <PhotoGrid />;
      case "Albums":
        return <AlbumsGrid />;
      case "Editor":
        return <EditorPanel />;
      case "Profile":
        return <ProfilePanel />;
      default:
        return <PhotoGrid />;
    }
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto bg-white min-h-screen flex flex-col relative">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-2 text-black font-medium">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
          <svg className="w-4 h-4 ml-1" fill="black" viewBox="0 0 24 24">
            <path d="M1 3h22v2H1V3zm0 4h22v2H1V7zm0 4h22v2H1v-2z" />
          </svg>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-full bg-black rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 flex-wrap gap-2">
        <div className="flex-1 relative">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 min-w-0">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-gray-700 min-w-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
        <div className="ml-2 sm:ml-4 flex space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            onClick={toggleSelectionMode}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isSelectionMode
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Check className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Menu className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Selection Header */}
      {isSelectionMode && (
        <div className="px-4 py-2 bg-blue-50 border-b">
          <p className="text-blue-600 font-medium">
            {selectedPhotos.length} selected
          </p>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>

      {/* Add Button */}
      <div className="absolute bottom-24 right-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-7 h-7 text-white" strokeWidth="2.5" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-2 sm:px-4 py-2 flex justify-around items-center">
        {[
          { name: "Gallery", icon: Image },
          { name: "Albums", icon: Layers },
          { name: "Editor", icon: Edit3 },
          { name: "Profile", icon: User },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center py-2 px-3 transition-colors ${
              activeTab === tab.name ? "text-black" : "text-gray-500"
            }`}
          >
            <tab.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" strokeWidth="1.5" />
            <span className="text-xs font-medium hidden sm:block">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Photo Modal */}
      {showPhotoModal && currentPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-6 left-6 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="absolute top-6 right-6 flex space-x-3 z-10">
              <button
                onClick={() => toggleLike(currentPhoto.id)}
                className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
              >
                <Heart
                  className={`w-6 h-6 ${
                    currentPhoto.liked
                      ? "text-red-500 fill-current"
                      : "text-white"
                  }`}
                />
              </button>
              <button className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Share className="w-6 h-6 text-white" />
              </button>
              <button className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </button>
            </div>
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Camera Header */}
          <div className="flex justify-between items-center p-6 text-white">
            <button
              onClick={() => setShowCamera(false)}
              className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-medium">Camera</h3>
            <div className="w-10 h-10"></div>
          </div>

          {/* Camera Viewfinder */}
          <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Camera Preview</p>
                <p className="text-sm opacity-75">
                  Tap the button below to capture
                </p>
              </div>
            </div>

            {/* Camera Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full border-2 border-white border-opacity-20">
                <div className="w-full h-1/3 border-b border-white border-opacity-20"></div>
                <div className="w-full h-1/3 border-b border-white border-opacity-20"></div>
              </div>
              <div className="absolute inset-0">
                <div className="w-1/3 h-full border-r border-white border-opacity-20 float-left"></div>
                <div className="w-1/3 h-full border-r border-white border-opacity-20 float-left"></div>
              </div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="p-6 bg-black">
            <div className="flex justify-center items-center">
              <button
                onClick={capturePhoto}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95"
              >
                <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Editor Modal */}
      {showEditor && editingPhoto && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Editor Header */}
          <div className="flex justify-between items-center p-4 bg-black text-white">
            <button
              onClick={() => setShowEditor(false)}
              className="px-4 py-2 text-white"
            >
              Cancel
            </button>
            <h3 className="text-lg font-medium">Edit Photo</h3>
            <button
              onClick={applyEditorChanges}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>

          {/* Photo Preview */}
          <div className="flex-1 bg-black flex items-center justify-center p-4">
            <img
              src={editingPhoto.url}
              alt={editingPhoto.title}
              className="max-w-full max-h-full object-contain"
              style={{
                filter: `brightness(${editorFilters.brightness}%) contrast(${editorFilters.contrast}%) saturate(${editorFilters.saturation}%) blur(${editorFilters.blur}px) grayscale(${editorFilters.grayscale}%)`,
              }}
            />
          </div>

          {/* Editor Controls */}
          <div className="bg-gray-900 text-white p-4 max-h-64 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Adjustments</h4>
              <button
                onClick={resetEditorFilters}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-lg text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">Brightness</label>
                  <span className="text-sm text-gray-400">
                    {editorFilters.brightness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={editorFilters.brightness}
                  onChange={(e) =>
                    setEditorFilters({
                      ...editorFilters,
                      brightness: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">Contrast</label>
                  <span className="text-sm text-gray-400">
                    {editorFilters.contrast}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={editorFilters.contrast}
                  onChange={(e) =>
                    setEditorFilters({
                      ...editorFilters,
                      contrast: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">Saturation</label>
                  <span className="text-sm text-gray-400">
                    {editorFilters.saturation}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={editorFilters.saturation}
                  onChange={(e) =>
                    setEditorFilters({
                      ...editorFilters,
                      saturation: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">Blur</label>
                  <span className="text-sm text-gray-400">
                    {editorFilters.blur}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={editorFilters.blur}
                  onChange={(e) =>
                    setEditorFilters({
                      ...editorFilters,
                      blur: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">Grayscale</label>
                  <span className="text-sm text-gray-400">
                    {editorFilters.grayscale}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editorFilters.grayscale}
                  onChange={(e) =>
                    setEditorFilters({
                      ...editorFilters,
                      grayscale: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-t-2xl p-6 transform transition-transform">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Add Photo</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => addNewPhoto("camera")}
                className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">Take Photo</h4>
                  <p className="text-sm text-gray-500">Use camera to capture</p>
                </div>
              </button>

              <label className="w-full flex items-center space-x-4 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">Upload Photos</h4>
                  <p className="text-sm text-gray-500">Select from device</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  setShowAddModal(false);
                  alert("Create Album feature coming soon!");
                }}
                className="w-full flex items-center space-x-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <FolderPlus className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">Create Album</h4>
                  <p className="text-sm text-gray-500">New photo album</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryApp;
