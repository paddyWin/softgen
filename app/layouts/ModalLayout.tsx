'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ModalLayoutProps {
  children: React.ReactNode;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 md:mx-0">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Document Upload</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout; 