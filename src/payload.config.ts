import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { BlogPosts } from './collections/BlogPosts'
import { UseCases } from './collections/UseCases'
import { Categories } from './collections/Categories'
import { Homepage } from './globals/Homepage'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Booster AI',
      icons: [{ rel: 'icon', url: '/Blue-sygnet-with-background-1x1-1.png' }],
      openGraph: {
        images: [{ url: '/Booster-logo.png' }],
      },
    },
    components: {
      graphics: {
        Logo: '/src/components/admin/AdminLogo#default',
        Icon: '/src/components/admin/AdminIcon#default',
      },
    },
  },
  collections: [Pages, Media, Users, BlogPosts, UseCases, Categories],
  globals: [Homepage],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
    }),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
