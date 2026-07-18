import type { Access } from 'payload';

type Role = 'admin' | 'editor' | 'author';

interface AccessProps {
  allowSelf?: boolean;
  allowedRoles?: Role[];
}

export const access = ({ allowSelf = false, allowedRoles = [] }: AccessProps): Access => {
  return ({ req, id }) => {
    const user = req.user;

    if (!user) return false;

    const isAdmin = user.role === 'admin';
    const isAllowedRole = allowedRoles.includes(user.role);
    const isSelf = allowSelf && id === user.id;

    return isAdmin || isAllowedRole || isSelf;
  };
};

export const isRole = (role: Role): Access => {
  return ({ req }) => {
    const user = req.user;
    return user ? user.role === role : false;
  };
};

export const isAdmin = (): Access => {
  return isRole('admin');
};

export const isEditor = (): Access => {
  return isRole('editor');
};

export const isAuthor = (): Access => {
  return isRole('author');
};
