import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Box, HardHat } from 'lucide-react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { cms } from '@/lib/cms';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';

interface CategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await cms.categories.find();
  const locales = ['en', 'es', 'de'];
  
  const paths: Array<{ category: string; locale: string }> = [];
  locales.forEach(locale => {
    categories.forEach(cat => {
      paths.push({
        category: cat.slug,
        locale
      });
    });
  });
  
  return paths;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category, locale } = await params;
  const cat = await cms.categories.findBySlug(category);
  
  if (!cat) {
    return {
      title: 'Category Not Found | Shree Sai Scientific',
    };
  }

  return {
    title: `${cat.name} Systems | Shree Sai Scientific`,
    description: cat.description,
    alternates: {
      canonical: `https://www.shreesaiscientific.com/${locale}/products/${category}`,
      languages: {
        en: `https://www.shreesaiscientific.com/en/products/${category}`,
        es: `https://www.shreesaiscientific.com/es/products/${category}`,
        de: `https://www.shreesaiscientific.com/de/products/${category}`,
        'x-default': `https://www.shreesaiscientific.com/en/products/${category}`
      }
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const cat = await cms.categories.findBySlug(category);

  if (!cat) {
    notFound();
  }

  const tCommon = await getTranslations('common');

  // Query products specifically inside this category
  const products = await cms.products.find({ category: cat.slug });

  return (
    <div className="flex min-h-screen flex-col bg-dark-obsidian font-sans text-text-main relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 space-y-12 z-10">
        
        {/* Navigation Breadcrumb strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-gray pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-pure-white transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-pure-white transition-colors">PRODUCTS</Link>
            <span>/</span>
            <span className="text-pure-white uppercase">{cat.name}</span>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-pure-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> {tCommon('buttons.back')}
          </Link>
        </div>

        {/* Division Header Introduction */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-steel-gray rounded-radius-md bg-dark-obsidian/45 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.04)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <span className="inline-block text-[9px] font-mono text-glass-cyan uppercase tracking-wider bg-glass-cyan/5 border border-glass-cyan/20 px-2.5 py-1 rounded-full">
              Division: {cat.division === 'glass-systems' ? 'Process Glass Systems' : 'PTFE & Fluoropolymers'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-pure-white leading-tight">
              {cat.name} Solutions
            </h1>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed font-sans max-w-3xl">
              {cat.description} Shree Sai Scientific ensures strict compliance with global laboratory standards, utilizing pure borosilicate 3.3 raw compounds and machined seals to sustain absolute chemical isolation.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs text-text-muted border-t lg:border-t-0 lg:border-l border-steel-gray pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-glass-cyan" /> ISO 9001 Compliance
            </div>
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-tech-orange" /> 100% Spark Tested
            </div>
            <div className="flex items-center gap-2">
              <HardHat className="h-4 w-4 text-glass-cyan" /> ASME Section VIII Compliant
            </div>
          </div>
        </section>

        {/* Grid Products list */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-bold text-pure-white text-left uppercase tracking-wide">
            Available {cat.name} Assemblies
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map(product => (
                <div key={product.id} className="card-glass p-6 space-y-6 flex flex-col justify-between hover:border-steel-gray/80 transition-all duration-300 relative group overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center p-4 bg-slate-950/45 border border-steel-gray rounded-radius-md h-[200px] overflow-hidden relative">
                      <Image 
                        src={product.imagePath} 
                        alt={product.name} 
                        width={280} 
                        height={180}
                        className="object-cover opacity-90 group-hover:scale-[1.02] transition-transform rounded-radius-xs"
                      />
                    </div>
                    
                    <div className="text-left space-y-2">
                      <h3 className="font-display text-lg font-bold text-pure-white leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed font-sans line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-steel-gray pt-4 mt-auto">
                    <div className="text-left text-[10px] font-mono text-text-muted">
                      <span>{tCommon('units.temp')}: {product.temperatureLimits || 'N/A'}</span>
                    </div>
                    <Link 
                      href={`/products/${cat.slug}/${product.slug}`}
                      className="inline-flex items-center gap-1.5 bg-steel-gray/50 hover:bg-tech-orange border border-steel-gray hover:border-tech-orange text-pure-white font-mono text-[10px] px-3.5 py-2 rounded-radius-xs transition-colors"
                    >
                      {tCommon('buttons.viewSpecsMatrix')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-steel-gray rounded-radius-md">
              <p className="text-text-muted font-mono text-sm">
                No active configurations are listed under this category division.
              </p>
              <Link href="/products" className="text-glass-cyan font-mono text-xs hover:underline mt-2 inline-block">
                View whole catalog
              </Link>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
