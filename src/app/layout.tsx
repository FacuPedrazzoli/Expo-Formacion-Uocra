import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgentationWrapper } from "@/components/ui/AgentationWrapper";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: 'Expo Formación UOCRA', template: '%s | Expo Formación UOCRA' },
  description: 'Evento anual de capacitación y formación para trabajadores de la construcción.',
  keywords: ['UOCRA', 'formación', 'capacitación', 'construcción', 'evento'],
  authors: [{ name: 'UOCRA' }],
  openGraph: {
    title: 'Expo Formación UOCRA',
    description: 'Evento anual de capacitación y formación para trabajadores de la construcción.',
    url: 'https://expoformacion.uocra.org',
    siteName: 'Expo Formación UOCRA',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expo Formación UOCRA',
    description: 'Evento anual de capacitación y formación.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased scroll-smooth">
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}