import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';
import { blocks } from '@/blocks';

export const LandingPages: CollectionConfig = {
  slug: 'campaign-pages',
  labels: {
    singular: 'Landing Page',
    plural: 'Landing Pages',
  },
  admin: {
    group: 'Campaigns',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.PAYLOAD_PUBLIC_SITE_URL ?? 'http://localhost:3000';
        return `${baseUrl}/campaigns/${data?.slug || ''}`;
      },
    },
  },
  access: {
    read: () => true,
    create: access({ allowedRoles: ['admin', 'editor'] }),
    update: access({ allowedRoles: ['admin', 'editor'] }),
    delete: access({ allowedRoles: ['admin'] }),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Landing Page Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Landing Page Slug',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Landing Page Sections',
      blocks,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = data.title;
        }

        if (data?.slug) {
          const trimmed = data.slug.trim();
          if (trimmed === '/') {
            data.slug = '/';
          } else {
            data.slug = trimmed
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
          }
        }

        return data;
      },
    ],
  },
};
