import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 md:p-6 text-white rounded-b-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white p-1 rounded-md shadow-md">
            {/* === College Logo inserted properly (rectangular) === */}
            <img src="https://cdn.discordapp.com/attachments/1353249878779756566/1365990822691999744/SRMcolor-min_1.png?ex=680f5197&is=680e0017&hm=5cf4794db6d758cadbbeba23e48e10f646c812a82d2924f1a4ee7ed1cb3670e2&" alt="SRM College Logo" className="h-16 w-auto object-contain" />
            {/* ================================================ */}
          </div>
          <div className="ml-4">
            <h1 className="text-xl md:text-2xl font-bold">Campus Navigator</h1>
            <p className="text-xs md:text-sm opacity-80">Find the optimal route across campus</p>
          </div>
        </div>

        <div className="text-center md:text-right">
          <h2 className="text-sm md:text-base font-semibold">SRM Institute of Science and Technology - Ramapuram</h2>
          <p className="text-xs opacity-80">Interactive Route Planning Tool</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
