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
          defaultValue: [
            {
              title: 'Wsparcie sprzedaży B2B',
              description:
                'Wspieramy firmy, które chcą pozyskiwać więcej klientów B2B i zwiększać wyniki sprzedaży. Pomagamy optymalizować procesy, prowadzimy spersonalizowane kampanie i dopasowujemy strategie do rynku i sytuacji przedsiębiorstwa.',
            },
            {
              title: 'Generowanie leadów B2B',
              description:
                'Pozyskujemy wartościowe kontakty biznesowe, które zamieniamy w Twoich potencjalnych klientów.',
            },
            {
              title: 'Strategie sprzedaży B2B',
              description:
                'Tworzymy skuteczne strategie sprzedaży B2B, które pomagają osiągać lepsze wyniki i zdobywać przewagę na rynku.',
            },
            {
              title: "Wdrożenia CRM'ów",
              description:
                'Wdrażamy systemy CRM, które usprawniają zarządzanie sprzedażą i poprawiają efektywność zespołów handlowych.',
            },
            {
              title: 'Konsultacje',
              description:
                'Prowadzimy konsultacje, które pomagają usprawnić procesy sprzedażowe i osiągać lepsze wyniki biznesowe.',
            },
          ],
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
          defaultValue: [
            {
              title: 'AI w optymalizacji procesów',
              description:
                'Wykorzystujemy AI do optymalizacji procesów, zwiększając efektywność zespołów i automatyzując kluczowe obszary w przedsiębiorstwie.',
            },
            {
              title: 'AI Voice Boty',
              description:
                'Wdrażamy AI voice boty, które automatyzują obsługę klienta i wspierają procesy sprzedażowe.',
            },
            {
              title: 'AI Chat Boty',
              description:
                'Tworzymy AI chat boty, które usprawniają komunikację z klientami i wspierają działania sprzedażowe.',
            },
            {
              title: 'AI Document Processing',
              description:
                'Automatyzujemy przetwarzanie dokumentów, usprawniając zarządzanie danymi i oszczędzając czas.',
            },
            {
              title: 'Wdrożenia indywidualne',
              description:
                'Realizujemy indywidualne wdrożenia, dopasowane do specyfiki i potrzeb Twojego biznesu.',
            },
          ],
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
          name: 'manualCards',
          type: 'array',
          label: 'Manual Cards (shown when no Use Cases selected)',
          defaultValue: [
            {
              badge: 'Lead generation',
              title: 'Lead generation w startupie',
              date: '16 stycznia, 2025',
              excerpt:
                'Wyzwanie: Zbudowanie powtarzalnego procesu generowania leadów za pomocą kampanii outreachowych w…',
            },
            {
              badge: 'AI Voicebot',
              title: 'Inteligentny Voice-Bot w firmie usługowej',
              date: '8 stycznia, 2025',
              excerpt:
                'Wyzwanie: Klient stanął przed koniecznością zautomatyzowania procesu wstępnej kwalifikacji leadów pozyskiwanych…',
            },
          ],
          fields: [
            {
              name: 'badge',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'date',
              type: 'text',
            },
            {
              name: 'excerpt',
              type: 'textarea',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
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
