export interface PayloadIndustryConfig {
  slug: string;
  admin: {
    useAsTitle: string;
    defaultColumns: string[];
  };
  fields: unknown[];
}

export const Industries: PayloadIndustryConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
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
    }
  ]
};

export default Industries;
