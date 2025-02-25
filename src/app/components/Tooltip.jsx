import React from 'react';

const Tooltip = ({ children, content }) => {
  return (
    <div className="relative group">
      {children}
      <div className="bg-gray-950 absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded-[5px] py-1.5 px-3.5 text-sm main-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-gray-950 absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45"></span>
        {content}
      </div>
    </div>
  );
};

export default Tooltip;