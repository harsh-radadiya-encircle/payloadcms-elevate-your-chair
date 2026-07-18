export const manager = {
  meta: {
    title: 'The Cole | CMS',
    description: 'The Cole',
    robots: 'noindex, nofollow',
    icons: [
      {
        rel: 'icon',
        type: 'image/svg',
        url: '/icon.svg',
      },
    ],
  },
  components: {
    graphics: {
      Icon: {
        path: '@/payload/components/Icon.tsx',
      },
      Logo: {
        path: '@/payload/components/Logo.tsx',
      },
    },
  },
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    focalPoint: true,
  },
  cors: ['http://localhost:3000', process.env.PAYLOAD_PUBLIC_SITE_URL ?? ''],
};
