'use client';

export default function ProximamenteOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d1b2a]/85 backdrop-blur-sm rounded-xl">
      <div className="text-center px-8 py-6 max-w-md">
        <h3 className="text-3xl md:text-4xl font-bold tracking-wider text-[#56bcb8] mb-3">
          PRÓXIMAMENTE
        </h3>
        <p className="text-white/80 text-sm mb-2">
          ¡Estamos preparando algo especial!
        </p>
        <div className="flex justify-center gap-3 text-2xl mb-2">
          <span>🔨</span>
          <span>🏗️</span>
          <span>⚙️</span>
        </div>
        <p className="text-[#e2c048] font-medium text-xs tracking-wide">
          Expo Formación UOCRA 2026
        </p>
      </div>
    </div>
  );
}