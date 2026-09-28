import { pages, siteName, siteUrl, defaultShareImage } from './site.js'
import { projects } from './projects.js'

// Works out the title, description and preview image for a page.
// Used in the browser (the tab title) and by scripts/make-pages.mjs (link previews), so they always match.
// To change the words, edit `pages` in site.js, or a project's title and summary in projects.js.
export function pageMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'   // "/about/" and "/about" are the same page
  const url = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}/`

  const project = projects.find((p) => `/case-study/${p.slug}` === path)
  if (project) {
    return {
      title: `${project.title.replace(' - ', ': ')} – ${siteName}`,
      description: project.summary,
      image: project.shareImage || `/images/share/${project.slug}.jpg`,
      imageAlt: project.thumbnailAlt || project.title,
      type: 'article',
      url,
    }
  }

  const page = pages[path]
  if (page) {
    return {
      title: page.title,
      description: page.description,
      image: page.image || defaultShareImage,
      imageAlt: `Portrait of ${siteName}`,
      type: 'website',
      url,
    }
  }

  return { ...pageMeta('/'), title: `Page not found – ${siteName}`, notFound: true }
}

// Every page that gets its own link preview
export const allPaths = [...Object.keys(pages), ...projects.map((p) => `/case-study/${p.slug}`)]
