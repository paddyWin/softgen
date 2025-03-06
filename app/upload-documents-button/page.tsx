'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ModalLayout from '../layouts/ModalLayout';

export default function UploadDocumentsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      // Hier zou de echte upload logica komen
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFiles([]);
      alert('Documenten succesvol geüpload!');
    } catch (error) {
      alert('Er is een fout opgetreden tijdens het uploaden.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalLayout>
      <div className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M24 14v14m7-7H17m21 1a10 10 0 11-20 0 10 10 0 0120 0z"
              />
            </svg>
            <p className="text-gray-600">
              {isDragActive
                ? 'Laat de bestanden hier los...'
                : 'Sleep bestanden hierheen of klik om te selecteren'}
            </p>
            <p className="text-sm text-gray-500">
              PDF, JPG, PNG (max. 10MB per bestand)
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Geselecteerde bestanden:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    onClick={() => {
                      setFiles((prev) => prev.filter((_, i) => i !== index));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`w-full py-2 px-4 rounded-md text-white ${
                uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {uploading ? 'Bezig met uploaden...' : 'Upload Bestanden'}
            </button>
          </div>
        )}
      </div>
    </ModalLayout>
  );
} 