import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/**',
      },
      {
        protocol: 'https',
        hostname: 'dundun.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.licdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.mlstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.mercadolibre.com',
      },
      {
        protocol: 'https',
        hostname: 'ferrum.com',
      },
      {
        protocol: 'https',
        hostname: 'retak.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'mekano.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'ceramicasanlorenzo.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'lomanegra.com',
      },
      {
        protocol: 'https',
        hostname: 'acerbrag.com',
      },
      {
        protocol: 'https',
        hostname: 'later-cersa.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'aluar.com.ar',
      },
      {
        protocol: 'https',
        hostname: '**.sika.com',
      },
      {
        protocol: 'https',
        hostname: 'alba.com.ar',
      },
      {
        protocol: 'https',
        hostname: '**.akzonobel.com',
      },
      {
        protocol: 'https',
        hostname: '**.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'parsecs.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'latyn.net',
      },
      {
        protocol: 'https',
        hostname: 'grupodema.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'dinatecnica.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'conextube.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.wine',
      },
      {
        protocol: 'https',
        hostname: 'gralf.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'microcontrol.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'zoloda.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'electricaoscar.com',
      },
      {
        protocol: 'https',
        hostname: 'migluz.ar',
      },
      {
        protocol: 'https',
        hostname: '**.uocra.org',
      },
      {
        protocol: 'https',
        hostname: 'construirtv.com',
      },
      {
        protocol: 'https',
        hostname: 'bomberosra.org.ar',
      },
      {
        protocol: 'https',
        hostname: 'educacion.gob.ar',
      },
      {
        protocol: 'https',
        hostname: 'camarco.org.ar',
      },
      {
        protocol: 'https',
        hostname: 'kozoarquitectura.es',
      },
      {
        protocol: 'https',
        hostname: 'rotoplas.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'gammaherramientas.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'sicaelec.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'legrand.ar',
      },
      {
        protocol: 'https',
        hostname: '**.bitrix24.es',
      },
      {
        protocol: 'https',
        hostname: 'hipco.com',
      },
      {
        protocol: 'https',
        hostname: 'plavicon.com',
      },
      {
        protocol: 'https',
        hostname: 'elgalgo.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'taopaneles.com',
      },
      {
        protocol: 'https',
        hostname: 'sinteplast.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'durlock.com',
      },
      {
        protocol: 'https',
        hostname: 'saint-gobain.ar',
      },
    ],
  },
};

export default nextConfig;