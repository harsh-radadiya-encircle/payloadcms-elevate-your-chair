import type { Block } from 'payload';
import { Button } from '@/fields/Button';

export const StagesSection: Block = {
  slug: 'stages-section',
  imageURL: '/thumbnails/stages-section-block.png', // Fallback thumbnail
  imageAltText: 'Stages Section Thumbnail',
  interfaceName: 'StagesSectionBlock',
  labels: {
    singular: 'Stages Section',
    plural: 'Stages Sections',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
      admin: {
        description: 'The full-width image that appears behind the white container.',
      },
    },
    {
      name: 'preHeading',
      type: 'text',
      label: 'Pre-Heading (e.g. "BUILT FOR STYLISTS")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Main Heading (e.g. "AT EVERY STAGE")',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'text',
      label: 'Sub-Heading (e.g. "Whether you\'re...")',
    },
    {
      name: 'stages',
      type: 'array',
      label: 'Stage Cards',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Stage Image',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (e.g. "Fresh out of beauty school")',
          required: true,
        },
      ],
    },
    {
      name: 'bottomText',
      type: 'text',
      label: 'Bottom Text (e.g. "You belong here.")',
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      maxRows: 2,
      fields: Button,
    },
  ],
};
