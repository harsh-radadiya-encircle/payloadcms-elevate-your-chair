import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const ImageCardsSection: Block = {
  slug: 'image-cards-section',
  interfaceName: 'ImageCardsSectionBlock',
  imageURL: '/thumbnails/ImageCardsSection-block.png',
  imageAltText: 'Image Cards Section Block Thumbnail',
  labels: {
    singular: 'Image Cards Section (What Makes Us Different)',
    plural: 'Image Cards Sections',
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
              label: 'Normal Heading (e.g. "WHAT MAKES US")',
            },
            {
              name: 'mainHeading',
              type: 'text',
              label: 'Bold Heading (e.g. "DIFFERENT")',
              required: true,
            },
            {
              name: 'subHeading',
              type: 'textarea',
              label: 'Sub-Heading Text (e.g. "At Elevate Your Chair...")',
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Cards',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Card Image',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Card Title (e.g. "ELEVATED MORNINGS")',
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
