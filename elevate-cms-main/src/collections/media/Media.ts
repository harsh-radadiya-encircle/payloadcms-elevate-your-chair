import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content Management',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'category', 'tags', 'createdAt'],
  },
  access: {
    read: () => true,
    create: access({ allowedRoles: ['admin', 'editor', 'author'] }),
    update: access({ allowedRoles: ['admin', 'editor'] }),
    delete: access({ allowedRoles: ['admin'] }),
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (optional)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'media-categories',
      label: 'Category',
      required: false,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
};
