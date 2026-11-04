import './galleries.css'
import { makePhone } from './phoneFrame.js'

// Turns a paragraph of back-to-back images in a case study into a gallery. It picks the style by itself:
//   - Tall images (phone screens, wireframes) become a scroll strip: images at their real shape in a row
//     you can drag or swipe, with a counter and a progress line underneath.
//   - Everything else (photos, research, website screenshots) becomes a bento grid: one big image and
//     smaller ones around it, with short captions as pills.
//   - To always get the scroll strip (say for full web pages), wrap the images in <div class="strip-gallery">.
//   - A single image gets the same rounded tile and viewer, shown whole at its own shape (no pill:
//     write a caption line under it instead).
// Clicking any image opens the full-size viewer. Captions come from each image's alt text:
// "Persona: Pat, the picky taster" shows "Persona" as the short caption and the whole thing in the viewer.
// Phone screens (any image shaped like a phone, about 1 wide by 2.2 tall) are put in the site's phone frame
// (an iPhone 18 Pro, see iphone.css). Other images get a soft shadow. To stop an image getting a phone frame
// (say it already has one drawn in), give it class="framed".
// Screens inside the process sections (<div class="process">) never get the phone frame: they're shown as
// the screen itself with the soft shadow, so the frame is saved for the finished design.
// Before/afters (<div class="compare">) made only of phone screens are sized so every screen is the same height.
// The look is in galleries.css.

const PORTRAIT = 0.8 // images narrower than this (width / height) count as tall screens
const isPhone = (ratio) => ratio > 0.38 && ratio < 0.56 // phone screens are about 0.46

// Wraps an image in the site's phone frame (iphone.css)
export function framePhone(img, ratio) {
  if (img.closest('.phone')) return
  const phone = makePhone(img)
  phone.style.setProperty('--ar', ratio.toFixed(4))
  const holder = img.closest('.gallery-image, figure')
  holder?.classList.add('has-phone')
  holder?.style.setProperty('--ar', ratio.toFixed(4))
}

const ratioOf = (src) => new Promise((resolve) => {
  const probe = new Image()
  probe.onload = () => resolve(probe.naturalWidth / probe.naturalHeight)
  probe.onerror = () => resolve(1)
  probe.src = src
})

// Images written straight into the case study (before/afters, rows of shots): phone screens get the
// phone frame, everything else gets the soft shadow
export function frameImages(root) {
  const images = [...root.querySelectorAll('.compare img, .shots img')].filter((img) => !img.dataset.framed)
  images.forEach((img) => {
    img.dataset.framed = 'true'   // only once (React's dev mode runs the page setup twice)
    img.dataset.inProcess = img.closest('.process') ? 'true' : ''   // checked now, before the case study layout unwraps the process section
  })
  const shapes = new Map(images.map((img) => [img, ratioOf(img.getAttribute('src'))]))
  images.forEach((img) => shapes.get(img).then((r) => {
    if (isPhone(r) && !img.dataset.inProcess && !img.classList.contains('framed')) framePhone(img, r)
    else img.classList.add('shadowed')
  }))
  // A before/after row of phone screens: every screen the same height (each takes its shape's share of the row)
  new Set(images.map((img) => img.closest('.compare')).filter(Boolean)).forEach((row) => {
    const rowImages = [...row.querySelectorAll('img')]
    Promise.all(rowImages.map((img) => shapes.get(img) || ratioOf(img.getAttribute('src')))).then((ratios) => {
      if (!ratios.every(isPhone)) return
      row.classList.add('same-height')
      rowImages.forEach((img, i) => img.closest('figure')?.style.setProperty('--ar', ratios[i].toFixed(4)))
    })
  })
}

const shortCaption = (alt) => {
  const [first] = alt.split(':')
  return first.length <= 40 ? first : alt
}

function imageButton(image, i, images, openViewer) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'gallery-image'
  button.setAttribute('aria-label', `Enlarge: ${image.alt || `image ${i + 1}`}`)
  const img = document.createElement('img')
  img.src = image.src
  img.alt = image.alt
  img.loading = 'lazy'
  img.draggable = false
  button.append(img)
  button.addEventListener('click', (e) => {
    if (button.closest('.strip')?.dataset.dragged) return e.preventDefault()
    openViewer(images, i)
  })
  return button
}

function buildBento(wrap, images, openViewer, ratios = []) {
  wrap.classList.add('bento')
  const n = images.length
  if (n === 1) wrap.classList.add('bento-one')
  const frame = !wrap.classList.contains('plain-screens')
  if (n === 1 && isPhone(ratios[0])) wrap.classList.add('bento-phone')
  if (n === 2) wrap.classList.add('bento-two')
  if (n === 4) wrap.classList.add('bento-four') // one big image on the left, three stacked on the right
  images.forEach((image, i) => {
    const figure = document.createElement('figure')
    figure.append(imageButton(image, i, images, openViewer))
    if (n === 1 && isPhone(ratios[0]) && frame) framePhone(figure.querySelector('img'), ratios[0])
    if (image.alt && n > 1) {
      const caption = document.createElement('figcaption')
      caption.textContent = shortCaption(image.alt)
      figure.append(caption)
    }
    wrap.append(figure)
  })
  // The first image is big (two columns, two rows). Stretch the last one so the grid has no gaps.
  if (n >= 5) {
    const left = (n - 3) % 3
    if (left === 1) wrap.lastChild.classList.add('span-3')
    if (left === 2) wrap.lastChild.classList.add('span-2')
  }
}

