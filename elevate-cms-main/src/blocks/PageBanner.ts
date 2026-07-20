import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const PageBanner: Block = {
  slug: 'page-banner',
  imageURL: '/thumbnails/PageBanner-block.png', // Fallback
  imageAltText: 'Page Banner Thumbnail',
  interfaceName: 'PageBannerBlock',
  labels: {
    singular: 'Page Banner',
    plural: 'Page Banners',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Banner Title (e.g., "ABOUT")',
      required: true,
    },
    {
      name: 'mediaType',
      type: 'radio',
      label: 'Background Media Type',
      options: [
        { label: 'Single Image', value: 'image' },
        { label: 'Single Video', value: 'video' },
        { label: 'Image Slider', value: 'slider' },
      ],
      defaultValue: 'image',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'image',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Video (MP4)',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'video',
      },
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Image Slides',
      minRows: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'slider',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Slide Image',
          required: true,
        },
      ],
    },
          ],
        },
        styleTab,
      ],
    },
  ],
};
