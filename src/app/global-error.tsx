'use client';

export default function GlobalError({ error: _error, reset }: { error: Error; reset: () => void }) {
  return (
    <html><body>
      <h1>Error crítico</h1>
      <button onClick={reset}>Reintentar</button>
    </body></html>
  );
}
