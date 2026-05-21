import QRCode from 'qrcode';
import { createHmac } from 'crypto';

function generateQRHash(dni: string): string {
  const secret = process.env.QR_SECRET;
  if (!secret) {
    throw new Error('QR_SECRET environment variable is required');
  }
  return createHmac('sha256', secret)
    .update(dni)
    .digest('hex')
    .substring(0, 16);
}

export async function generateQRDataURL(dni: string): Promise<string> {
  const hash = generateQRHash(dni);
  const data = `EXPO2026:${dni}:${hash}`;
  return QRCode.toDataURL(data, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });
}

export async function generateQRString(dni: string): Promise<string> {
  const hash = generateQRHash(dni);
  const data = `EXPO2026:${dni}:${hash}`;
  return QRCode.toString(data, {
    type: 'terminal',
    width: 10,
  });
}

export function verifyQRHash(dni: string, hash: string): boolean {
  const expectedHash = generateQRHash(dni);
  return expectedHash === hash;
}