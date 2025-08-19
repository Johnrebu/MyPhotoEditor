import React from 'react';

const StatusBar: React.FC = () => {
  return (
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
  );
};

export default StatusBar;