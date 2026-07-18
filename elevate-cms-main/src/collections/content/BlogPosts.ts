import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    group: 'Content Management',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'status', 'publishedDate', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.PAYLOAD_PUBLIC_SITE_URL ?? 'http://localhost:3000';
        return `${baseUrl}/blog/${data?.slug || ''}`;
      },
    },
  },
  access: {
    read: () => true,
    create: access({ allowedRoles: ['admin', 'editor', 'author'] }),
    update: access({ allowedRoles: ['admin', 'editor', 'author'] }),
    delete: access({ allowedRoles: ['admin', 'editor'] }),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Post Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Post Slug',
      admin: {
        description: 'This will be used in the URL. It must be unique.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'blog-categories',
          required: true,
          label: 'Blog Category',
        },
        {
          name: 'publishedDate',
          type: 'date',
          label: 'Published Date',
          defaultValue: () => new Date(),
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Author Name',
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags (optional)',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      type: 'group',
      name: 'card',
      label: 'Blog Post Card',
      fields: [
        {
          name: 'cardImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Card Image',
          filterOptions: {
            mimeType: { in: ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'] },
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Card Excerpt',
          required: true,
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      required: true,
      filterOptions: {
        mimeType: { in: ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'] },
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Post Content',
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = data.title;
        }

        if (data?.slug) {
          data.slug = data.slug
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        }

        return data;
      },
    ],
  },
};
