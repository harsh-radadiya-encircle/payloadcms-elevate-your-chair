import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';
import { Button } from '@/fields/Button';

export const ContactInformation: Block = {
  slug: 'contact-information',
  labels: {
    singular: 'Contact Information',
    plural: 'Contact Information Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'layout',
      type: 'radio',
      label: 'Image Alignment (Desktop)',
      options: [
        { label: 'Image on Left', value: 'image-left' },
        { label: 'Image on Right', value: 'image-right' },
      ],
      defaultValue: 'image-right',
      required: true,
    },
    {
      name: 'preHeading',
      type: 'text',
      label: 'Normal Heading (e.g. "CONTACT")',
      defaultValue: 'CONTACT',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading (e.g. "INFORMATION")',
      defaultValue: 'INFORMATION',
    },
    {
      name: 'emailAddress',
      type: 'text',
      label: 'Email Address',
      defaultValue: 'info@elevateyourchair.com',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Platform Icon',
          required: true,
        },
        {
          name: 'handle',
          type: 'text',
          label: 'Handle Name (e.g. @elevateyourchair)',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Download / Action Buttons',
      fields: Button,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      required: true,
    },
          ],
        },
        styleTab,
      ],
    },
  ],
};
