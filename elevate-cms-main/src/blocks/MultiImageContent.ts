import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const MultiImageContent: Block = {
  slug: 'multi-image-content',
  labels: {
    singular: 'Multi Image Content',
    plural: 'Multi Image Contents',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'preheading',
      type: 'text',
      label: 'Preheading',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      maxLength: 500,
      admin: {
        rows: 3,
      },
    },
    {
      name: 'primary-image',
      type: 'upload',
      relationTo: 'media',
      label: 'Primary Image',
    },
    {
      name: 'secondary-image',
      type: 'upload',
      relationTo: 'media',
      label: 'Secondary Image',
    },
    {
      name: 'primary-button',
      type: 'group',
      label: 'Primary Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: false,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: false,
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in a new tab',
          required: false,
        },
      ],
    },
    {
      name: 'secondary-button',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: false,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: false,
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in a new tab',
          required: false,
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
