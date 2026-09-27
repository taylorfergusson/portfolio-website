import { useEffect, useRef } from 'react'

// Colour blobs behind the hero, based on the colours of the gradient photo.
// Each blob does two things at once, which is what makes it feel liquid:
//   it wanders along a looping path, and its oval shape slowly turns and stretches.
//   color:   the blob's colour
//   size:    width as a % of the hero's width
//   x, y:    where its centre sits, as % of the hero
//   path:    which wandering path it follows (flow-a, flow-b or flow-c in styles.css)
//   seconds: how long one lap of the path takes (bigger = slower)
//   morph:   how long one full turn of its shape takes (bigger = slower)
// Odd, different timings keep the blobs from ever lining up, so the pattern never visibly repeats.
const BLOBS = [
  { color: '#BE3A30', size: 55, x: 85, y: 85, path: 'flow-a', seconds: 29, morph: 23 }, // red
  { color: '#C06234', size: 38, x: 60, y: 90, path: 'flow-b', seconds: 23, morph: 31 }, // orange
  { color: '#20665F', size: 42, x: 92, y: 30, path: 'flow-c', seconds: 31, morph: 19 }, // green
  { color: '#6D5699', size: 36, x: 4, y: 12, path: 'flow-b', seconds: 37, morph: 27 },  // purple
]

// How strong the colours are (0 = invisible, 1 = full). Keep it low so the black text stays easy to read.
const OPACITY = 0.5

// How the colours move out of the way of the mouse
const PUSH = 220      // how far a blob is pushed (pixels) when the mouse is right on it
const RADIUS = 0.3    // how close the mouse has to be to push a blob, as a fraction of the hero's width
const SPRING = 0.012  // how strongly blobs are pulled toward where they should be (bigger = snappier)
const DAMPING = 0.9   // how quickly the wobble settles (closer to 1 = more wobbly, like water)

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

    const offsets = BLOBS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
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
          // Spring motion: the blob speeds toward its target, overshoots a little and wobbles back, like water
          const o = offsets[i]
          o.vx = (o.vx + (tx - o.x) * SPRING) * DAMPING
          o.vy = (o.vy + (ty - o.y) * SPRING) * DAMPING
          o.x += o.vx
          o.y += o.vy
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
        // Three layers: the outer one moves away from the mouse, the middle one wanders, the inner one changes shape
        <div
          key={i}
          className="hero-blob"
          ref={(el) => (blobRefs.current[i] = el)}
          style={{ width: `${blob.size}%`, left: `${blob.x}%`, top: `${blob.y}%` }}
        >
          <span className="hero-drift" style={{ animation: `${blob.path} ${blob.seconds}s ease-in-out infinite` }}>
            <span
              className="hero-shape"
              style={{ '--color': blob.color, animation: `morph ${blob.morph}s linear infinite${i % 2 ? ' reverse' : ''}` }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}
