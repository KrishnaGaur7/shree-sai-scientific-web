import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale is supported
  if (!locale || !routing.locales.includes(locale as 'en' | 'es' | 'de')) {
    locale = routing.defaultLocale;
  }

  // Load split dictionaries by feature
  const common = (await import(`../../messages/${locale}/common.json`)).default;
  const navigation = (await import(`../../messages/${locale}/navigation.json`)).default;
  const homepage = (await import(`../../messages/${locale}/homepage.json`)).default;
  const products = (await import(`../../messages/${locale}/products.json`)).default;
  const footer = (await import(`../../messages/${locale}/footer.json`)).default;
  const seo = (await import(`../../messages/${locale}/seo.json`)).default;

  return {
    locale,
    messages: {
      common,
      navigation,
      homepage,
      products,
      footer,
      seo
    }
  };
});
