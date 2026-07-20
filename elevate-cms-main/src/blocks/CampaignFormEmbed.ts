import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const CampaignFormEmbed: Block = {
  slug: 'campaign-form-embed',
  labels: {
    singular: 'Campaign Form',
    plural: 'Campaign Forms',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        rows: 3,
      },
    },
    {
      name: 'form',
      label: 'Campaign Form',
      type: 'relationship',
      relationTo: 'campaign-forms',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Optional)',
    },
    {
      name: 'imageOpacity',
      type: 'number',
      label: 'Background Image Opacity (0 to 100)',
      defaultValue: 30,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.backgroundImage),
      },
    },
          ],
        },
        styleTab,
      ],
    },
  ],
};
