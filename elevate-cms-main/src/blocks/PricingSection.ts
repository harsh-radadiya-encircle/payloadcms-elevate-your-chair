import type { Block } from 'payload';
import { Button } from '@/fields/Button';
import {
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const PricingSection: Block = {
  slug: 'pricing-section',
  imageURL: '/thumbnails/PricingSection-block.png',
  imageAltText: 'Pricing Section Thumbnail',
  interfaceName: 'PricingSectionBlock',
  labels: {
    singular: 'Pricing Summary',
    plural: 'Pricing Summary Blocks',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Optional)',
      admin: {
        description: 'If provided, this image will appear faded behind the pricing section.',
      },
    },
    {
      name: 'bgOpacity',
      type: 'number',
      label: 'Background Image Opacity (%)',
      min: 0,
      max: 100,
      defaultValue: 10,
      admin: {
        description: 'Set the opacity of the background image from 0 (invisible) to 100 (fully visible).',
        condition: (_, siblingData) => Boolean(siblingData.backgroundImage),
      },
    },
    {
      name: 'preHeading',
      type: 'text',
      label: 'Normal Heading (e.g. "PRICING")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading (e.g. "SUMMARY")',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description (Optional text below heading)',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Text (e.g. "ONLINE W/ IN-PERSON EDUCATION")',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Plan Title (e.g. "ELEVATE FOUNDATIONS")',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'monthlyOriginalPrice',
              type: 'text',
              label: 'Monthly Original Price (Crossed out, e.g. "588")',
            },
            {
              name: 'monthlyPrice',
              type: 'text',
              label: 'Monthly Current/Sale Price (e.g. "529")',
            },
            {
              name: 'yearlyOriginalPrice',
              type: 'text',
              label: 'Yearly Original Price (Crossed out, e.g. "5880")',
            },
            {
              name: 'yearlyPrice',
              type: 'text',
              label: 'Yearly Current/Sale Price (e.g. "5290")',

            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Highlight this card (enables custom background and border below)?',
          defaultValue: false,
        },
        {
          name: 'cardBackground',
          type: 'text',
          label: 'Card Background (e.g. "linear-gradient(to bottom, #f3f4f6, #d1d5db)" or "#ffffff")',
          admin: {
            condition: (_, siblingData) => siblingData.isFeatured,
          },
        },
        {
          name: 'cardBorder',
          type: 'text',
          label: 'Card Border Color (Hex)',
          admin: {
            description: 'e.g. #CDBEA5 (The gradient will be generated automatically)',
            condition: (_, siblingData) => siblingData.isFeatured,
          },
        },
      ],
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
