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
    CaseStudy.jsx      the template every case study uses (title, details, ending, image viewer)
  case-studies/      one Markdown file per case study (yumgo.md, ciut-upgrade.md, foundcloud.md)
  projects.js        the list of projects: title, date, thumbnail, summary, and the
                     Role / Team / Timeline / Tools details shown at the top of each case study
  site.js            email, LinkedIn and resume links
  components/
    Header.jsx         top menu (+ phone burger menu)
    Footer.jsx
    Layout.jsx         wraps every page; runs the fade-up animation
    ProjectCard.jsx    project cards on Home + Projects
    cleanLayout.js/.css  the case study layout: label column, badges, My part, colours
    galleries.js/.css    case study galleries (bento grid + scroll strip)
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
| `## Overview` | Starts a new section. The name becomes the small label in the left column |
| `<p class="my-part">What I did</p>` right under a `##` | A red **My part** note under the section's label. Keep it to one short line |
| `### Big heading` | The section's big heading |
| `#### Subheading` | Smaller heading |
| `> **Title**` then `> text` on the next line | Big takeaway box with a purple title (purple = insight) |
| `*italic line*` | Grey caption text |
| `![caption](/images/folder/file.jpg)` | A single image |
| 2+ images on back-to-back lines | A gallery, picked automatically. Tall images (phone screens, wireframes) become a **scroll strip** you can drag or swipe; everything else becomes a **bento grid** (one big image, smaller ones around it). The text in `[ ]` is the caption: anything before a `:` is the short label, and the full text shows in the full-screen viewer. Put the image you want biggest first |
| A bullet list where every item starts with `**bold**` | Cards, two per row, each with a round badge. The bold part is the card title, the rest is the description |
| `- ![](/images/icon.png) **Title** text` | Your icon, turned white, inside the badge |
| `- **!Title** text` | A **problem** card: orange badge (`!` if there's no icon) |
| `- **+Title** text` | An **opportunity** card: green badge (`+` if there's no icon) |

**Colours mean something** (and a small key above the first section says so): red = my part, orange = problem, green = solution, purple = insight. They're set at the top of `src/components/cleanLayout.css`.

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
Overview (summary cards) → Result (prototype + "What came out of it") → **the process section** → Reflection, then a link row and "Next project" at the end.

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

The process section. Every `##` section between the two `div` lines gets a numbered label ("Process · 01", "Process · 02"...). Start it with `## The process`, and link each step to a section below (the link is the section's `##` name in lowercase, with dashes for spaces):

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

**The ending of a case study:** set these in the project's entry in `src/projects.js` (leave them out to skip that row):

```js
link: 'https://...',             // where the button goes
linkLabel: 'Live project',       // the small label on the left ("Prototype", "Live project"...)
linkText: 'Try it yourself.',    // one line next to it
linkButton: 'Visit site',        // the button text
```

"Next project" picks the next project in the list automatically (and wraps around to the first). To bring back the older case study look for one project, add `theme: 'classic'`.

**Change the case study layout's spacing:** at the top of `src/components/cleanLayout.css`, `--row-space` is the space above and below each section and `--label-gap` is the space between the label column and the content. Gallery sizes are at the top of `src/components/galleries.css` (`--bento-row`, `--strip-height`).

**Add a project:** add an entry to `src/projects.js`, then create `src/case-studies/<slug>.md` (the file name must match the slug) and put its images in `public/images/<slug>/`.

**Change the Cover Flow songs (About page):** edit the list in `src/songs.js`, then run `npm run songs`. It looks each song up on Apple Music and saves the album art and 30-second preview into `src/songs-data.json` (commit that file too). If it picks the wrong version of a song, add that song's Apple Music `id` (see the note at the top of `songs.js`).

**Change spacing inside case study sections:** at the top of `src/styles.css`, `--flow` is the space between paragraphs, `--block-gap` is the space around blocks (card groups, callouts, images, galleries, before/afters, prototypes, numbered lists), and `--heading-gap` is the space under a big section heading. Phone values are in the "Phones" block just after.

**Change colours/fonts/sizes/timing:** edit the variables at the top of `src/styles.css`. Text sizes follow the Major Third scale (each size is 1.25× the one below it): change `--base` to scale everything together, or change which step a kind of text uses (`--h1`, `--h2`, `--h-page`, `--h-section`…) right below it. Phone sizes are in the "Phones" block just after. `--fast` and `--slow` control every hover and animation.

**Animations:** add `className="reveal"` to anything to make it fade up as it scrolls into view. Every block in a case study does this automatically.

**Images:** keep them under ~2400px wide; use JPG for photos, PNG for flat graphics. Tall images in a gallery become a scroll strip automatically.

**Page titles, descriptions and link previews:** what shows in the browser tab, in Google, and in the preview card when someone shares a link (iMessage, LinkedIn, Slack...).
- Home, About, Projects and Resume: edit `pages` at the bottom of `src/site.js`.
- Case studies: they use the project's `title` and `summary` from `src/projects.js`.
- Preview images are 1200 x 630 JPGs in `public/images/share/`: `default.jpg` (your headshot card, used everywhere except case studies) and one per case study, named after its slug (`yumgo.jpg`...). To swap one, replace the file and keep the name. A project can also point to a different image with `shareImage: '/images/share/...'` in `projects.js`.
- The build also makes `sitemap.xml` and `robots.txt` (every page, for Google), and a plain-text copy of each page for search engines that don't run JavaScript. New case studies are included automatically.
- Previews are written into each page when the site builds (`scripts/make-pages.mjs`), so changes show up after you push. Sites like LinkedIn remember old previews for a while; https://www.linkedin.com/post-inspector/ refreshes it.

## Publishing

Pushing to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).
One-time setup: GitHub repo → **Settings → Pages → Source → GitHub Actions**.
`public/CNAME` keeps the taylorfergusson.com domain.
