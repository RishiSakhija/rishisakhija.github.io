import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const howIWork = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/how-i-work' }),
  schema: z.object({
    title: z.string(),
    text: z.string(),
    icon: z.string(),
  }),
});

const latestContent = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/latest-content' }),
  schema: z.object({
    type: z.string(),
    label: z.string(),
    title: z.string(),
    text: z.string(),
    chips: z.array(z.string()),
    href: z.string(),
    icon: z.string(),
  }),
});

export const collections = { howIWork, latestContent };