import type { Block } from 'payload';

export const ContactInformation: Block = {
  slug: 'contact-information',
  labels: {
    singular: 'Contact Information',
    plural: 'Contact Information Blocks',
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
      name: 'socialHandle',
      type: 'text',
      label: 'Social Media Handle',
      defaultValue: '@elevateyourchair',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'instagramUrl',
          type: 'text',
          label: 'Instagram URL (Optional)',
        },
        {
          name: 'tiktokUrl',
          type: 'text',
          label: 'TikTok URL (Optional)',
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube URL (Optional)',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'appStoreUrl',
          type: 'text',
          label: 'App Store URL (Optional)',
        },
        {
          name: 'googlePlayUrl',
          type: 'text',
          label: 'Google Play URL (Optional)',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      required: true,
    },
  ],
};
