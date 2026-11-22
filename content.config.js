import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // All regular pages (rendered by pages/c/[...slug].vue)
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['journal/**']
      }
    }),

    // Journal: one file per campaign (party status panel)
    campaigns: defineCollection({
      type: 'data',
      source: 'journal/campaigns/*.yml',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        subtitle: z.string().optional(),
        color: z.string(),
        order: z.number().default(1),
        party: z.array(z.object({
          name: z.string(),
          npc: z.boolean().optional(),
          notes: z.array(z.string()).optional()
        })).default([])
      })
    }),

    // Journal: one file per session -> /journal/<file-name>
    sessions: defineCollection({
      type: 'page',
      source: {
        include: 'journal/sessions/*.md',
        prefix: '/journal'
      },
      schema: z.object({
        campaign: z.string(),
        session: z.number(),
        played: z.string().optional(),
        summary: z.string(),
        leftOff: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        meanwhile: z.array(z.object({
          text: z.string(),
          to: z.string().optional()
        })).default([])
      })
    }),

    // Journal: quests and threads. campaign is a campaign id or "shared"
    quests: defineCollection({
      type: 'page',
      source: {
        include: 'journal/quests/*.md',
        prefix: '/journal/quests'
      },
      schema: z.object({
        campaign: z.string(),
        status: z.enum(['active', 'completed']).default('active'),
        order: z.number().default(100),
        tags: z.array(z.string()).default([])
      })
    })
  }
})
