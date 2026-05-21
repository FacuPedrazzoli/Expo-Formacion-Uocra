'use client';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  Sentry.captureException(error);
  return (
    <html><body>
      <h1>Error crítico</h1>
      <button onClick={reset}>Reintentar</button>
    </body></html>
  );
}
