import React from 'react';
import { AlertCircle, Ghost } from 'lucide-react';
import { IStatus } from '../../../types/screens';

export default function StatusMessage({ type, message }: IStatus) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
      {type === 'empty' ? (
        <Ghost size={64} className="text-gray-500 mb-4" />
      ) : (
        <AlertCircle size={64} className="text-red-500 mb-4" />
      )}
      <h2 className="text-xl font-bold text-gray-300">{message}</h2>
    </div>
  );
}