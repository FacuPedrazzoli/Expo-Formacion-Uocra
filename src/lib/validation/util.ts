import { z } from 'zod';

export function validateUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export class ValidationError extends Error {
  constructor(public readonly errors: ReturnType<z.ZodError<unknown>['flatten']>) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}

export function parseAndValidate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.flatten());
  }
  return result.data;
}
