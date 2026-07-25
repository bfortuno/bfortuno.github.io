import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Astro 7's content-layer API: `z` is no longer re-exported from
// 'astro:content' (as older Astro docs show) - it comes from 'astro/zod'.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string(),
      authors: z
        .array(
          z.object({
            name: z.string(),
            affiliations: z.array(z.number()),
            url: z.string().url().optional(),
          })
        )
        .min(1),
      affiliations: z.array(z.string()).min(1),
      heroImage: z.string().optional(),
      heroVideo: z.string().optional(),
      abstract: z.string(),
      methodFigure: z
        .object({
          image: z.string(),
          caption: z.string(),
        })
        .optional(),
      results: z
        .array(
          z.object({
            type: z.enum(['image', 'video']),
            src: z.string(),
            caption: z.string().optional(),
          })
        )
        .default([]),
      acknowledgements: z.string().optional(),
      bibtex: z.string().optional(),
    })
    .refine((data) => Boolean(data.heroImage) !== Boolean(data.heroVideo), {
      message: 'Exactly one of heroImage or heroVideo must be provided',
    }),
});

export const collections = { projects };
