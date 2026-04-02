'use client';

export default function ProximamenteBanner() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] via-[#124565] to-[#0d1b2a]">
      <div className="text-center px-6 py-16 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-[#56bcb8] mb-6">
          PRÓXIMAMENTE
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          ¡Estamos preparando algo especial para vos!
        </p>
        <div className="flex justify-center gap-4 text-4xl mb-8">
          <span>🔨</span>
          <span>🏗️</span>
          <span>⚙️</span>
        </div>
        <p className="text-lg text-white/80 italic mb-8">
          Para vos, tu familia y amigos
        </p>
        <div className="border-t border-[#56bcb8]/30 pt-6">
          <p className="text-[#e2c048] font-semibold tracking-wide">
            Expo Formación UOCRA 2026
          </p>
        </div>
      </div>
    </div>
  );
}