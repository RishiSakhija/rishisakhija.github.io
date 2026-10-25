import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().default(false),
    paperUrl: z.string().url().optional(),
    codeUrl: z.string().url().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    readingTime: z.string(),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

export const collections = { research, blog };