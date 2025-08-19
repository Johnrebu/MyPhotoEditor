import React from 'react';
import { User } from 'lucide-react';

interface ProfilePanelProps {
  photoCount: number;
  albumCount: number;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ photoCount, albumCount }) => {
  return (
    <div className="px-4 mb-20 max-w-md mx-auto">
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Your Gallery</h3>
        <p className="text-gray-500 mb-6">
          {photoCount} photos • {albumCount} albums
        </p>
        <div className="space-y-3">
          <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Sync Photos
          </button>
          <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;