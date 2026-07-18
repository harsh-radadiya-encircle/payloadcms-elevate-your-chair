import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';
import { blocks } from '@/blocks';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Content Management',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.PAYLOAD_PUBLIC_SITE_URL ?? 'http://localhost:3000';
        const path = data?.slug && data.slug !== 'home' && data.slug !== '/' ? `/${data.slug}` : '';
        return `${baseUrl}/preview${path}`;
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
      label: 'Page Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Page Slug',
      required: true,
      unique: true,
    },
    {
      name: 'showHeader',
      type: 'checkbox',
      label: 'Show the Header on this page',
      defaultValue: true,
    },
    {
      name: 'showFooter',
      type: 'checkbox',
      label: 'Show the Footer on this page',
      defaultValue: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Sections',
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
