import { Metadata } from 'next';

type Props = { children: React.ReactNode; params: Promise<{ dni: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dni } = await params;
  return {
    title: `Registro DNI ${dni} | Expo Formación UOCRA`,
    description: 'Confirmación de registro para Expo Formación UOCRA',
  };
}

export default function QRlayout({ children }: { children: React.ReactNode }) {
  return children;
}
