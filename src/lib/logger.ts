const isServer = typeof window === 'undefined';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

function formatLog(level: LogLevel, message: string, data?: unknown): string {
  const entry: LogEntry = { level, message, timestamp: new Date().toISOString(), data };
  return JSON.stringify(entry);
}

export const logger = {
  debug: (msg: string, data?: unknown) => { if (isServer) console.debug(formatLog('debug', msg, data)); },
  info: (msg: string, data?: unknown) => { if (isServer) console.info(formatLog('info', msg, data)); },
  warn: (msg: string, data?: unknown) => { if (isServer) console.warn(formatLog('warn', msg, data)); },
  error: (msg: string, error?: unknown) => {
    if (isServer) {
      const errorData = error instanceof Error ? { message: error.message, stack: error.stack } : error;
      console.error(formatLog('error', msg, errorData));
    }
  },
};
