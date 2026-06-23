import { MetadataRoute } from 'next';
import { cms } from '@/lib/cms';
import { categoriesDatabase } from '@/data/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.shreesaiscientific.com';
  const locales = ['en', 'es', 'de'];
  const routes: MetadataRoute.Sitemap = [];

  try {
    const [categories, products] = await Promise.all([
      cms.categories.find(),
      cms.products.find()
    ]);

    locales.forEach(locale => {
      // 1. Home
      routes.push({
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      });

      // 2. Products Catalog Index
      routes.push({
        url: `${baseUrl}/${locale}/products`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // 3. Category Landing Pages
      categories.forEach(cat => {
        routes.push({
          url: `${baseUrl}/${locale}/products/${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });

      // 4. Product Detail Pages (Slugs are language-independent)
      products.forEach(p => {
        const cat = categoriesDatabase.find(c => c.id === p.category);
        routes.push({
          url: `${baseUrl}/${locale}/products/${cat?.slug || 'catalog'}/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    });
  } catch (e) {
    console.error('Failed to generate sitemap routes', e);
  }

  return routes;
}
