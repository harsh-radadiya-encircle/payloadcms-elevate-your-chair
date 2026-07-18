import type { Block } from 'payload';
import { Button } from '@/fields/Button';
import {
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const AppPromo: Block = {
  slug: 'app-promo',
  imageURL: '/thumbnails/AppPromo-block.png',
  imageAltText: 'App Promo Block Thumbnail',
  interfaceName: 'AppPromoBlock',
  labels: {
    singular: 'App Promo (Dark)',
    plural: 'App Promo Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'radio',
      label: 'Image Alignment (Desktop)',
      options: [
        { label: 'Image on Left', value: 'image-left' },
        { label: 'Image on Right', value: 'image-right' },
      ],
      defaultValue: 'image-left',
      required: true,
    },
    {
      name: 'gradientColor',
      type: 'text',
      label: 'Gradient Background Color (Hex)',
      defaultValue: '#cdbfae',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
      name: 'preHeading',
      type: 'text',
      label: 'Normal Heading',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      maxRows: 2,
      fields: Button,
    },
  ],
};
