import { useEffect, useRef } from 'react'

// Hero background: clear glass tiles over a plain page. Moving the mouse paints a soft colour
// trail underneath them that slowly fades, and the glass refracts, frosts and fringes it,
// like Figma's Glass effect.
// Colours come from where the trail is: a blend of the brand colours below
// (purple top left, green right, orange and red bottom right).
//   x, y: where each colour is strongest, as a fraction of the hero (0 = left/top, 1 = right/bottom)
const COLOURS = [
  { hex: '#6D5699', x: 0.04, y: 0.12 }, // purple
  { hex: '#20665F', x: 0.92, y: 0.3 },  // green
  { hex: '#C06234', x: 0.6, y: 0.9 },   // orange
  { hex: '#BE3A30', x: 0.85, y: 0.85 }, // red
]

// The glass (the same settings as the preview sliders)
const TILE = 36          // tile size in pixels
const GAP = 2           // space between tiles in pixels
const ROUNDNESS = 6      // corner radius in pixels
const GLOW = 60          // how far the colour spreads from the cursor, in pixels
const STRENGTH = 0.9     // how strong the colour is (0 to 1)
const SATURATION = 1     // how vivid the colours are (1 = as they are)
const REFRACTION = 0.45  // how much the glass bends the colour at its edges (0 to 1)
const FROST = 0.75       // how milky and blurred the glass is (0 to 1)
const DISPERSION = 0.2   // rainbow fringing at the edges (0 to 1)
const GHOST = 0.15       // how visible unlit tiles are (0 = invisible, plain page)
const TEXT_DIM = 0.5     // how much the colour dims behind the headline so it stays readable (0 = no dimming)
const TRAIL_SECONDS = 2  // how long the trail takes to fade away completely

// The trail is stored at a quarter of the screen's resolution. It's soft anyway, and this keeps it fast.
const SCALE = 4

const VERT = 'attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }'

// Step 1, each frame: fade the trail a little, then paint the glow along the cursor's path
const TRAIL_FRAG = `
precision highp float;
uniform sampler2D uPrev;
uniform vec2 uSize, uA, uB;   // trail size, and where the cursor was last frame and is now
uniform float uOn, uFade, uRad;
void main() {
  vec2 p = gl_FragCoord.xy;
  float v = texture2D(uPrev, p / uSize).r - uFade;
  vec2 ab = uB - uA;
  float t = clamp(dot(p - uA, ab) / max(dot(ab, ab), 0.0001), 0.0, 1.0);
  float d = length(p - uA - ab * t);   // distance to the cursor's path, so fast moves leave no gaps
  float stamp = uOn * exp(-d * d / (uRad * uRad));
  gl_FragColor = vec4(max(v, stamp), 0.0, 0.0, 1.0);
}`

// Step 2, each frame: draw the glass tiles, looking through them at the trail
const GLASS_FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uDpr, uTile, uGap, uRound, uStr, uSat, uRef, uFro, uDis, uGho, uDim;
uniform vec3 uBase;       // the colour behind the glass (white on the hero)
uniform float uPlain;     // 1 = just the colour trail, no glass tiles
uniform vec4 uText;       // headline box: x, y, width, height
uniform vec3 uC[4];
uniform vec2 uP[4];
uniform sampler2D uTrail;

