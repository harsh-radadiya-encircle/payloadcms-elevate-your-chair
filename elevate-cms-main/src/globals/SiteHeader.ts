import type { GlobalConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';
import { NavigationLinks } from '@/fields/NavigationLinks';

export const SiteHeader: GlobalConfig = {
  slug: 'site-header',
  label: 'Site Header',
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
          label: 'Navigation Bar',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              required: true,
            },
            {
              name: 'logoAlt',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo Alternative (Light / Dark)',
            },
            {
              name: 'noticeText',
              type: 'text',
              label: 'Notice Bar Text',
              defaultValue: 'This is the first example of a sitewide notice.',
            },
            {
              name: 'primaryCTA',
              type: 'group',
              label: 'Call To Action (Notice Bar & Mobile Menu)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
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
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in a New Tab',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'navigationLinks',
              type: 'array',
              label: 'Main Navigation Links',
              fields: [NavigationLinks],
            },
          ],
        },
        {
          label: 'Menu Modal',
          fields: [
            {
              name: 'menuLinksPrimary',
              type: 'array',
              label: 'Main Navigation Links (Product Pages)',
              fields: [NavigationLinks],
            },
            {
              name: 'menuLinksSecondary',
              type: 'array',
              label: 'Secondary Navigation Links',
              fields: [NavigationLinks],
            },
          ],
        },
      ],
    },
  ],
};
