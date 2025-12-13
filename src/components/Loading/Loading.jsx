import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <span className="loading loading-bars loading-xl"></span>
    </div>
  );
};

export default Loading;