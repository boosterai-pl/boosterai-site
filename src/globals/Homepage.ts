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
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge Text',
        },
        {
          name: 'badgeSubtext',
          type: 'text',
          label: 'Badge Subtext',
        },
        {
          name: 'illustration',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Illustration',
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
      name: 'collaborationBanner',
      type: 'group',
      label: 'Collaboration Banner',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'useCasesSection',
      type: 'group',
      label: 'Use Cases Preview',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          defaultValue: 'Poznaj nasze wdrożenia',
        },
        {
          name: 'featuredCases',
          type: 'relationship',
          relationTo: 'use-cases',
          hasMany: true,
          maxRows: 2,
          label: 'Featured Use Cases',
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
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
      ],
    },
  ],
}
