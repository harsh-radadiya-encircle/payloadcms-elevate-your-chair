import type { Tab } from 'payload';

export const styleTab: Tab = {
  label: 'Style',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'paddingTopDesktop',
          type: 'number',
          label: 'Padding Top (Desktop px)',
          defaultValue: 80,
          admin: { width: '50%' },
        },
        {
          name: 'paddingBottomDesktop',
          type: 'number',
          label: 'Padding Bottom (Desktop px)',
          defaultValue: 80,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'paddingTopMobile',
          type: 'number',
          label: 'Padding Top (Mobile px)',
          defaultValue: 64,
          admin: { width: '50%' },
        },
        {
          name: 'paddingBottomMobile',
          type: 'number',
          label: 'Padding Bottom (Mobile px)',
          defaultValue: 64,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'marginTopDesktop',
          type: 'number',
          label: 'Margin Top (Desktop px)',
          defaultValue: 0,
          admin: { width: '50%' },
        },
        {
          name: 'marginBottomDesktop',
          type: 'number',
          label: 'Margin Bottom (Desktop px)',
          defaultValue: 0,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'marginTopMobile',
          type: 'number',
          label: 'Margin Top (Mobile px)',
          defaultValue: 0,
          admin: { width: '50%' },
        },
        {
          name: 'marginBottomMobile',
          type: 'number',
          label: 'Margin Bottom (Mobile px)',
          defaultValue: 0,
          admin: { width: '50%' },
        },
      ],
    },
  ],
};
