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
          defaultValue: 'AI & Automation Agency',
        },
        {
          name: 'subheadline',
          type: 'text',
          defaultValue: 'Wdrażamy Automatyzację i AI w procesach sprzedaży.',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Kontakt',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          defaultValue: '/kontakt',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'badgeText',
          type: 'text',
          label: 'LLM Badge Text',
          defaultValue: 'Najpopularniejsze LLMy dla Twojej firmy',
        },
        {
          name: 'badgeSubtext',
          type: 'text',
          label: 'LLM Badge Subtext',
          defaultValue: 'Ponad 300 gotowych automatyzacji',
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
      label: 'Sales Booster Section',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          defaultValue: 'Sales Booster',
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
      label: 'AI Booster Section',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          defaultValue: 'AI Booster',
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
      label: 'Process Steps (Współpraca)',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          defaultValue: 'Trzy kroki\ndo udanej współpracy',
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
      label: 'Collaboration Banner (legacy — not shown in current design)',
      fields: [
        {
          name: 'title',
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
    {
      name: 'useCasesSection',
      type: 'group',
      label: 'Use Cases Preview',
      fields: [
        {
          name: 'eyebrowText',
          type: 'text',
          label: 'Eyebrow Label',
          defaultValue: 'Poznaj nasze wdrożenia',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          defaultValue: 'Booster Use Cases',
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
      label: 'CTA Section (legacy — not shown in current design)',
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
