export const SOURCE_OPTIONS = ['Redes sociales', 'Boca a boca', 'Correo electrónico', 'Cartelería/Volantes', 'Otro'] as const;

export type SourceOption = typeof SOURCE_OPTIONS[number];
