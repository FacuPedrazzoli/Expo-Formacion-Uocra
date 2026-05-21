'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Algo salió mal</h1>
        <p className="text-gray-600 mb-6">Hubo un error inesperado. Por favor, intentá de nuevo.</p>
        <button onClick={reset} className="bg-primary text-white px-6 py-2 rounded">
          Reintentar
        </button>
      </div>
    </div>
  );
}