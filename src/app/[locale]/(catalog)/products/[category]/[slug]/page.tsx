import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Download, Shield, Thermometer, Box, FileText, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { cms } from '@/lib/cms';
import { categoriesDatabase } from '@/data/categories';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const products = await cms.products.find();
  const locales = ['en', 'es', 'de'];
  
  const paths: Array<{ category: string; slug: string; locale: string }> = [];
  locales.forEach(locale => {
    products.forEach(p => {
      const cat = categoriesDatabase.find(c => c.id === p.category);
      paths.push({
        category: cat?.slug || 'catalog',
        slug: p.slug,
        locale
      });
    });
  });
  
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug, locale } = await params;
  const product = await cms.products.findBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Shree Sai Scientific',
    };
  }

  return {
    title: `${product.name} Specs & Drawings | Shree Sai Scientific`,
    description: product.description,
    alternates: {
      canonical: `https://www.shreesaiscientific.com/${locale}/products/${category}/${slug}`,
      languages: {
        en: `https://www.shreesaiscientific.com/en/products/${category}/${slug}`,
        es: `https://www.shreesaiscientific.com/es/products/${category}/${slug}`,
        de: `https://www.shreesaiscientific.com/de/products/${category}/${slug}`,
        'x-default': `https://www.shreesaiscientific.com/en/products/${category}/${slug}`
      }
    },
    openGraph: {
      title: `${product.name} | Shree Sai Scientific`,
      description: product.description,
      images: [{ url: product.imagePath }],
    }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, slug, locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const product = await cms.products.findBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryItem = await cms.categories.findBySlug(category);
  const relatedProducts = await cms.products.getRelated(product.id, 2);

  const t = await getTranslations('products');
  const tCommon = await getTranslations('common');

  // Build the prefilled RFQ link parameters
  const rfqLink = `/rfq?source=product_detail&productId=${product.id}&productName=${encodeURIComponent(product.name)}&category=${category}`;

  // Rich JSON-LD Schemas definitions
  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.shreesaiscientific.com/${locale}/products/${category}/${slug}#product`,
    "name": product.name,
    "image": `https://www.shreesaiscientific.com${product.imagePath}`,
    "description": product.description,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Shree Sai Scientific"
    },
    "material": "Borosilicate Glass 3.3 & PTFE",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "itemCondition": "https://schema.org/NewCondition",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "description": "Available via custom engineering RFQ"
      }
    }
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.shreesaiscientific.com/#organization",
    "name": "Shree Sai Scientific",
    "url": "https://www.shreesaiscientific.com",
    "logo": "https://www.shreesaiscientific.com/assets/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vadodara, Gujarat",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390001",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "B2B Sales Support",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://www.shreesaiscientific.com/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `https://www.shreesaiscientific.com/${locale}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryItem?.name || category,
        "item": `https://www.shreesaiscientific.com/${locale}/products/${category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `https://www.shreesaiscientific.com/${locale}/products/${category}/${slug}`
      }
    ]
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": `https://www.shreesaiscientific.com/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `https://www.shreesaiscientific.com/${locale}/products?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-obsidian font-sans text-text-main relative">
      {/* Injects multiple SEO JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12 z-10">
        
        {/* Fallback Notice for Translation */}
        {locale !== 'en' && (
          <div className="card-glass border-tech-orange/20 bg-tech-orange/5 p-4 rounded-radius-sm flex items-start gap-3">
            <Shield className="h-5 w-5 text-tech-orange shrink-0 mt-0.5" />
            <p className="text-text-muted text-xs font-sans leading-relaxed">
              <span className="text-tech-orange font-bold font-mono text-[10px] uppercase border border-tech-orange/30 bg-tech-orange/10 px-2 py-0.5 rounded-full mr-2">i18n Translation status</span>
              {tCommon('fallback.notice')}
            </p>
          </div>
        )}

        {/* Breadcrumbs Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-gray pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-pure-white transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-pure-white transition-colors">PRODUCTS</Link>
            <span>/</span>
            {categoryItem ? (
              <>
                <Link href={`/products/${category}`} className="hover:text-pure-white transition-colors uppercase">{categoryItem.name}</Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-pure-white uppercase">{product.slug}</span>
          </div>
          
          <Link href={categoryItem ? `/products/${category}` : "/products"} className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-pure-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> {tCommon('buttons.backDivision')}
          </Link>
        </div>

        {/* Product Core Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual Presentation Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="card-glass p-8 flex items-center justify-center relative overflow-hidden bg-slate-950/40 min-h-[380px]">
              <div className="absolute inset-0 bg-gradient-to-r from-glass-cyan/5 to-tech-orange/5 blur-xl pointer-events-none" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-dark-obsidian/90 border border-steel-gray rounded-full text-[9px] font-mono text-pure-white uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-glass-cyan" /> 3.3 Borosilicate Glass
              </div>
              <Image 
                src={product.imagePath}
                alt={product.name}
                width={450}
                height={355}
                className="rounded-radius-md border border-steel-gray/60 shadow-glass object-cover opacity-90 hover:scale-[1.01] transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Technical properties & metadata fields */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-tech-orange uppercase tracking-widest">TECHNICAL SPECIFICATION MATRIX</span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-pure-white leading-tight">
                {product.name}
              </h1>
              <p className="text-text-muted font-sans text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Threshold limits block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-steel-gray py-6">
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Box className="h-4 w-4 text-glass-cyan" /> {t('labels.sizeLimits')}
                </span>
                <span className="block font-display text-sm font-semibold text-pure-white">
                  {product.volumeRange || 'N/A'}
                </span>
              </div>
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Thermometer className="h-4 w-4 text-tech-orange" /> {t('labels.tempRange')}
                </span>
                <span className="block font-display text-sm font-semibold text-pure-white">
                  {product.temperatureLimits || 'N/A'}
                </span>
              </div>
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Shield className="h-4 w-4 text-glass-cyan" /> {t('labels.maxPressure')}
                </span>
                <span className="block font-display text-sm font-semibold text-pure-white">
                  {product.maxPressure || 'N/A'}
                </span>
              </div>
            </div>

            {/* Product Documents & Drawings Center */}
            <div className="space-y-4">
              <h3 className="font-display text-xs font-bold text-pure-white uppercase tracking-wider">
                {t('labels.downloadCenter')}
              </h3>
              
              {/* Manual/CAD/Cert downloads block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.documents.map((doc) => (
                  <a 
                    key={doc.id}
                    href={doc.path} 
                    className="flex items-center justify-between p-3.5 bg-steel-gray/20 border border-steel-gray hover:border-glass-cyan rounded-radius-xs font-mono text-[11px] text-pure-white transition-colors group"
                    download
                  >
                    <span className="flex items-center gap-2 truncate pr-2">
                      {doc.type === 'certificate' ? (
                        <CheckCircle className="h-4 w-4 text-glass-cyan shrink-0" />
                      ) : (
                        <FileText className="h-4 w-4 text-tech-orange shrink-0" />
                      )}
                      <span className="truncate">{doc.label}</span>
                    </span>
                    <Download className="h-4 w-4 text-text-muted group-hover:text-pure-white shrink-0 transition-colors" />
                  </a>
                ))}

                {/* CAD step button */}
                {product.cadFiles?.step && (
                  <a 
                    href={product.cadFiles.step} 
                    className="flex items-center justify-between p-3.5 bg-steel-gray/20 border border-steel-gray hover:border-glass-cyan rounded-radius-xs font-mono text-[11px] text-pure-white transition-colors group"
                    download
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-glass-cyan shrink-0" />
                      <span>STEP (3D Assembly Model)</span>
                    </span>
                    <Download className="h-4 w-4 text-text-muted group-hover:text-pure-white shrink-0 transition-colors" />
                  </a>
                )}

                {/* CAD dwg button */}
                {product.cadFiles?.dwg && (
                  <a 
                    href={product.cadFiles.dwg} 
                    className="flex items-center justify-between p-3.5 bg-steel-gray/20 border border-steel-gray hover:border-glass-cyan rounded-radius-xs font-mono text-[11px] text-pure-white transition-colors group"
                    download
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-glass-cyan shrink-0" />
                      <span>DWG (AutoCAD Orthographics)</span>
                    </span>
                    <Download className="h-4 w-4 text-text-muted group-hover:text-pure-white shrink-0 transition-colors" />
                  </a>
                )}
              </div>
            </div>

            {/* Quote Action Pre-filled path */}
            <div className="pt-4">
              <Link 
                href={rfqLink}
                className="flex w-full items-center justify-center gap-2 bg-tech-orange text-pure-white font-display text-sm font-semibold py-3.5 rounded-radius-sm hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-glass"
              >
                {tCommon('buttons.inquiry')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Detailed Properties Table */}
        <div className="border-t border-steel-gray pt-12 space-y-6 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-glass-cyan uppercase tracking-wider">{t('labels.specificationsSubtitle')}</span>
            <h2 className="font-display text-2xl font-bold text-pure-white">
              {t('labels.specifications')}
            </h2>
          </div>
          
          <div className="overflow-hidden border border-steel-gray rounded-radius-md bg-dark-obsidian/45">
            <table className="min-w-full divide-y divide-steel-gray font-sans text-sm">
              <thead className="bg-steel-gray/30 text-xs font-mono text-text-muted uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-medium">{t('labels.specsLabel')}</th>
                  <th scope="col" className="px-6 py-4 text-left font-medium">{t('labels.specsValue')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-gray text-text-muted">
                {product.specifications.map((spec, index) => (
                  <tr key={index} className="hover:bg-steel-gray/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-pure-white">{spec.label}</td>
                    <td className="px-6 py-4">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-steel-gray pt-12 space-y-6 text-left">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-tech-orange uppercase tracking-wider">{t('labels.relatedSubtitle')}</span>
              <h3 className="font-display text-xl font-bold text-pure-white">
                {t('labels.related')}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProducts.map(item => {
                const itemCat = categoriesDatabase.find(c => c.id === item.category);
                return (
                  <div 
                    key={item.id} 
                    className="card-glass p-6 flex flex-col justify-between items-start gap-4 hover:border-steel-gray/80 transition-colors relative group overflow-hidden"
                  >
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-glass-cyan uppercase tracking-wider">
                        {itemCat?.name || item.category}
                      </span>
                      <h4 className="font-display font-semibold text-pure-white text-base">
                        {item.name}
                      </h4>
                      <p className="text-text-muted text-xs font-sans leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <Link 
                      href={`/products/${itemCat?.slug || 'catalog'}/${item.slug}`} 
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-tech-orange hover:text-pure-white transition-colors"
                    >
                      {tCommon('buttons.viewSpecsMatrix')} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
