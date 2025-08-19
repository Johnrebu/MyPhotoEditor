import React from 'react';
import { Image, Layers, Edit3, User } from 'lucide-react';
import { TabType } from '../../types';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { name: "Gallery" as TabType, icon: Image },
    { name: "Albums" as TabType, icon: Layers },
    { name: "Editor" as TabType, icon: Edit3 },
    { name: "Profile" as TabType, icon: User },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-2 sm:px-4 py-2 flex justify-around items-center">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name)}
          className={`flex flex-col items-center py-2 px-3 transition-colors ${
            activeTab === tab.name ? "text-black" : "text-gray-500"
          }`}
        >
          <tab.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" strokeWidth="1.5" />
          <span className="text-xs font-medium hidden sm:block">{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;