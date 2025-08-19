import React from 'react';
import { Search, X, Check, Menu } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSelectionMode: boolean;
  onToggleSelectionMode: () => void;
  selectedCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  isSelectionMode,
  onToggleSelectionMode,
  selectedCount = 0,
}) => {
  return (
    <>
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-4 flex-wrap gap-2">
        <div className="flex-1 relative">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 min-w-0">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent outline-none flex-1 text-gray-700 min-w-0"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange("")}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
        <div className="ml-2 sm:ml-4 flex space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            onClick={onToggleSelectionMode}
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
            {selectedCount} selected
          </p>
        </div>
      )}
    </>
  );
};

export default Header;