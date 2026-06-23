export interface PayloadProductConfig {
  slug: string;
  admin: {
    useAsTitle: string;
    defaultColumns: string[];
  };
  versions: {
    drafts: boolean;
  };
  fields: unknown[];
}

export const Products: PayloadProductConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status'],
  },
  versions: {
    drafts: true,
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'volumeRange',
      type: 'text',
      required: false,
    },
    {
      name: 'temperatureLimits',
      type: 'text',
      required: false,
    },
    {
      name: 'maxPressure',
      type: 'text',
      required: false,
    },
    {
      name: 'numericalLimits',
      type: 'group',
      fields: [
        { name: 'volumeMaxL', type: 'number' },
        { name: 'tempMinC', type: 'number', required: true },
        { name: 'tempMaxC', type: 'number', required: true },
        { name: 'pressureMaxBar', type: 'number', required: true }
      ]
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true }
      ]
    },
    {
      name: 'imagePath',
      type: 'text',
      required: true,
    },
    {
      name: 'documents',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Technical Datasheet', value: 'pdf' },
            { label: 'CAD Drawing', value: 'cad' },
            { label: 'Quality Certificate', value: 'certificate' }
          ],
          required: true
        },
        { name: 'path', type: 'text', required: true }
      ]
    },
    {
      name: 'cadFiles',
      type: 'group',
      fields: [
        { name: 'step', type: 'text' },
        { name: 'dwg', type: 'text' }
      ]
    }
  ]
};

export default Products;
