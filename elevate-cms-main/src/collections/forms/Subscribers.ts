import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const Subscribers: CollectionConfig = {
  slug: 'form-submission-subscribers',
  labels: {
    singular: 'Subscriber',
    plural: 'Subscribers',
  },
  admin: {
    group: 'Form Submissions',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    read: access({ allowedRoles: ['admin', 'editor'] }),
    create: () => true,
    update: access({ allowedRoles: ['admin'] }),
    delete: access({ allowedRoles: ['admin'] }),
  },
  fields: [
    { name: 'firstName', type: 'text', required: false },
    { name: 'lastName', type: 'text', required: false },
    { name: 'email', type: 'text', required: false },
  ],
};
