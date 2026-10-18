import { useEffect, useRef, useState } from 'react'
import HeroBackground, { BLOBS } from './HeroBackground.jsx'

// Hero background: the same colour blobs as before, seen through fluted ("privacy") glass.
// The blobs drift, change shape and move away from the mouse underneath; a shader draws the glass on top.
// Colours, sizes and positions come from BLOBS in HeroBackground.jsx. The glass is tuned here:
const STRIP = 15        // width of one glass strip, in pixels (smaller = finer)
const BEND = 9          // how much each strip stretches the colours behind it (bigger = more streaky)
const OPACITY = 0.55    // how strong the colours are (keep it light enough for the black text)
const GRAIN = 0.015     // film grain on the glass
const CALM = 0.5        // how much the glass is smoothed out so text stays easy to read (0 = full glass, 1 = no glass)
const SEAM = 0.25       // how bright the thin lines between strips are
const PUSH = 220        // how far a blob is pushed (pixels) when the mouse is right on it
const RADIUS = 0.3      // how close the mouse has to be to push a blob, as a fraction of the hero's width
const SPRING = 0.012    // how strongly blobs are pulled back (bigger = snappier)
const DAMPING = 0.9     // how quickly the wobble settles (closer to 1 = more wobbly)

// Wandering paths and shape-shifting, the same loops as flow-a/b/c and morph in styles.css
// [time 0-1, x %, y %, scale]
const PATHS = {
  'flow-a': [[0, -12, 8, 1], [0.25, 6, -10, 1.2], [0.5, 16, 4, 0.95], [0.75, -2, 14, 1.12], [1, -12, 8, 1]],
  'flow-b': [[0, 10, -8, 1.1], [0.2, -6, -14, 0.92], [0.45, -16, 6, 1.18], [0.7, 4, 14, 0.98], [1, 10, -8, 1.1]],
  'flow-c': [[0, -4, 12, 0.95], [0.3, 12, 2, 1.22], [0.55, 6, -14, 1.02], [0.8, -12, -4, 1.14], [1, -4, 12, 0.95]],
}
const MORPH = [[0, 0, 1.35, 0.8], [1 / 3, 120, 0.9, 1.2], [2 / 3, 240, 1.25, 0.9], [1, 360, 1.35, 0.8]] // [time, degrees, scaleX, scaleY]

const ease = (t) => t * t * (3 - 2 * t)
function sample(keys, t, easeIn) {
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (t >= a[0] && t <= b[0]) {
      const k = (t - a[0]) / (b[0] - a[0])
      const e = easeIn ? ease(k) : k
      return a.slice(1).map((v, j) => v + (b[j + 1] - v) * e)
    }
  }
  return keys[0].slice(1)
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)

const VERT = `attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }`
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uStrip, uBend, uOp, uGrain, uT, uCalm, uSeam;
uniform vec3 uM;
uniform vec4 uB[${BLOBS.length}];   // centre x, centre y, 1 / radius, unused
uniform vec4 uA[${BLOBS.length}];   // cos, sin, scale x, scale y
uniform vec3 uC[${BLOBS.length}];

vec3 field(vec2 p) {
  vec3 c = vec3(1.0);
  for (int i = 0; i < ${BLOBS.length}; i++) {
    vec2 d = p - uB[i].xy;
    vec2 q = vec2(uA[i].x * d.x + uA[i].y * d.y, -uA[i].y * d.x + uA[i].x * d.y) / uA[i].zw;
    float t = length(q) * uB[i].z;
    float a = t < 0.38 ? mix(1.0, 0.55, t / 0.38) : mix(0.55, 0.0, clamp((t - 0.38) / 0.32, 0.0, 1.0));
    c = mix(c, uC[i], a * uOp);
  }
  return c;
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float w = uStrip;
  float cell = floor(p.x / w);
  float f = fract(p.x / w);
  float md = length(p - uM.xy) / (uRes.x * 0.16);
  float near = uM.z * exp(-md * md);
  // Each strip acts like a small cylindrical lens: it shows a stretched slice of the colours behind it
  float s = (f - 0.5) * 2.0;
  float lens = sign(s) * pow(abs(s), 1.35);
  float disp = lens * w * (uBend + near * 5.0);
  float wob = sin(p.y * 0.0035 + cell * 0.55 + uT * 0.25) * w * 0.8;
  vec2 base = vec2(cell * w + w * 0.5, p.y);
  base.x += wob * 0.0 + sin(cell * 1.7 + uT * 0.2) * w * 0.9;
  vec3 col = vec3(
    field(base + vec2(disp * 1.10, 0.0)).r,
    field(base + vec2(disp, 0.0)).g,
    field(base + vec2(disp * 0.90, 0.0)).b
  );
  // Bright thin seams where one strip meets the next, and a soft shade across each strip
  float seam = smoothstep(0.0, 0.07, f) * smoothstep(1.0, 0.93, f);
  col = mix(col + (1.0 - col) * uSeam, col, seam);
  col *= 1.0 - 0.025 * (1.0 - abs(s));
  col = mix(col, field(p), uCalm);
  col += (hash(p + uT * 0.0) - 0.5) * uGrain;
  gl_FragColor = vec4(col, 1.0);
}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
  return s
}

