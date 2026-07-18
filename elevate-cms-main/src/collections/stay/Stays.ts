import { CollectionConfig, CollectionSlug } from 'payload';

export const Stays: CollectionConfig = {
  slug: 'stays',
  labels: {
    singular: 'Stay',
    plural: 'Stays',
  },
  admin: {
    group: 'Content Management',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.PAYLOAD_PUBLIC_SITE_URL ?? 'http://localhost:3000';
        return `${baseUrl}/stays/${data?.slug || ''}`;
      },
    },
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Stay Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'This will be used in the URL. It must be unique.',
      },
    },
    {
      name: 'intro-content',
      type: 'richText',
      label: 'Intro Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      filterOptions: {
        mimeType: { in: ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'] },
      },
    },
    {
      name: 'stay-gallery',
      type: 'array',
      label: 'Stay Gallery',
      minRows: 2,
      maxRows: 10,
      interfaceName: 'StayGallery',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Details and Amenities',
    },
  ],
};
