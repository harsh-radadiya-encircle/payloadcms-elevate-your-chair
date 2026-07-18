import type { GlobalConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';
import { NavigationLinks } from '@/fields/NavigationLinks';

export const SiteFooter: GlobalConfig = {
  slug: 'site-footer',
  label: 'Site Footer',
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
          label: 'Social Feed',
          fields: [
            {
              name: 'followUsHeading',
              type: 'text',
              label: 'Heading',
              defaultValue: 'FOLLOW US',
            },
            {
              name: 'instagramHandle',
              type: 'text',
              label: 'Instagram Handle',
              defaultValue: '@ELEVATEYOURCHAIR',
            },
            {
              name: 'feedImages',
              type: 'array',
              label: 'Feed Images',
              minRows: 4,
              maxRows: 4,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                  required: true,
                }
              ]
            }
          ],
        },
        {
          label: 'Newsletter',
          fields: [
            {
              name: 'newsletterHeading',
              type: 'text',
              label: 'Heading',
              defaultValue: 'WANT TO ELEVATE YOURSELF?',
            },
            {
              name: 'newsletterDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'emailPlaceholder',
              type: 'text',
              label: 'Email Placeholder',
              defaultValue: 'Email',
            },
            {
              name: 'newsletterCTA',
              type: 'text',
              label: 'CTA Button Text',
              defaultValue: 'JOIN THE COMMUNITY',
            }
          ],
        },
        {
          label: 'Footer Bottom',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              required: true,
            },
            {
              name: 'legalLinks',
              type: 'array',
              label: 'Links (e.g. Blake Charles Salon, Privacy Policy)',
              fields: [NavigationLinks],
            },
            {
              name: 'copyright',
              type: 'text',
              label: 'Copyright Notice',
              required: true,
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Icons',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'YouTube', value: 'youtube' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                }
              ]
            }
          ]
        }
      ],
    },
  ],
};
