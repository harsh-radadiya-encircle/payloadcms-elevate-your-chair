import type { Plugin } from 'payload';
import { access } from '@/payload/helpers/rbac';

import { seoPlugin } from '@payloadcms/plugin-seo';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { searchPlugin } from '@payloadcms/plugin-search';
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';

export const plugins: Plugin[] = [
  seoPlugin({
    collections: ['pages', 'campaign-pages', 'blog-posts'],
    tabbedUI: true,
    uploadsCollection: 'media',
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'schema',
        type: 'textarea',
        label: 'Structured Data (JSON-LD)',
        admin: {
          description: 'Paste valid JSON-LD (Schema.org) here.',
          rows: 20,
        },
        required: false,
      },
    ],
  }),

  redirectsPlugin({
    collections: ['pages', 'campaign-pages', 'blog-posts'],
    redirectTypes: ['301', '302'],
    overrides: {
      admin: {
        group: 'Administration',
        hidden: ({ user }) => user?.role !== 'admin',
      },
    },
  }),

  searchPlugin({
    collections: ['pages', 'blog-posts'],
    defaultPriorities: {
      pages: 10,
      'blog-posts': 5,
    },
    searchOverrides: {
      admin: {
        group: 'Administration',
        hidden: true,
      },
    },
  }),

  formBuilderPlugin({
    fields: {
      email: true,
      text: true,
      date: true,
      select: true,
      number: true,
      checkbox: true,
      textarea: true,
      country: true,
      state: false,
      message: false,
      payment: false,
    },
    redirectRelationships: ['pages', 'campaign-pages'],
    formOverrides: {
      slug: 'campaign-forms',
      admin: {
        group: 'Campaigns',
      },
      labels: {
        singular: 'Form',
        plural: 'Forms',
      },
      access: {
        read: () => true,
        create: access({ allowedRoles: ['admin', 'editor'] }),
        update: access({ allowedRoles: ['admin', 'editor'] }),
        delete: access({ allowedRoles: ['admin'] }),
      },
      fields: ({ defaultFields }) => {
        const updatedFields = defaultFields.filter((field) => (field as { name?: string }).name !== 'emails');

        const formFieldsField = updatedFields.find((f) => (f as { name?: string }).name === 'fields') as any;
        if (formFieldsField && formFieldsField.blocks) {
          formFieldsField.blocks = formFieldsField.blocks.map((block: any) => {
            if (['text', 'textarea', 'email', 'number'].includes(block.slug)) {
              // Only add if not already there
              const hasPlaceholder = block.fields.find((f: any) => f.name === 'placeholder');
              if (!hasPlaceholder) {
                // Find the default value index to insert near it, or just push
                block.fields.push({
                  name: 'placeholder',
                  type: 'text',
                  label: 'Placeholder',
                  required: false,
                });
              }
            }
            return block;
          });
        }

        return updatedFields;
      },
    },
    formSubmissionOverrides: {
      slug: 'campaign-leads',
      admin: {
        group: 'Campaigns',
        useAsTitle: 'email',
        defaultColumns: ['name', 'email', 'page', 'createdAt'],
      },
      labels: {
        singular: 'Lead',
        plural: 'Leads',
      },
      access: {
        read: access({ allowedRoles: ['admin', 'editor'] }),
        create: () => true,
        update: access({ allowedRoles: ['admin', 'editor'] }),
        delete: access({ allowedRoles: ['admin'] }),
      },
      fields: () => {
        return [
          {
            type: 'row',
            fields: [
              {
                name: 'page',
                type: 'relationship',
                relationTo: ['pages', 'campaign-pages'],
                required: false,
                admin: { readOnly: true },
              },
              {
                name: 'form',
                type: 'relationship',
                relationTo: 'campaign-forms',
                required: true,
                admin: { readOnly: true },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'name',
                type: 'text',
                required: true,
                admin: { readOnly: true },
              },
              {
                name: 'email',
                type: 'email',
                required: true,
                admin: { readOnly: true },
              },
            ],
          },
          {
            name: 'submissionData',
            type: 'array',
            label: 'Submission Fields',
            admin: { readOnly: true },
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'fieldName',
                    type: 'text',
                    label: 'Field Name',
                    admin: { readOnly: true },
                  },
                  {
                    name: 'fieldValue',
                    type: 'text',
                    label: 'Value',
                    admin: { readOnly: true },
                  },
                ],
              },
            ],
          },
          {
            name: 'submissionJSON',
            type: 'json',
            required: true,
            admin: { hidden: true },
          },
        ];
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            const json = data?.submissionJSON;

            if (json && typeof json === 'object') {
              data.submissionData = Object.entries(json).map(([key, val]) => ({
                fieldName: key,
                fieldValue: typeof val === 'object' ? JSON.stringify(val) : String(val),
              }));

              if (!data.email && json.email) {
                data.email = json.email;
              }
              if (!data.name && json.name) {
                data.name = json.name;
              }
            }

            return data;
          },
        ],
      },
    },
  }),
];
