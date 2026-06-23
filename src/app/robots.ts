import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/rfq/success'],
    },
    sitemap: 'https://www.shreesaiscientific.com/sitemap.xml',
  };
}