// Brand colour at a point, lifted a little so it stays luminous behind glass
vec3 brand(vec2 p) {
  vec2 s = uRes / uDpr;
  vec3 c = vec3(0.0);
  float t = 0.0;
  for (int i = 0; i < 4; i++) {
    vec2 d = p / s - uP[i];
    d.y *= s.y / s.x;
    float w = 1.0 / pow(length(d) + 0.08, 2.2);
    c += uC[i] * w;
    t += w;
  }
  c /= t;
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(l), c, uSat);
  return clamp(c * 1.25 + 0.06, 0.0, 1.0);
}
// How much colour is at a point: read the trail, dimmed near the headline
float glow(vec2 p) {
  vec2 s = uRes / uDpr;
  float g = texture2D(uTrail, vec2(p.x, s.y - p.y) / s).r;
  vec2 q = max(uText.xy - p, max(vec2(0.0), p - (uText.xy + uText.zw)));
  g *= 1.0 - uDim * max(0.0, 1.0 - length(q) / 120.0);
  return clamp(g, 0.0, 1.0);
}
// Distance to the edge of a rounded square (negative inside)
float sdf(vec2 l) {
  vec2 q = abs(l) - vec2(uTile * 0.5) + uRound;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRound;
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
  vec2 s = uRes / uDpr;
  float st = uTile + uGap;
  vec2 g = p - s * 0.5 + st * 0.5;
  vec2 cell = floor(g / st);
  vec2 l = g - cell * st - st * 0.5;   // position inside this tile, from its centre
  vec2 cen = p - l;                     // this tile's centre
  float d = sdf(l);
  vec3 c = brand(p);
  if (uPlain > 0.5) {   // no tiles: just the soft colour trail on the background
    gl_FragColor = vec4(mix(uBase, c, glow(p) * uStr), 1.0);
    return;
  }
  vec3 col;
  if (d > 0.0) {
    col = mix(mix(uBase, c, glow(p) * uStr), vec3(1.0), 0.25);  // the gap: background, slightly washed out
  } else {
    vec2 n = normalize(vec2(sdf(l + vec2(1, 0)) - sdf(l - vec2(1, 0)), sdf(l + vec2(0, 1)) - sdf(l - vec2(0, 1))) + 1e-5);
    float e = 1.0 - smoothstep(0.0, uTile * 0.3, -d);       // 1 at the edge, 0 in the middle
    vec2 off = n * pow(e, 1.8) * uRef * uTile * 0.45;       // refraction: bend toward the edge
    float br = uFro * uTile * 0.22;                          // frost: blur radius
    vec3 amt = vec3(0.0);
    for (int i = 0; i < 4; i++) {
      float a = float(i) * 1.571 + hash(cen) * 6.28;
      vec2 o = vec2(cos(a), sin(a)) * br * (0.5 + 0.5 * mod(float(i), 2.0));
      // Dispersion: red and blue are bent slightly differently
      amt.r += glow(p + off * (1.0 + uDis) + o);
      amt.g += glow(p + off + o);
      amt.b += glow(p + off * (1.0 - uDis) + o);
    }
    col = mix(uBase, c, amt / 4.0 * uStr);
    float vis = clamp(max(uGho, glow(cen) * 1.2), 0.0, 1.0);  // unlit tiles only show as ghosts
    col = mix(col, vec3(1.0), (0.06 + e * 0.18) * uFro * vis); // milky haze, stronger at the edges
    vec2 L = normalize(vec2(-1.0, -1.3));                       // light from the top left
    float lit = 0.5 + 0.5 * dot(n, L);
    float rim = 1.0 - smoothstep(0.0, 1.6, -d);
    col += (1.0 - col) * (pow(e, 5.0) * lit * 0.75 + rim * (0.35 + 0.5 * lit)) * vis;
    col -= vec3(0.05) * pow(e, 4.0) * (1.0 - lit) * vis;        // soft shade on the far edge
    col += (1.0 - col) * smoothstep(uTile * 0.5, -uTile * 0.1, l.y) * 0.12 * vis;  // sheen
    col += (hash(p) - 0.5) * 0.025 * uFro * vis;                // grain
  }
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
  return s
}
function makeProgram(gl, frag) {
  const program = gl.createProgram()
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, frag))
  gl.bindAttribLocation(program, 0, 'a')
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link')
  return program
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)

