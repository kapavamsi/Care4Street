'use client';

import { useState } from 'react';

interface ImageViewerProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export default function ImageViewer({ imageUrl, alt, className = '' }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!imageUrl || imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <span className="text-gray-400 text-xs text-center p-2">
          🖼️<br />No Image
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail */}
      <div 
        className={`cursor-pointer hover:opacity-80 transition-opacity rounded-lg overflow-hidden ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={imageUrl} 
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Full-size Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕ Close
            </button>
            <img 
              src={imageUrl} 
              alt={alt}
              className="w-full h-full object-contain rounded-lg"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </>
  );
}
