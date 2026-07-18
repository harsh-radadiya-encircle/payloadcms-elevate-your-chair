import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    group: 'Submissions',
  },
  access: {
    create: () => true, // Allow anyone to submit an email
    read: access({ allowedRoles: ['admin'] }), // Only admins can see the list
    update: access({ allowedRoles: ['admin'] }),
    delete: access({ allowedRoles: ['admin'] }),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Is Active Subscriber',
      defaultValue: true,
    },
  ],
  timestamps: true,
};
