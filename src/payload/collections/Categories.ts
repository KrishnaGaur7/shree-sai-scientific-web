export interface PayloadCategoryConfig {
  slug: string;
  admin: {
    useAsTitle: string;
    defaultColumns: string[];
  };
  fields: unknown[];
}

export const Categories: PayloadCategoryConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'division'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'division',
      type: 'select',
      required: true,
      options: [
        { label: 'Process Glass Systems', value: 'glass-systems' },
        { label: 'PTFE & Fluoropolymers', value: 'fluoropolymers' }
      ]
    }
  ]
};

export default Categories;
