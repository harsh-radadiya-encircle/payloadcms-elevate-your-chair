import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const TestimonialsSlider: Block = {
  slug: 'testimonials-slider',
  imageURL: '/thumbnails/TestimonialsSlider-block.png',
  imageAltText: 'Testimonials Slider Block Thumbnail',
  interfaceName: 'TestimonialsSliderBlock',
  labels: {
    singular: 'Testimonials Slider',
    plural: 'Testimonials Sliders',
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
      label: 'Normal Heading (e.g. "IN-PERSON")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading (e.g. "LEARNING")',
      required: true,
      defaultValue: 'LEARNING',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Optional)',
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
      name: 'cardBorderColor',
      type: 'text',
      label: 'Card Border Color (Hex)',
      admin: {
        description: 'e.g. #CDBEA5 (The gradient will be generated automatically)',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      fields: [
        {
          name: 'mediaType',
          type: 'radio',
          label: 'Media Type',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Cover Image',
          admin: {
            condition: (_, siblingData) => siblingData.mediaType === 'image' || siblingData.mediaType === 'video',
          },
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL (e.g. YouTube/Vimeo Link)',
          admin: {
            condition: (_, siblingData) => siblingData.mediaType === 'video',
          },
        },
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
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
