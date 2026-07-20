import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';
import { Button } from '@/fields/Button';

export const HeroSlider: Block = {
  slug: 'hero-slider',
  imageURL: '/thumbnails/HeroSlider-block.png',
  imageAltText: 'Hero Section Block Thumbnail',
  interfaceName: 'HeroSliderBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'heroType',
      type: 'radio',
      label: 'Hero Type',
      options: [
        { label: 'Single Video', value: 'video' },
        { label: 'Image Slider', value: 'slider' },
      ],
      defaultValue: 'video',
      required: true,
    },
    {
      name: 'singleVideo',
      type: 'group',
      label: 'Video Content',
      admin: {
        condition: (_, siblingData) => siblingData?.heroType === 'video',
      },
      fields: [
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Video (MP4)',
          required: true,
        },
        { name: 'title', type: 'text', label: 'Top Title (Regular)' },
        { name: 'highlightedTitle', type: 'text', label: 'Highlighted Title (Bold & Large)', required: true },
        { name: 'description', type: 'textarea', label: 'Description / Bottom Text' },
        {
          name: 'buttons',
          type: 'array',
          label: 'Buttons',
          maxRows: 2,
          fields: Button,
        },
      ],
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Image Slides',
      minRows: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.heroType === 'slider',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          required: true,
        },
        { name: 'title', type: 'text', label: 'Top Title (Regular)' },
        { name: 'highlightedTitle', type: 'text', label: 'Highlighted Title (Bold & Large)', required: true },
        { name: 'description', type: 'textarea', label: 'Description / Bottom Text' },
        {
          name: 'buttons',
          type: 'array',
          label: 'Buttons',
          maxRows: 2,
          fields: Button,
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
