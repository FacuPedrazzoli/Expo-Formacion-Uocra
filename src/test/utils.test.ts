import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('combina clases correctamente', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('maneja clases vacías', () => {
    expect(cn('', 'bar')).toBe('bar');
  });

  it('fusiona clases de tailwind con mismo propósito', () => {
    const result = cn('px-2 px-2');
    expect(result).toBe('px-2');
  });

  it('retorna string vacío para inputs vacíos', () => {
    expect(cn()).toBe('');
  });

  it('combina múltiples clases', () => {
    const result = cn('foo', 'bar', 'baz');
    expect(result).toBe('foo bar baz');
  });
});