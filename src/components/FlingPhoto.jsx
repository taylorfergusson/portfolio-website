import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate, useReducedMotion } from 'motion/react'

// Physics settings: tweak these to change how the photo behaves
const GRAVITY = 2600        // how strongly it falls (pixels per second²)
const BOUNCE = 0.5          // 0 = lands with a thud, 1 = bounces forever
const ROLL_FRICTION = 0.3   // how quickly it stops rolling along the bottom (lower = stops faster)
const SPIN = 0.3            // how much it spins as it moves sideways

// A photo visitors can grab and throw. It falls with gravity, bounces off the
// bottom and sides of the window, and springs back home when hovered or on scroll.
export default function FlingPhoto({ src, alt }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(0)
  const ref = useRef(null)
  const frame = useRef(null)
  const dragging = useRef(false)
  const releasedAt = useRef(0)
  const [flung, setFlung] = useState(false)
  const reduceMotion = useReducedMotion()

  const stopPhysics = () => cancelAnimationFrame(frame.current)

  // Spring back to its original spot
  const putBack = () => {
    stopPhysics()
    setFlung(false)
    const spring = { type: 'spring', stiffness: 180, damping: 18 }
    animate(x, 0, spring)
    animate(y, 0, spring)
    animate(rotate, 0, spring)
  }

  // Let go: fall with gravity from the speed it was thrown at
  const drop = (vx, vy) => {
    // Work out where the window's floor and walls are relative to the photo's home spot
    const r = ref.current.getBoundingClientRect()
    const home = { left: r.left - x.get(), right: r.right - x.get(), bottom: r.bottom - y.get() }
    const floor = Math.max(0, window.innerHeight - home.bottom)
    const leftWall = -home.left
    const rightWall = window.innerWidth - home.right

    let last = performance.now()
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.03)
      last = now
      vy += GRAVITY * dt
      let nx = x.get() + vx * dt
      let ny = y.get() + vy * dt

      if (ny >= floor) {                     // hit the bottom
        ny = floor
        vy = Math.abs(vy) < 80 ? 0 : -vy * BOUNCE
        vx *= Math.pow(ROLL_FRICTION, dt)    // rolling slows it down
      }
      if (nx < leftWall) { nx = leftWall; vx = -vx * BOUNCE }
      if (nx > rightWall) { nx = rightWall; vx = -vx * BOUNCE }

      x.set(nx)
      y.set(ny)
      rotate.set(rotate.get() + vx * dt * SPIN)

      const resting = ny === floor && vy === 0 && Math.abs(vx) < 5
      if (!resting) frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
  }

  // Scrolling puts it back
  useEffect(() => {
    if (!flung) return
    window.addEventListener('scroll', putBack, { passive: true })
    return () => window.removeEventListener('scroll', putBack)
  }, [flung])

  useEffect(() => stopPhysics, []) // stop the animation if the page changes

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      draggable={false}
      className={flung ? 'headshot flung' : 'headshot'}
      style={{ x, y, rotate }}
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.05 }}
      onDragStart={() => {
        dragging.current = true
        stopPhysics()
        setFlung(true)
      }}
      onDragEnd={(e, info) => {
        dragging.current = false
        releasedAt.current = performance.now()
        if (reduceMotion) putBack()
        else drop(info.velocity.x, info.velocity.y)
      }}
      onPointerEnter={() => {
        // Hovering puts it back (but not in the first moment after letting go)
        if (flung && !dragging.current && performance.now() - releasedAt.current > 700) putBack()
      }}
    />
  )
}
