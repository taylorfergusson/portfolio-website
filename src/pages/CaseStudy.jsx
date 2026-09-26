import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { projects } from '../projects.js'
import NotFound from './NotFound.jsx'

// Loads every .md file in src/case-studies/ as text
const caseStudies = import.meta.glob('../case-studies/*.md', { query: '?raw', import: 'default', eager: true })

// Turns a paragraph of back-to-back images into a swipeable row of equal tiles.
// Each tile shows the image's alt text as a caption and opens the viewer when clicked.
function makeGallery(p, openViewer) {
  const images = [...p.querySelectorAll(':scope > img')].map((img) => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' }))

  const row = document.createElement('div')
  row.className = 'gallery'
  images.forEach((image, i) => {
    const tile = document.createElement('figure')
    tile.className = 'tile'
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'tile-button'
    button.setAttribute('aria-label', `Enlarge: ${image.alt || `image ${i + 1}`}`)
    const img = document.createElement('img')
    img.src = image.src
    img.alt = image.alt
    img.loading = 'lazy'
    button.append(img)
    button.addEventListener('click', () => openViewer(images, i))
    tile.append(button)
    if (image.alt) {
      const caption = document.createElement('figcaption')
      caption.textContent = image.alt
      tile.append(caption)
    }
    row.append(tile)
  })

  // Tall images (like phone screens) get tall tiles; everything else gets wide tiles
  Promise.all([...row.querySelectorAll('img')].map((img) => img.decode().catch(() => {}))).then(() => {
    const imgs = [...row.querySelectorAll('img')].filter((img) => img.naturalWidth)
    const average = imgs.reduce((sum, img) => sum + img.naturalWidth / img.naturalHeight, 0) / (imgs.length || 1)
    if (average < 0.8) row.classList.add('portrait')
  })

  // Fade out whichever edge has more images beyond it
  const updateFade = () => {
    const end = row.scrollWidth - row.clientWidth
    row.classList.toggle('more-left', row.scrollLeft > 4)
    row.classList.toggle('more-right', row.scrollLeft < end - 4)
  }
  row.addEventListener('scroll', updateFade, { passive: true })
  new ResizeObserver(updateFade).observe(row)

  const controls = document.createElement('div')
  controls.className = 'gallery-controls'
  for (const [label, direction, symbol] of [['Previous images', -1, '‹'], ['Next images', 1, '›']]) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'gallery-button'
    b.setAttribute('aria-label', label)
    b.textContent = symbol
    b.addEventListener('click', () => row.scrollBy({ left: direction * row.clientWidth * 0.6, behavior: 'smooth' }))
    controls.append(b)
  }

  const wrap = document.createElement('div')
  wrap.className = 'gallery-wrap'
  wrap.append(row, controls)
  p.replaceWith(wrap)
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const markdown = caseStudies[`../case-studies/${slug}.md`]
  const proseRef = useRef(null)
  const viewerRef = useRef(null)
  const [sections, setSections] = useState([])
  const [active, setActive] = useState('')
  const [viewer, setViewer] = useState(null) // { images, index } while an image is enlarged

  // Once the Markdown is on the page: give each ## section an id for the side menu,
  // and turn rows of images into galleries
  useEffect(() => {
    const prose = proseRef.current
    if (!prose) return
    const found = [...prose.querySelectorAll('h2')].map((h) => {
      h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { id: h.id, label: h.textContent }
    })
    setSections(found)
    prose.querySelectorAll('p').forEach((p) => {
      if (p.querySelectorAll(':scope > img').length >= 2) {
        makeGallery(p, (images, index) => setViewer({ images, index }))
      }
    })
  }, [slug])

  // Highlight the section you're currently reading in the side menu
  useEffect(() => {
    const onScroll = () => {
      let current = sections[0]?.id
      for (const s of sections) {
        const heading = document.getElementById(s.id)
        if (heading && heading.getBoundingClientRect().top < window.innerHeight * 0.4) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  // Image viewer: open it, and let the arrow keys step through the images
  useEffect(() => {
    const dialog = viewerRef.current
    if (!viewer || !dialog) return
    if (!dialog.open) dialog.showModal()
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewer])

  const step = (direction) =>
    setViewer((v) => v && { ...v, index: (v.index + direction + v.images.length) % v.images.length })
  const closeViewer = () => viewerRef.current?.close()

  if (!project || !markdown) return <NotFound />

  const current = viewer && viewer.images[viewer.index]

  return (
    <article className="case-study container">
      {/* Side menu of sections (desktop only) */}
      {sections.length > 0 && (
        <nav className="cs-nav" aria-label="Case study sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={s.id === active ? 'current' : ''}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="cs-main">
        <h1 className="reveal">{project.title}</h1>
        <dl className="details reveal">
          {Object.entries(project.details).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <img src={project.thumbnail} alt="" className="banner reveal" />

        {/* The case study itself, written in Markdown */}
        <div className="prose" ref={proseRef} dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} />

        <p className="back-row">
          <Link to="/case-study" className="text-link back"><span className="chevron" aria-hidden="true">‹</span> All projects</Link>
        </p>
      </div>

      {/* Full-size image viewer. Esc or clicking outside the image closes it. */}
      <dialog
        ref={viewerRef}
        className="viewer"
        aria-label="Image viewer"
        onClose={() => setViewer(null)}
        onClick={(e) => { if (e.target === e.currentTarget) closeViewer() }}
      >
        {current && (
          <>
            <figure className="viewer-figure">
              <img src={current.src} alt={current.alt} />
              {current.alt && <figcaption>{current.alt}</figcaption>}
            </figure>
            <button type="button" className="viewer-close" aria-label="Close" onClick={closeViewer}>×</button>
            {viewer.images.length > 1 && (
              <>
                <button type="button" className="viewer-prev" aria-label="Previous image" onClick={() => step(-1)}>‹</button>
                <button type="button" className="viewer-next" aria-label="Next image" onClick={() => step(1)}>›</button>
                <p className="viewer-count">{viewer.index + 1} / {viewer.images.length}</p>
              </>
            )}
          </>
        )}
      </dialog>
    </article>
  )
}
