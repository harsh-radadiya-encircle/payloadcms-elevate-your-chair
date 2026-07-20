import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const FaqSection: Block = {
  slug: 'faq-section',
  interfaceName: 'FaqSectionBlock',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'The background image that appears behind the FAQs (with a light overlay).',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'FAQS',
      required: true,
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
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
