import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

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

// Separate from `projects` above: this holds lightweight grid-card metadata
// for the /projects listing, not full dedicated pages. A card's optional
// `detailSlug` may reference an id in the `projects` collection - the
// projects page only renders that link when a matching entry exists there.
const projectCards = defineCollection({
  loader: file('src/content/project-cards.yaml'),
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
    tags: z.array(z.string()).default([]),
    media: z.object({
      type: z.enum(['image', 'video']),
      src: z.string(),
      alt: z.string(),
    }),
    links: z
      .object({
        code: z.string().url().optional(),
        paper: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .default({}),
    detailSlug: z.string().optional(),
  }),
});

export const collections = { projects, projectCards };
