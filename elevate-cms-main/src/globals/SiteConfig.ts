import type { GlobalConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Site Settings',
  admin: {
    group: 'Administration',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    read: () => true,
    update: access({ allowedRoles: ['admin'] }),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'siteName', type: 'text', required: true, label: 'Website Name' },
            { name: 'siteLink', type: 'text', required: true, label: 'Website Base URL' },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon',
              filterOptions: {
                mimeType: {
                  in: ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml'],
                },
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              filterOptions: {
                mimeType: { in: ['image/png', 'image/svg+xml'] },
              },
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Icon',
              filterOptions: {
                mimeType: { in: ['image/png', 'image/svg+xml'] },
              },
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              type: 'group',
              name: 'contact',
              label: '',
              fields: [
                { name: 'email', type: 'text', label: 'Email Address' },
                { name: 'phone', type: 'text', label: 'Phone Number' },
                { name: 'address', type: 'textarea', label: 'Physical Address' },
              ],
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              type: 'group',
              name: 'socials',
              label: '',
              fields: [
                { name: 'facebook', type: 'text', label: 'Facebook' },
                { name: 'instagram', type: 'text', label: 'Instagram' },
                { name: 'linkedin', type: 'text', label: 'LinkedIn' },
                { name: 'x', type: 'text', label: 'X (Twitter)' },
                { name: 'youtube', type: 'text', label: 'YouTube' },
                { name: 'tiktok', type: 'text', label: 'TikTok' },
                { name: 'whatsapp', type: 'text', label: 'WhatsApp' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              type: 'group',
              name: 'seo',
              label: 'Default SEO Metadata',
              fields: [
                { name: 'metaTitle', type: 'text', label: 'Default Meta Title' },
                { name: 'metaDescription', type: 'textarea', label: 'Default Meta Description' },
                {
                  name: 'metaImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Default Meta Image',
                },
                {
                  name: 'metaSchema',
                  type: 'textarea',
                  label: 'Structured Data (JSON-LD)',
                  admin: {
                    description: 'Paste valid JSON-LD (Schema.org) here.',
                    rows: 20,
                  },
                },
              ],
            },
          ],
        },
        {
          label: '404 Page',
          fields: [
            {
              type: 'group',
              name: 'error404',
              label: '404 Error Page',
              fields: [
                { name: 'heading', type: 'text', label: 'Heading' },
                { name: 'message', type: 'textarea', label: 'Message' },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Image',
                },
                { name: 'ctaLabel', type: 'text', label: 'CTA Label' },
              ],
            },
          ],
        },
        {
          label: '500 Page',
          fields: [
            {
              type: 'group',
              name: 'error500',
              label: '500 Error Page',
              fields: [
                { name: 'heading', type: 'text', label: 'Heading' },
                { name: 'message', type: 'textarea', label: 'Message' },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Image',
                },
                { name: 'ctaLabel', type: 'text', label: 'CTA Label' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
