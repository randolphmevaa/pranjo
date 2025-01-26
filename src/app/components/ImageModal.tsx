// src/app/components/ImageModal.tsx

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { HiX } from 'react-icons/hi';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, altText, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-11/12 max-w-3xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal closure on content click
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-brandGray rounded-full p-2 hover:bg-brandGreen transition-colors duration-300"
          aria-label="Close Modal"
        >
          <HiX className="w-6 h-6" />
        </button>
        <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 90vw,
                   (max-width: 1200px) 80vw,
                   60vw"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
