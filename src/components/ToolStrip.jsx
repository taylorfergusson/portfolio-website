import { useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from 'motion/react'

// How fast the strip scrolls on its own (pixels per second)
const SPEED = 60
// How quickly a fling slows back down to the normal speed (higher = slows faster)
const FRICTION = 2
// How quickly the strip glides to a stop when the mouse is over it (higher = stops faster)
const HOVER_STOP = 3

// The scrolling row of app icons. It scrolls by itself, and visitors can
// grab it and fling it sideways; it glides, slows down, then carries on.
// Hovering over the strip gently brings it to a stop; hovering an icon shows the app's name.
export default function ToolStrip({ tools }) {
  const x = useMotionValue(0)
  const trackRef = useRef(null)
  const velocity = useRef(-SPEED)
  const pointer = useRef(null) // set while someone is dragging
  const hovering = useRef(false) // true while a mouse is over the strip
  const reduceMotion = useReducedMotion()
  const normalSpeed = reduceMotion ? 0 : -SPEED

  // Runs every frame
  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta / 1000, 0.05)
    if (!pointer.current) {
      // Ease the speed towards the normal auto-scroll speed, or towards a stop while hovered
      const target = hovering.current ? 0 : normalSpeed
      const ease = hovering.current ? HOVER_STOP : FRICTION
      velocity.current += (target - velocity.current) * Math.min(1, ease * dt)
      if (hovering.current && Math.abs(velocity.current) < 0.5) velocity.current = 0 // settle fully
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
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') hovering.current = true }}
      onPointerLeave={() => { hovering.current = false }}
    >
      <motion.div className="marquee-track" ref={trackRef} style={{ x }}>
        {/* The icons are listed twice for a seamless loop; the second copy is hidden from screen readers */}
        {[...tools, ...tools].map((tool, i) => {
          const copy = i >= tools.length
          return (
            <span className="tool" key={i} aria-hidden={copy || undefined}>
              <img src={`/images/tools/${tool.file}.svg`} alt={copy ? '' : tool.name} className="tool-icon" draggable={false} />
              <span className="tool-name" aria-hidden="true">{tool.name}</span>
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}