export default function HeroGlass() {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    let program
    try {
      if (!gl) throw new Error('no webgl')
      program = gl.createProgram()
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link')
    } catch {
      setFallback(true)   // no WebGL: show the soft blobs instead
      return
    }
    gl.useProgram(program)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (n) => gl.getUniformLocation(program, n)
    const u = { res: U('uRes'), strip: U('uStrip'), bend: U('uBend'), op: U('uOp'), grain: U('uGrain'), calm: U('uCalm'), seam: U('uSeam'), t: U('uT'), m: U('uM'), b: U('uB'), a: U('uA'), c: U('uC') }
    gl.uniform3fv(u.c, new Float32Array(BLOBS.flatMap((b) => hex(b.color))))

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dpr = 1
    let width = 1
    let height = 1
    const resize = () => {
      const r = root.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, r.width)
      height = Math.max(1, r.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(root)

    let mouse = null
    let hover = 0
    const mp = { x: 0, y: 0 }
    const onMove = (e) => {
      const r = root.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      mouse = inside ? { x: e.clientX - r.left, y: e.clientY - r.top } : null
    }
    const onLeave = () => { mouse = null }
    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }

    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(root)

    const offsets = BLOBS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
    const bArr = new Float32Array(BLOBS.length * 4)
    const aArr = new Float32Array(BLOBS.length * 4)
    const start = performance.now()
    let frame
    const draw = (now) => {
      const sec = reduceMotion ? 20 : (now - start) / 1000
      BLOBS.forEach((blob, i) => {
        const o = offsets[i]
        let tx = 0
        let ty = 0
        if (mouse) {
          const dx = (blob.x / 100) * width - mouse.x
          const dy = (blob.y / 100) * height - mouse.y
          const dist = Math.hypot(dx, dy) || 1
          const k = Math.max(0, 1 - dist / (RADIUS * width))
          tx = (dx / dist) * k * PUSH
          ty = (dy / dist) * k * PUSH
        }
        o.vx = (o.vx + (tx - o.x) * SPRING) * DAMPING
        o.vy = (o.vy + (ty - o.y) * SPRING) * DAMPING
        o.x += o.vx
        o.y += o.vy
        const size = (blob.size / 100) * width
        const [dxp, dyp, ds] = sample(PATHS[blob.path], (sec / blob.seconds) % 1, true)
        let mt = (sec / blob.morph) % 1
        if (i % 2) mt = 1 - mt
        const [deg, sx, sy] = sample(MORPH, mt, false)
        const ang = (deg * Math.PI) / 180
        bArr[i * 4] = ((blob.x / 100) * width + o.x + (dxp / 100) * size) * dpr
        bArr[i * 4 + 1] = ((blob.y / 100) * height + o.y + (dyp / 100) * size) * dpr
        bArr[i * 4 + 2] = 1 / (size * ds * 0.7071 * dpr)
        aArr[i * 4] = Math.cos(ang)
        aArr[i * 4 + 1] = Math.sin(ang)
        aArr[i * 4 + 2] = sx * ds * 1
        aArr[i * 4 + 3] = sy * ds * 1
      })
      // The glass bends more around the pointer
      if (mouse) { mp.x = mouse.x; mp.y = mouse.y }
      hover += ((mouse ? 1 : 0) - hover) * 0.06
      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.strip, STRIP * dpr)
      gl.uniform1f(u.bend, BEND)
      gl.uniform1f(u.op, OPACITY)
      gl.uniform1f(u.grain, GRAIN)
      gl.uniform1f(u.calm, CALM)
      gl.uniform1f(u.seam, SEAM)
      gl.uniform1f(u.t, sec)
      gl.uniform3f(u.m, mp.x * dpr, mp.y * dpr, hover)
      gl.uniform4fv(u.b, bArr)
      gl.uniform4fv(u.a, aArr)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const tick = (now) => {
      if (visible) draw(now)
      frame = requestAnimationFrame(tick)
    }
    if (reduceMotion) {
      draw(performance.now())
      const redraw = new ResizeObserver(() => draw(performance.now()))
      redraw.observe(root)
      return () => { redraw.disconnect(); ro.disconnect(); io.disconnect() }
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  if (fallback) return <HeroBackground />
  return (
    <div className="hero-bg hero-glass" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
