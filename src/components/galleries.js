import './galleries.css'

// Turns a paragraph of back-to-back images in a case study into a gallery. It picks the style by itself:
//   - Tall images (phone screens, wireframes) become a scroll strip: images at their real shape in a row
//     you can drag or swipe, with a counter and a progress line underneath.
//   - Everything else (photos, research, website screenshots) becomes a bento grid: one big image and
//     smaller ones around it, with short captions as pills.
// Clicking any image opens the full-size viewer. Captions come from each image's alt text:
// "Persona: Pat, the picky taster" shows "Persona" as the short caption and the whole thing in the viewer.
// The look is in galleries.css.

const PORTRAIT = 0.8 // images narrower than this (width / height) count as tall screens

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

function buildBento(wrap, images, openViewer) {
  wrap.classList.add('bento')
  const n = images.length
  if (n === 2) wrap.classList.add('bento-two')
  if (n === 4) wrap.classList.add('bento-four') // one big image on the left, three stacked on the right
  images.forEach((image, i) => {
    const figure = document.createElement('figure')
    figure.append(imageButton(image, i, images, openViewer))
    if (image.alt) {
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

function buildStrip(wrap, images, openViewer) {
  wrap.classList.add('strip-wrap')
  const strip = document.createElement('div')
  strip.className = 'strip'
  images.forEach((image, i) => {
    const figure = document.createElement('figure')
    figure.append(imageButton(image, i, images, openViewer))
    if (image.alt) {
      const caption = document.createElement('figcaption')
      caption.textContent = shortCaption(image.alt)
      figure.append(caption)
    }
    strip.append(figure)
  })

  const bar = document.createElement('div')
  bar.className = 'strip-bar'
  bar.innerHTML = `<span class="strip-count">1 / ${images.length}</span><span class="strip-progress"><i></i></span><span class="strip-hint">Drag or swipe →</span>`
  wrap.append(strip, bar)

  // Counter and progress line follow the scroll
  const count = bar.querySelector('.strip-count')
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
  }
  strip.addEventListener('scroll', update, { passive: true })
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

export function makeGallery(p, openViewer) {
  const images = [...p.querySelectorAll(':scope > img')].map((img) => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' }))
  const wrap = document.createElement('div')
  wrap.className = 'gallery-wrap'
  p.replaceWith(wrap)

  // Check the images' shapes, then build the right kind of gallery
  const ratios = images.map((image) => new Promise((resolve) => {
    const probe = new Image()
    probe.onload = () => resolve(probe.naturalWidth / probe.naturalHeight)
    probe.onerror = () => resolve(1)
    probe.src = image.src
  }))
  Promise.all(ratios).then((r) => {
    const average = r.reduce((a, b) => a + b, 0) / r.length
    if (average < PORTRAIT) buildStrip(wrap, images, openViewer)
    else buildBento(wrap, images, openViewer)
  })
}
