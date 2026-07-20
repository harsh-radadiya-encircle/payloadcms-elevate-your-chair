import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const ComparisonTable: Block = {
  slug: 'comparison-table',
  interfaceName: 'ComparisonTableBlock',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables',
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
      defaultValue: "WHAT'S INCLUDED",
      required: true,
    },
    {
      name: 'tiers',
      type: 'array',
      label: 'Tiers (Columns)',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Tier Name (e.g. ELEVATE CONNECT)',
          required: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features (Rows)',
      minRows: 1,
      fields: [
        {
          name: 'featureName',
          type: 'text',
          label: 'Feature Name',
          required: true,
        },
        {
          name: 'tierValues',
          type: 'array',
          label: 'Tier Values (Map these to your columns above)',
          fields: [
            {
              name: 'hasFeature',
              type: 'checkbox',
              label: 'Has Feature? (Shows a checkmark)',
              defaultValue: false,
            },
            {
              name: 'textValue',
              type: 'text',
              label: 'Optional Text (e.g. "20% off", overrides checkmark)',
            },
          ],
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
