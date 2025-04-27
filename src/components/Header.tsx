
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#0066CC] to-[#003366] p-4 md:p-6 text-white rounded-b-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white p-1 rounded-full">
            <div className="bg-[#0066CC] rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <h1 className="text-xl md:text-2xl font-bold">SRM Campus Navigator</h1>
            <p className="text-xs md:text-sm opacity-80">Find the optimal route across campus</p>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <h2 className="text-sm md:text-base font-semibold">SRM University</h2>
          <p className="text-xs opacity-80">Interactive Route Planning Tool</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
