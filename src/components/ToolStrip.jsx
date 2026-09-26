import { useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from 'motion/react'

// How fast the strip scrolls on its own (pixels per second)
const SPEED = 40
// How quickly a fling slows back down to the normal speed (higher = slows faster)
const FRICTION = 2

// The scrolling row of app icons. It scrolls by itself, and visitors can
// grab it and fling it sideways; it glides, slows down, then carries on.
export default function ToolStrip({ tools }) {
  const x = useMotionValue(0)
  const trackRef = useRef(null)
  const velocity = useRef(-SPEED)
  const pointer = useRef(null) // set while someone is dragging
  const reduceMotion = useReducedMotion()
  const normalSpeed = reduceMotion ? 0 : -SPEED

  // Runs every frame
  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta / 1000, 0.05)
    if (!pointer.current) {
      // Ease the speed back towards the normal auto-scroll speed
      velocity.current += (normalSpeed - velocity.current) * Math.min(1, FRICTION * dt)
      x.set(x.get() + velocity.current * dt)
    }
    // The icons are listed twice; wrapping by half the width makes the loop seamless
    const half = trackRef.current.scrollWidth / 2
    if (x.get() <= -half) x.set(x.get() + half)
    if (x.get() > 0) x.set(x.get() - half)
  })

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointer.current = { x: e.clientX, time: performance.now() }
    velocity.current = 0
  }

  const onPointerMove = (e) => {
    if (!pointer.current) return
    const now = performance.now()
    const dx = e.clientX - pointer.current.x
    const dt = Math.max((now - pointer.current.time) / 1000, 0.001)
    x.set(x.get() + dx)
    velocity.current = 0.8 * (dx / dt) + 0.2 * velocity.current // remember the speed for the fling
    pointer.current = { x: e.clientX, time: now }
  }

  const onPointerUp = () => {
    // If they held still before letting go, don't fling
    if (pointer.current && performance.now() - pointer.current.time > 100) velocity.current = 0
    pointer.current = null
  }

  return (
    <div
      className="marquee"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <motion.div className="marquee-track" ref={trackRef} style={{ x }}>
        {[...tools, ...tools].map((tool, i) => (
          <img
            key={i}
            src={`/images/tools/${tool}.svg`}
            alt={i < tools.length ? tool : ''}
            className="tool-icon"
            draggable={false}
          />
        ))}
      </motion.div>
    </div>
  )
}
