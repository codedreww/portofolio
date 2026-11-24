import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// scenes in dither.ts
const scene = z
  .enum(["hills", "sea", "rings", "windows", "bars"])
  .default("hills");

// Blocks of text on the home page (pages)
const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
  }),
});

// markdown file per project
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    scene,
    order: z.number().default(99), // lower numbers appear first
  }),
});

// markdown file per job experience
const experience = defineCollection({
  loader: glob({ base: "./src/content/experience", pattern: "*.md" }),
  schema: z.object({
    role: z.string(),
    place: z.string(),
    years: z.string(),
    scene,
    order: z.number().default(99),
  }),
});

export const collections = { pages, projects, experience };