function buildStrip(wrap, images, openViewer, ratios = []) {
  wrap.classList.add('strip-wrap')
  const strip = document.createElement('div')
  strip.className = 'strip'
  const frame = !wrap.classList.contains('plain-screens')
  images.forEach((image, i) => {
    const figure = document.createElement('figure')
    figure.append(imageButton(image, i, images, openViewer))
    if (isPhone(ratios[i]) && frame) framePhone(figure.querySelector('img'), ratios[i])
    if (image.alt) {
      const caption = document.createElement('figcaption')
      caption.textContent = shortCaption(image.alt)
      figure.append(caption)
    }
    strip.append(figure)
  })

  const bar = document.createElement('div')
  bar.className = 'strip-bar'
  bar.innerHTML = `<span class="strip-count">1 / ${images.length}</span><span class="strip-progress"><i></i></span><span class="strip-hint">Drag or swipe</span>`
    + '<button type="button" class="strip-button" data-dir="-1" aria-label="Previous images"><span aria-hidden="true">‹</span></button>'
    + '<button type="button" class="strip-button" data-dir="1" aria-label="Next images"><span aria-hidden="true">›</span></button>'
  wrap.append(strip, bar)

  // Counter and progress line follow the scroll
  const count = bar.querySelector('.strip-count')
  const [prev, next] = bar.querySelectorAll('.strip-button')
  const fill = bar.querySelector('.strip-progress i')
  const update = () => {
    const end = strip.scrollWidth - strip.clientWidth
    const progress = end > 0 ? strip.scrollLeft / end : 1
    fill.style.width = `${Math.max(progress, strip.clientWidth / strip.scrollWidth) * 100}%`
    const figures = [...strip.children]
    const left = strip.getBoundingClientRect().left
    let current = figures.findIndex((f) => f.getBoundingClientRect().right - left > 40)
    if (progress > 0.98) current = figures.length - 1
    count.textContent = `${Math.max(current, 0) + 1} / ${figures.length}`
    wrap.classList.toggle('at-end', progress > 0.98)
    prev.disabled = strip.scrollLeft < 4
    next.disabled = progress > 0.98
  }
  strip.addEventListener('scroll', update, { passive: true })
  // Previous / next: move the strip by about one screen's worth of images
  ;[prev, next].forEach((button) => button.addEventListener('click', () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    strip.scrollBy({ left: Number(button.dataset.dir) * strip.clientWidth * 0.8, behavior: smooth ? 'smooth' : 'auto' })
  }))
  new ResizeObserver(update).observe(strip)

  // Drag with the mouse (touch screens already swipe)
  strip.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const start = { x: e.clientX, left: strip.scrollLeft }
    delete strip.dataset.dragged
    const move = (ev) => {
      const dx = ev.clientX - start.x
      if (Math.abs(dx) > 5) { strip.dataset.dragged = 'true'; strip.classList.add('dragging') }
      strip.scrollLeft = start.left - dx
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      strip.classList.remove('dragging')
      setTimeout(() => delete strip.dataset.dragged, 0) // after the click that ends a drag
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  })
}

// Rows of shots (<div class="shots">) and before/afters (<div class="compare">): every image becomes a button
// that opens the full-size viewer as an album of its row, so a before/after flips between its 2 or 3 steps.
// Before/afters also get an arrow between each step.
export function zoomRows(root, openViewer) {
  root.querySelectorAll('.shots:not([data-zoom]), .compare:not([data-zoom])').forEach((row) => {
    row.dataset.zoom = 'true'   // only once (React's dev mode runs the page setup twice)
    const imgs = [...row.querySelectorAll('img')]
    // In the viewer, a before/after's caption starts with its step ("Before: ...")
    const images = imgs.map((img) => {
      const step = row.classList.contains('compare') ? img.closest('figure')?.querySelector('figcaption')?.textContent.trim() : ''
      const alt = img.getAttribute('alt') || ''
      return { src: img.getAttribute('src'), alt: step ? `${step}: ${alt}` : alt }
    })
    imgs.forEach((img, i) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'zoom-button'
      button.setAttribute('aria-label', `Enlarge: ${images[i].alt || `image ${i + 1}`}`)
      img.replaceWith(button)
      button.append(img)
      button.addEventListener('click', () => openViewer(images, i))
    })
    if (row.classList.contains('compare')) {
      [...row.querySelectorAll(':scope > figure')].slice(1).forEach((figure) => {
        const arrow = document.createElement('span')
        arrow.className = 'compare-arrow'
        arrow.setAttribute('aria-hidden', 'true')
        arrow.textContent = '→'
        figure.before(arrow)
      })
    }
  })
}

export function makeGallery(p, openViewer) {
  const images = [...p.querySelectorAll(':scope > img')].map((img) => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' }))
  const wrap = document.createElement('div')
  wrap.className = 'gallery-wrap'
  if (p.closest('.process')) wrap.classList.add('plain-screens')   // process screens: no phone frame, soft shadow instead
  const asStrip = Boolean(p.closest('.strip-gallery'))
  p.replaceWith(wrap)

  // Check the images' shapes, then build the right kind of gallery
  Promise.all(images.map((image) => ratioOf(image.src))).then((r) => {
    const average = r.reduce((a, b) => a + b, 0) / r.length
    if ((asStrip || average < PORTRAIT) && images.length > 1) buildStrip(wrap, images, openViewer, r)
    else buildBento(wrap, images, openViewer, r)
  })
}
