import QRCode from 'qrcode';

export async function generateQRDataURL(dni: string, baseUrl: string): Promise<string> {
  const url = `${baseUrl}/qr/${dni}`;
  return QRCode.toDataURL(url, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });
}

export async function generateQRString(dni: string, baseUrl: string): Promise<string> {
  const url = `${baseUrl}/qr/${dni}`;
  return QRCode.toString(url, {
    type: 'terminal',
    width: 10,
  });
}