import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const FeatureCards: Block = {
  slug: 'feature-cards',
  interfaceName: 'FeatureCardsBlock',
  imageURL: '/thumbnails/FeatureCards-block.png',
  imageAltText: 'Feature Cards Block Thumbnail',
  labels: {
    singular: 'Feature Cards (Dark Grid)',
    plural: 'Feature Card Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'preHeading',
              type: 'text',
              label: 'Normal Heading (e.g. "WHAT MAKES US" or "OUR")',
            },
            {
              name: 'mainHeading',
              type: 'text',
              label: 'Bold Heading (e.g. "DIFFERENT" or "VALUES")',
              required: true,
            },
            {
              name: 'subHeading',
              type: 'textarea',
              label: 'Sub-Heading Text (e.g. "A focus on wellness...")',
            },
            {
              name: 'cardBorderGradient',
              type: 'text',
              label: 'Card Border Color (Hex)',
              admin: {
                description: 'e.g. #CDBEA5 (The gradient will be generated automatically)',
              },
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Cards',
              minRows: 1,
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Icon / Image',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Card Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Card Description',
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
