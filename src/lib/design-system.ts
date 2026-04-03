export const goldenHour = {
  colors: {
    gold: {
      DEFAULT: '#D4A853',
      light: '#E8C47A',
      dark: '#B8923E',
      muted: '#D4A85333',
    },
    primary: {
      DEFAULT: '#124565',
      light: '#1a5a80',
      dark: '#0d3650',
    },
    background: {
      warm: '#faf9f7',
      warmDark: '#f3f1ed',
    },
  },
  animation: {
    goldenGlow: 'golden-glow 3s ease-in-out infinite',
    goldenShimmer: 'golden-shimmer 3s linear infinite',
    float: 'float 6s ease-in-out infinite',
    floatReverse: 'float-reverse 6s ease-in-out infinite',
  },
  shadows: {
    golden: '0 4px 20px rgba(212, 168, 83, 0.3)',
    goldenLg: '0 8px 30px rgba(212, 168, 83, 0.4)',
    goldenXl: '0 12px 40px rgba(212, 168, 83, 0.5)',
  },
  gradients: {
    golden: 'linear-gradient(135deg, #D4A853 0%, #E8C47A 50%, #D4A853 100%)',
    goldenDark: 'linear-gradient(135deg, #B8923E 0%, #D4A853 50%, #B8923E 100%)',
    hero: 'linear-gradient(180deg, #0d1b2a 0%, #124565 50%, #0d1b2a 100%)',
  },
};

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