// Optional settings, for reusing the tiles somewhere other than the hero (the hero uses none of these):
//   colours: 4 colours in the same shape as COLOURS above
//   ghost:   how visible unlit tiles are
//   base:    the colour behind the glass
//   plain:   true = no glass tiles, just the colour trail
export default function HeroTiles({ colours = COLOURS, ghost = GHOST, base = '#FFFFFF', plain = false } = {}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    let glass, trail
    try {
      if (!gl) throw new Error('no webgl')
      glass = makeProgram(gl, GLASS_FRAG)
      trail = makeProgram(gl, TRAIL_FRAG)
    } catch {
      canvas.style.display = 'none'   // no WebGL: the hero just stays plain
      return
    }
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    const G = (n) => gl.getUniformLocation(glass, n)
    const T = (n) => gl.getUniformLocation(trail, n)

    // Glass settings that never change
    gl.useProgram(glass)
    gl.uniform3fv(G('uC'), new Float32Array(colours.flatMap((c) => hex(c.hex))))
    gl.uniform2fv(G('uP'), new Float32Array(colours.flatMap((c) => [c.x, c.y])))
    gl.uniform3fv(G('uBase'), new Float32Array(hex(base)))
    gl.uniform1f(G('uTile'), TILE)
    gl.uniform1f(G('uGap'), GAP)
    gl.uniform1f(G('uRound'), Math.min(ROUNDNESS, TILE / 2))
    gl.uniform1f(G('uStr'), STRENGTH)
    gl.uniform1f(G('uSat'), SATURATION)
    gl.uniform1f(G('uRef'), REFRACTION)
    gl.uniform1f(G('uFro'), FROST)
    gl.uniform1f(G('uDis'), DISPERSION)
    gl.uniform1f(G('uGho'), ghost)
    gl.uniform1f(G('uPlain'), plain ? 1 : 0)
    gl.uniform1f(G('uDim'), TEXT_DIM)
    gl.uniform1i(G('uTrail'), 0)
    gl.useProgram(trail)
    gl.uniform1f(T('uRad'), GLOW / SCALE)
    gl.uniform1i(T('uPrev'), 0)

    // Two low-resolution trail images: each frame reads one and writes the other
    let maps = []
    let tw = 1, th = 1
    const makeMap = () => {
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, tw, th, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const fbo = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      return { tex, fbo }
    }

    const headline = root.parentElement?.querySelector('.hero-headline')
    let dirty = true   // true when the picture needs redrawing
    const resize = () => {
      const r = root.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(r.width * dpr))
      canvas.height = Math.max(1, Math.round(r.height * dpr))
      gl.useProgram(glass)
      gl.uniform2f(G('uRes'), canvas.width, canvas.height)
      gl.uniform1f(G('uDpr'), dpr)
      const t = headline?.getBoundingClientRect()
      if (t) gl.uniform4f(G('uText'), t.left - r.left, t.top - r.top, t.width, t.height)
      else gl.uniform4f(G('uText'), -9999, -9999, 0, 0)
      tw = Math.max(1, Math.ceil(r.width / SCALE))
      th = Math.max(1, Math.ceil(r.height / SCALE))
      maps.forEach((m) => { gl.deleteTexture(m.tex); gl.deleteFramebuffer(m.fbo) })
      maps = [makeMap(), makeMap()]
      gl.useProgram(trail)
      gl.uniform2f(T('uSize'), tw, th)
      dirty = true
    }

    const drawGlass = () => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(glass)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, maps[0].tex)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    resize()
    const ro = new ResizeObserver(() => { resize(); drawGlass() })
    ro.observe(root)

    // Reduce motion: just the still glass, no trail
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawGlass()
      return () => ro.disconnect()
    }

    // The background sits behind the text, so listen on the window and check the pointer is over the hero
    let pointer = null
    const onMove = (e) => {
      const r = root.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      pointer = inside ? { x: e.clientX - r.left, y: e.clientY - r.top } : null
    }
    const onUp = (e) => { if (e.pointerType !== 'mouse') pointer = null }   // a finger lifting ends the trail
    const onLeave = () => { pointer = null }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    // Only animate while the hero is on screen
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(root)

    let last = null        // where the cursor was last frame, in trail coordinates
    let lastTime = performance.now()
    let lastActive = -Infinity
    let fadeSteps = 0      // the trail fades in whole steps of 1/255, so count up the partial ones
    let frame
    const tick = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now
      if (visible) {
        let cur = null
        if (pointer) {
          cur = { x: pointer.x / SCALE, y: th - pointer.y / SCALE }
          lastActive = now
        }
        const active = pointer || now - lastActive < TRAIL_SECONDS * 1000 + 300
        if (active) {
          fadeSteps += (dt / TRAIL_SECONDS) * 255
          const steps = Math.floor(fadeSteps)
          fadeSteps -= steps
          const from = last || cur || { x: 0, y: 0 }
          const to = cur || from
          gl.bindFramebuffer(gl.FRAMEBUFFER, maps[1].fbo)
          gl.viewport(0, 0, tw, th)
          gl.useProgram(trail)
          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_2D, maps[0].tex)
          gl.uniform2f(T('uA'), from.x, from.y)
          gl.uniform2f(T('uB'), to.x, to.y)
          gl.uniform1f(T('uOn'), cur ? 1 : 0)
          gl.uniform1f(T('uFade'), steps / 255)
          gl.drawArrays(gl.TRIANGLES, 0, 3)
          maps.reverse()   // the image just written is now the current one
          drawGlass()
          dirty = true     // draw once more after the trail is gone, to clear it
        } else if (dirty) {
          drawGlass()
          dirty = false
        }
        last = cur
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div className="hero-bg hero-tiles" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
