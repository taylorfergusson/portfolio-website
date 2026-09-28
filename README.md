# taylorfergusson.com

My portfolio site, built with React + Vite.

## Running it locally

Needs [Node.js](https://nodejs.org) 22.12 or newer.

```bash
npm install   # first time, and after pulling changes to package.json
npm run dev   # opens at http://localhost:5173 and updates as you save
```

## Where things live

```
src/
  pages/             one file per page. The text is written right in here, like HTML
    Home.jsx           hero words + tools list are at the top of this file
    About.jsx
    Projects.jsx
    CaseStudy.jsx      the template every case study uses (side menu, galleries, image viewer)
  case-studies/      one Markdown file per case study (yumgo.md, ciut-upgrade.md, foundcloud.md)
  projects.js        the list of projects: title, date, thumbnail, summary, and the
                     Role / Team / Timeline / Tools details shown at the top of each case study
  site.js            email, LinkedIn and resume links
  components/
    Header.jsx         top menu (+ phone burger menu)
    Footer.jsx
    Layout.jsx         wraps every page; runs the fade-up animation
    ProjectCard.jsx    project cards on Home + Projects
    HeroBackground.jsx moving colour blobs behind the home hero (colours + speed at the top)
    ToolStrip.jsx      draggable scrolling strip of tool icons
    FlingPhoto.jsx     the headshot you can fling around
    CoverFlow.jsx      iPod-style album browser on the About page
  styles.css         all the styling; colours, sizes and timing are at the top
public/images/       all images, one folder per project
```

## Common edits

**Change text on a page:** open the page in `src/pages/` and edit it like HTML (JSX uses `className` instead of `class`).

**Change a project's details** (title, date, Role, Team, Timeline, Tools…): edit its entry in `src/projects.js`. Any label you add under `details` shows up automatically.

**Edit a case study:** open `src/case-studies/<name>.md`. Cheat sheet:

| Write this | You get |
| --- | --- |
| `## Overview` | Small red section label. It's also the name in the side menu, so rename it here to rename it there |
| `### Big heading` | The section's big heading |
| `#### Subheading` | Smaller heading |
| `> **Title**` then `> text` on the next line | Grey callout box with a red title |
| `*italic line*` | Grey caption text |
| `![caption](/images/folder/file.jpg)` | A single image |
| 2+ images on back-to-back lines | A swipeable gallery. The text in `[ ]` becomes each caption, and clicking opens a full-screen viewer |
| A bullet list where every item starts with `**bold**` | Cards, two per row. The bold part is the card title, the rest is the description |
| `- ![](/images/icon.png) **Title** text` | A card with an icon on the left |
| `- **!Title** text` | A **problem** card, tinted brand orange |
| `- **+Title** text` | An **opportunity** card, tinted brand green |

A bigger callout that holds a whole story (text, images, before/after) as one box. Leave the blank lines in:

```md
<div class="callout-box">

**Mayday**

Text, images, a before/after…

</div>
```

Two lists back to back merge into one. To keep them separate, put a comment between them:

```md
- **First group** ...

<!-- keeps the lists separate -->

- **Second group** ...
```

Two columns side by side (e.g. Challenge / Outcome). Leave the blank lines in:

```html
<div class="columns">

#### The Challenge

Text...

#### The Outcome

Text...

</div>
```

Before / after images:

```html
<div class="compare">
<figure>
<figcaption>Before</figcaption>
<img src="/images/folder/before.jpg" alt="Describe it">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/folder/after.jpg" alt="Describe it">
</figure>
</div>
```

**Case study layout.** Every case study follows the same order, so they feel like a set:
Overview (summary cards) → Result (prototype + "What came out of it") → **the process section** (black, full width) → Reflection.

Summary cards, three across. `!` makes a problem card, `+` an opportunity card:

```md
<div class="summary">

- **!The problem** ...
- **Why it matters** ...
- **+The solution** ...

</div>
```

Big numbered list (outcomes, fixes, lessons). Each item is a bold title, then its text:

```md
<div class="numbered">

1. **Title** Text...
2. **Title** Text...

</div>
```

The process section. Everything between the two `div` lines gets a full-width black background (like the dark sections on the home page), and its sections are indented in the side menu. Its colours are set at the top of the "Process section" part of `styles.css`. Start it with `## The process`, and link each step to a section below (the link is the section's `##` name in lowercase, with dashes for spaces):

```md
<div class="process">

## The process

### How I got there

<div class="steps">

1. [Problem](#problem)
2. [Audit](#audit)

</div>

## Problem
...

</div>
```

Small extras:

| Write this | You get |
| --- | --- |
| `<p class="kicker">Fix 2 · Add context</p>` above a `####` | A small green label over the heading |
| A plain bullet list inside `<div class="chips">` ... `</div>` | Small grey pills |

**Add a project:** add an entry to `src/projects.js`, then create `src/case-studies/<slug>.md` (the file name must match the slug) and put its images in `public/images/<slug>/`.

**Change the Cover Flow songs (About page):** edit the list in `src/songs.js`, then run `npm run songs`. It looks each song up on Apple Music and saves the album art and 30-second preview into `src/songs-data.json` (commit that file too). If it picks the wrong version of a song, add that song's Apple Music `id` (see the note at the top of `songs.js`).

**Change spacing inside case study sections:** at the top of `src/styles.css`, `--flow` is the space between paragraphs, `--block-gap` is the space around blocks (card groups, callouts, images, galleries, before/afters, prototypes, numbered lists), and `--heading-gap` is the space under a big section heading. Phone values are in the "Phones" block just after.

**Change colours/fonts/sizes/timing:** edit the variables at the top of `src/styles.css`. Text sizes follow the Major Third scale (each size is 1.25× the one below it): change `--base` to scale everything together, or change which step a kind of text uses (`--h1`, `--h2`, `--h-page`, `--h-section`…) right below it. Phone sizes are in the "Phones" block just after. `--fast` and `--slow` control every hover and animation.

**Animations:** add `className="reveal"` to anything to make it fade up as it scrolls into view. Every block in a case study does this automatically.

**Images:** keep them under ~2400px wide; use JPG for photos, PNG for flat graphics. Tall images in a gallery are laid out as portrait tiles automatically.

## Publishing

Pushing to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).
One-time setup: GitHub repo → **Settings → Pages → Source → GitHub Actions**.
`public/CNAME` keeps the taylorfergusson.com domain.
