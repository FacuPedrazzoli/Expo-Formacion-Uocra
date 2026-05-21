export class AppError extends Error {
  constructor(public message: string, public code: string, public statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) { super(`${resource} no encontrado`, 'NOT_FOUND', 404); }
}

export class ValidationError extends AppError {
  constructor(message: string) { super(message, 'VALIDATION_ERROR', 400); }
}

export class UnauthorizedError extends AppError {
  constructor() { super('No autorizado', 'UNAUTHORIZED', 401); }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Error inesperado';
}