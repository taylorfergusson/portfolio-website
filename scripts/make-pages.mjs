// Runs after `vite build` (see "build" in package.json).
// Link previews (iMessage, LinkedIn, Slack, Google...) don't run the site's JavaScript, so each page
// gets its own copy of index.html with its title, description and preview image written in.
// The words come from src/site.js and src/projects.js; nothing to edit here.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { pageMeta, allPaths } from '../src/meta.js'
import { siteName, siteUrl } from '../src/site.js'

const template = readFileSync('dist/index.html', 'utf8')
const START = '<!-- page-meta -->'
const END = '<!-- /page-meta -->'
if (!template.includes(START) || !template.includes(END)) throw new Error(`index.html needs ${START} and ${END} around its page tags`)

const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function tags(meta, { noindex = false } = {}) {
  const image = siteUrl + meta.image
  return [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${meta.url}" />`,
    `<meta property="og:site_name" content="${escape(siteName)}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escape(meta.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ')
}

const page = (meta, options) => template.slice(0, template.indexOf(START)) + tags(meta, options) + template.slice(template.indexOf(END) + END.length)

for (const path of allPaths) {
  const folder = path === '/' ? 'dist' : `dist${path}`
  mkdirSync(folder, { recursive: true })
  writeFileSync(`${folder}/index.html`, page(pageMeta(path)))
  console.log(`  page ${path}`)
}
// Any other address still opens the site (it shows the "Page not found" page), but isn't listed on Google
writeFileSync('dist/404.html', page(pageMeta('/404'), { noindex: true }))
console.log(`  page 404`)
