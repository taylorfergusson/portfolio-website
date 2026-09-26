import { useEffect, useRef } from 'react'

// Colour blobs behind the hero, based on the colours of the gradient photo.
//   color:   the blob's colour
//   size:    width as a % of the hero's width
//   x, y:    where its centre sits, as % of the hero
//   drift:   which drifting animation it uses (drift-a, drift-b or drift-c in styles.css)
//   seconds: how long one drift takes (bigger = slower)
const BLOBS = [
  { color: '#f2301d', size: 55, x: 58, y: 95, drift: 'drift-a', seconds: 20 }, // red
  { color: '#f5842a', size: 38, x: 32, y: 88, drift: 'drift-b', seconds: 16 }, // orange
  { color: '#0f6a52', size: 42, x: 92, y: 30, drift: 'drift-c', seconds: 18 }, // green
  { color: '#2a36b0', size: 46, x: 96, y: 88, drift: 'drift-a', seconds: 22 }, // blue
  { color: '#8a2ec4', size: 36, x: 4, y: 12, drift: 'drift-c', seconds: 17 },  // purple
]

// How strong the colours are (0 = invisible, 1 = full). Keep it low so the black text stays easy to read.
const OPACITY = 0.45

// How the colours move out of the way of the mouse
const PUSH = 220     // how far a blob is pushed (pixels) when the mouse is right on it
const RADIUS = 0.4   // how close the mouse has to be to push a blob, as a fraction of the hero's width
const EASE = 0.06    // how quickly blobs move away and drift back (smaller = floatier)

export default function HeroBackground() {
  const rootRef = useRef(null)
  const blobRefs = useRef([])

  useEffect(() => {
    const root = rootRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!root || reduceMotion) return

    let mouse = null // mouse position in the hero, or null when it's elsewhere
    const onMove = (e) => {
      const r = root.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      mouse = inside ? { x: e.clientX - r.left, y: e.clientY - r.top } : null
    }
    const onLeave = () => { mouse = null }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    // Only animate while the hero is on screen
    let visible = true
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(root)

    const offsets = BLOBS.map(() => ({ x: 0, y: 0 }))
    let frame
    const tick = () => {
      if (visible) {
        const { width, height } = root.getBoundingClientRect()
        BLOBS.forEach((blob, i) => {
          // Push the blob directly away from the mouse; the closer the mouse, the stronger the push
          let tx = 0
          let ty = 0
          if (mouse) {
            const dx = (blob.x / 100) * width - mouse.x
            const dy = (blob.y / 100) * height - mouse.y
            const distance = Math.hypot(dx, dy) || 1
            const strength = Math.max(0, 1 - distance / (RADIUS * width))
            tx = (dx / distance) * strength * PUSH
            ty = (dy / distance) * strength * PUSH
          }
          const o = offsets[i]
          o.x += (tx - o.x) * EASE
          o.y += (ty - o.y) * EASE
          const el = blobRefs.current[i]
          if (el) el.style.transform = `translate(${o.x}px, ${o.y}px)`
        })
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="hero-bg" ref={rootRef} aria-hidden="true" style={{ '--blob-opacity': OPACITY }}>
      {BLOBS.map((blob, i) => (
        // Outer layer moves away from the mouse; inner layer drifts on its own
        <div
          key={i}
          className="hero-blob"
          ref={(el) => (blobRefs.current[i] = el)}
          style={{ width: `${blob.size}%`, left: `${blob.x}%`, top: `${blob.y}%` }}
        >
          <span style={{ '--color': blob.color, animation: `${blob.drift} ${blob.seconds}s ease-in-out infinite alternate` }} />
        </div>
      ))}
      <div className="hero-grain" />
    </div>
  )
}
