import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const Enquiries: CollectionConfig = {
  slug: 'form-submission-enquiries',
  labels: {
    singular: 'Enquiry',
    plural: 'Enquiries',
  },
  admin: {
    group: 'Form Submissions',
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'createdAt'],
  },
  access: {
    read: access({ allowedRoles: ['admin', 'editor'] }),
    create: () => true,
    update: access({ allowedRoles: ['admin'] }),
    delete: access({ allowedRoles: ['admin'] }),
  },
  fields: [
    { name: 'type', type: 'text', required: false },
    { name: 'room', type: 'text', required: false },
    { name: 'date', type: 'text', required: false },
    { name: 'time', type: 'text', required: false },
    { name: 'nights', type: 'text', required: false },
    { name: 'adults', type: 'text', required: false },
    { name: 'children', type: 'text', required: false },
    { name: 'comments', type: 'textarea', required: false },
    { name: 'treatment', type: 'text', required: false },
    { name: 'firstName', type: 'text', required: false },
    { name: 'lastName', type: 'text', required: false },
    { name: 'email', type: 'text', required: false },
    { name: 'phone', type: 'text', required: false },
    { name: 'country', type: 'text', required: false },
    { name: 'contact', type: 'text', required: false },
    { name: 'consent', type: 'text', required: false },
  ],
};
