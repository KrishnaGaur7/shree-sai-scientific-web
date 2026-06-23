import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shree Sai Scientific Platform',
    short_name: 'Shree Sai Scientific',
    description: 'Precision engineered borosilicate glass 3.3 columns, reactor vessels, and custom fluoropolymer systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#f97316',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
