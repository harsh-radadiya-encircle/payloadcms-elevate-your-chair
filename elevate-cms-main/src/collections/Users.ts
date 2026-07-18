import type { CollectionConfig } from 'payload';
import { access } from '@/payload/helpers/rbac';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: 'Administration',
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'role', 'id'],
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    read: access({ allowSelf: true, allowedRoles: ['admin'] }),
    create: access({ allowedRoles: ['admin'] }),
    update: access({ allowSelf: true, allowedRoles: ['admin'] }),
    delete: access({ allowedRoles: ['admin'] }),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
      ],
    },
  ],
};
