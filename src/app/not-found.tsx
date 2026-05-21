import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
        <Link href="/" className="bg-primary text-white px-6 py-2 rounded">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}