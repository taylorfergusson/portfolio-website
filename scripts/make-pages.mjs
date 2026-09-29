// Runs after `vite build` (see "build" in package.json). It makes the site easy for search engines and link previews:
//
//   1. Each page gets its own copy of index.html with its title, description and preview image written in.
//      (Link previews and most crawlers don't run the site's JavaScript, so they only see what's in the file.)
//   2. Each page's file also gets a plain-HTML version of its content (heading, text, links to every page,
//      and the full text of case studies) for crawlers. Visitors never see it: the site replaces it the moment it loads.
//   3. sitemap.xml and robots.txt, which list every page for Google and other search engines.
//
// The words come from src/site.js, src/projects.js and src/case-studies/; nothing to edit here.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { marked } from 'marked'
import { pageMeta, allPaths } from '../src/meta.js'
import { siteName, siteUrl, email, linkedin, resumePdf, pages } from '../src/site.js'
import { projects } from '../src/projects.js'

const template = readFileSync('dist/index.html', 'utf8')
const START = '<!-- page-meta -->'
const END = '<!-- /page-meta -->'
const ROOT = '<div id="root"></div>'
if (!template.includes(START) || !template.includes(END)) throw new Error(`index.html needs ${START} and ${END} around its page tags`)
if (!template.includes(ROOT)) throw new Error(`index.html needs an empty ${ROOT}`)

const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ---------- 1. Title, description and link preview ----------
function headTags(path, meta, { noindex = false } = {}) {
  const image = siteUrl + meta.image
  const tags = [
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
  ]
  // On the home page: tell Google who the site belongs to
  if (path === '/') {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', name: siteName, url: `${siteUrl}/` },
        {
          '@type': 'Person',
          name: siteName,
          url: `${siteUrl}/`,
          image: siteUrl + meta.image,
          jobTitle: 'UX Designer and Researcher',
          description: pages['/'].description,
          email: `mailto:${email}`,
          address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
          sameAs: [linkedin],
        },
      ],
    }
    tags.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}

// ---------- 2. Plain-HTML content for crawlers ----------
const link = (path, text) => `<a href="${path === '/' ? '/' : `${path}/`}">${escape(text)}</a>`
const projectList = () =>
  '<ul>' + projects.map((p) => `<li>${link(`/case-study/${p.slug}`, p.title)}: ${escape(p.summary)}</li>`).join('') + '</ul>'

function bodyContent(path, meta) {
  const project = projects.find((p) => `/case-study/${p.slug}` === path)
  let main
  if (project) {
    const markdown = readFileSync(`src/case-studies/${project.slug}.md`, 'utf8')
    main = `<h1>${escape(project.title)}</h1><p>${escape(project.summary)}</p>${marked.parse(markdown)}`
  } else if (path === '/') {
    main = `<h1>${escape(siteName)}</h1><p>${escape(meta.description)}</p><h2>Projects</h2>${projectList()}`
  } else if (path === '/case-study') {
    main = `<h1>Projects</h1><p>${escape(meta.description)}</p>${projectList()}`
  } else if (path === '/resume') {
    main = `<h1>Resume</h1><p>${escape(meta.description)}</p><p><a href="${resumePdf}">Download Taylor Fergusson's resume (PDF)</a></p>`
  } else if (path === '/about') {
    main = `<h1>About me</h1><p>${escape(meta.description)}</p>`
  } else {
    main = '<h1>Page not found</h1>'
  }
  const nav = `<nav>${link('/', 'Home')} ${link('/about', 'About')} ${link('/case-study', 'Projects')} ${link('/resume', 'Resume')}</nav>`
  const footer = `<footer><a href="mailto:${email}">${escape(email)}</a> <a href="${linkedin}">LinkedIn</a></footer>`
  // "hidden" keeps it invisible for the split second before the site loads and replaces it
  return `<div id="root"><div hidden>${nav}<main>${main}</main>${footer}</div></div>`
}

const page = (path, meta, options) =>
  (template.slice(0, template.indexOf(START)) + headTags(path, meta, options) + template.slice(template.indexOf(END) + END.length))
    .replace(ROOT, bodyContent(path, meta))

for (const path of allPaths) {
  const folder = path === '/' ? 'dist' : `dist${path}`
  mkdirSync(folder, { recursive: true })
  writeFileSync(`${folder}/index.html`, page(path, pageMeta(path)))
  console.log(`  page ${path}`)
}
// Any other address still opens the site (it shows the "Page not found" page), but isn't listed on Google
writeFileSync('dist/404.html', page('/404', pageMeta('/404'), { noindex: true }))
console.log('  page 404')

// ---------- 3. sitemap.xml and robots.txt ----------
const today = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allPaths.map((path) => `  <url><loc>${pageMeta(path).url}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n')
writeFileSync('dist/sitemap.xml', sitemap)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log('  sitemap.xml + robots.txt')
