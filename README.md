# Andrew Tan's portfolio

My personal site: a short intro, the projects I've built and the places I've worked.

## Built with

- **[Astro](https://astro.build)** for the pages, content collections and page transitions
- **TypeScript** for the scene and the theme switcher
- **Plain CSS** with variables for the themes. No UI framework and no CSS library.
- **Canvas** for the dotted scene, drawn by hand without a graphics library
- **Markdown** for all the writing
- **Geist and Geist Mono** for the type

## What's in it

- **Split layout.** An animated dotted scene with my name on the left, the writing on the right. On a phone the scene sits on top.
- **Dithered scene.** The left side is a canvas drawn dot by dot in the theme's two colours.
- **Three themes.** `vesper`, `dark` and `light`. The button in the bottom-right corner cycles through them and the choice is remembered. Vesper is the default because it's my favourite, and it's the theme I use in VS Code.
- **Content in markdown.** Every project and job is one markdown file, which becomes a row on the home page and a page of its own.
- **Page transitions.** Moving between pages slides the right side and keeps the scene in place. `Esc` goes back.

## Structure

```text
public/                 favicon
src/
├── content/
│   ├── pages/          the intro and contact text on the home page
│   ├── projects/       one markdown file per project
│   └── experience/     one markdown file per job
├── content.config.ts   the fields each markdown file must have
├── layouts/Split.astro the page shell: scene, name plate, theme button
├── pages/
│   ├── index.astro     home page
│   ├── projects/[id].astro
│   └── experience/[id].astro
├── scripts/dither.ts   draws the dotted scene
└── styles/global.css   all the styles and theme colours
```
