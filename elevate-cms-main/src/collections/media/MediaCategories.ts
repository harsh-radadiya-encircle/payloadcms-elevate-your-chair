import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const MediaCategories: CollectionConfig = {
  slug: 'media-categories',
  admin: {
    group: 'Content Management',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: access({ allowedRoles: ['admin', 'editor', 'author'] }),
    update: access({ allowedRoles: ['admin', 'editor'] }),
    delete: access({ allowedRoles: ['admin'] }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Category Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Category Slug',
      required: true,
      unique: true,
      admin: {
        description: 'This is used for filtering and should be lowercase/kebab-case.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '');
        }
        return data;
      },
    ],
  },
};
