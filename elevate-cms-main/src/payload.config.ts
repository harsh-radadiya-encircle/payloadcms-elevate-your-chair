import { buildConfig } from 'payload';
import { manager } from '@/payload/manager';
import { plugins } from '@/payload/plugins';

import path from 'path';
import { fileURLToPath } from 'url';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import sharp from 'sharp';

import { globals } from '@/globals';
import { collections } from '@/collections';
import { NewsletterSubscribers } from './collections/NewsletterSubscribers';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  globals: [...globals],
  collections: [...collections, NewsletterSubscribers],
  sharp,
  admin: {
    user: collections.find((collection) => collection.slug === 'users')?.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: 'default',
    meta: manager.meta,
    components: manager.components,
  },
  upload: manager.upload,
  secret: process.env.PAYLOAD_SECRET ?? '',
  editor: lexicalEditor(),
  cors: manager.cors,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? '',
  }),
  plugins: plugins,
});
