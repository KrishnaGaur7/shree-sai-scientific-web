import { productsDatabase, ProductItem } from '@/data/products';
import { categoriesDatabase, CategoryItem } from '@/data/categories';
import { industriesDatabase, IndustryItem } from '@/data/industries';

export interface ProductsFindOptions {
  query?: string;
  category?: string; // slug or id
  industry?: string; // slug or id
  minTemp?: number;
  maxTemp?: number;
  maxPressure?: number;
  limit?: number;
}

export const cms = {
  products: {
    find: async (options: ProductsFindOptions = {}): Promise<ProductItem[]> => {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 30));

      let results = [...productsDatabase];

      // Filter by Category
      if (options.category && options.category !== 'all') {
        const catId = categoriesDatabase.find(c => c.slug === options.category || c.id === options.category)?.id;
        if (catId) {
          results = results.filter(p => p.category === catId);
        } else {
          return []; // Category passed but not found
        }
      }

      // Filter by Industry
      if (options.industry && options.industry !== 'all') {
        const indId = industriesDatabase.find(i => i.slug === options.industry || i.id === options.industry)?.id;
        if (indId) {
          results = results.filter(p => p.industries.includes(indId));
        } else {
          return []; // Industry passed but not found
        }
      }

      // Filter by Search Query
      if (options.query) {
        const q = options.query.toLowerCase().trim();
        results = results.filter(
          p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.specifications.some(s => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q))
        );
      }

      // Filter by Min/Max Temperature
      if (options.minTemp !== undefined) {
        results = results.filter(p => p.numericalLimits.tempMinC <= options.minTemp!);
      }
      if (options.maxTemp !== undefined) {
        results = results.filter(p => p.numericalLimits.tempMaxC >= options.maxTemp!);
      }

      // Filter by Max Pressure
      if (options.maxPressure !== undefined) {
        results = results.filter(p => p.numericalLimits.pressureMaxBar >= options.maxPressure!);
      }

      // Limit results
      if (options.limit) {
        results = results.slice(0, options.limit);
      }

      return results;
    },

    findBySlug: async (slug: string): Promise<ProductItem | null> => {
      await new Promise(resolve => setTimeout(resolve, 15));
      const product = productsDatabase.find(p => p.slug === slug);
      return product || null;
    },

    getRelated: async (productId: string, limit = 2): Promise<ProductItem[]> => {
      await new Promise(resolve => setTimeout(resolve, 15));
      const target = productsDatabase.find(p => p.id === productId);
      if (!target) return [];

      // Find products sharing the same category first, then matching industries
      const related = productsDatabase.filter(
        p => p.id !== productId && (p.category === target.category || p.industries.some(i => target.industries.includes(i)))
      );

      return related.slice(0, limit);
    }
  },

  categories: {
    find: async (): Promise<CategoryItem[]> => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return [...categoriesDatabase];
    },
    findBySlug: async (slug: string): Promise<CategoryItem | null> => {
      await new Promise(resolve => setTimeout(resolve, 10));
      const cat = categoriesDatabase.find(c => c.slug === slug);
      return cat || null;
    }
  },

  industries: {
    find: async (): Promise<IndustryItem[]> => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return [...industriesDatabase];
    },
    findBySlug: async (slug: string): Promise<IndustryItem | null> => {
      await new Promise(resolve => setTimeout(resolve, 10));
      const ind = industriesDatabase.find(i => i.slug === slug);
      return ind || null;
    }
  }
};

export default cms;
