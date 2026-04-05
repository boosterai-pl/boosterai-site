import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
        },
        {
          name: 'subheadline',
          type: 'text',
        },
        {
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'salesBooster',
      type: 'group',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
        },
        {
          name: 'sectionSubtitle',
          type: 'richText',
        },
        {
          name: 'services',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'aiBooster',
      type: 'group',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
        },
        {
          name: 'sectionSubtitle',
          type: 'richText',
        },
        {
          name: 'services',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'processSteps',
      type: 'group',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
        },
        {
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'number',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
        },
        {
          name: 'buttonLabel',
          type: 'text',
        },
        {
          name: 'buttonUrl',
          type: 'text',
        },
      ],
    },
  ],
}
