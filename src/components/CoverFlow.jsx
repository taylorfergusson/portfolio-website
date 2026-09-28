import { useEffect, useRef, useState } from 'react'
import { songs, songKey } from '../songs.js'
import songData from '../songs-data.json'

// iPod-style Cover Flow. Drag or swipe and the albums follow your finger; flick and they glide on,
// then settle on the nearest album. Click a side album to bring it to the middle,
// click the middle album to hear a 30-second preview from Apple Music.
// Songs live in src/songs.js. The look (sizes, angles, reflection) is in the "Cover Flow" part of styles.css.

const VOLUME = 0.8    // preview loudness (0 to 1)
const FADE = 400      // how long the sound fades in and out (milliseconds)
const DRAG_SPEED = 0.5  // how far the albums move for each pixel you drag (as a share of an album's width; higher = faster)
const MOMENTUM = 300    // how far a flick carries on after you let go (higher = glides further)
const EDGE_STRETCH = 0.3 // how far you can pull past the first or last album (0 = not at all)
const VISIBLE = 4       // how many albums to show on each side of the middle one
const VISIBLE_PHONE = 2 // the same, on phones
const ART_SIZE = 400  // album art resolution to download (pixels)

// Sorted A–Z by artist, like the iPod: "The Cardigans" files under C. Songs by the same artist go A–Z by title.
const sortName = (name) => name.replace(/^the\s+/i, '')
const items = songs
  .map((song) => {
    const data = songData[songKey(song)] || {}
    const artwork = data.artwork?.replace(/\d+x\d+bb/, `${ART_SIZE}x${ART_SIZE}bb`)
    return { ...song, ...data, artwork }
  })
  .sort((a, b) => sortName(a.artist).localeCompare(sortName(b.artist), 'en', { sensitivity: 'base' }) || a.title.localeCompare(b.title))

export default function CoverFlow() {
  // pos is where the flow is: a whole number when resting on an album, in between while dragging
  const [pos, setPos] = useState(Math.floor(items.length / 2))
  const posRef = useRef(pos)
  const [dragging, setDragging] = useState(false)
  const [glide, setGlide] = useState(0.55) // how long the albums take to settle (seconds)
  const stageRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const audio = useRef(null)
  const fadeTimer = useRef(null)
  const drag = useRef(null)
  const wheel = useRef(0)
  const [phone, setPhone] = useState(() => window.matchMedia('(max-width: 600px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 600px)')
    const update = () => setPhone(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const visible = phone ? VISIBLE_PHONE : VISIBLE

  const last = items.length - 1
  const moveTo = (p) => { posRef.current = p; setPos(p) }
  const go = (i, seconds = 0.55) => { setGlide(seconds); moveTo(Math.max(0, Math.min(last, i))) }
  const index = Math.max(0, Math.min(last, Math.round(pos)))
  const current = items[index]

  // Smoothly fade the preview's volume to a target, then optionally run something
  const fadeTo = (target, then) => {
    const el = audio.current
    clearInterval(fadeTimer.current)
    const steps = 10
    const change = (target - el.volume) / steps
    let n = 0
    fadeTimer.current = setInterval(() => {
      n += 1
      el.volume = Math.min(1, Math.max(0, el.volume + change))
      if (n >= steps) { clearInterval(fadeTimer.current); el.volume = target; then?.() }
    }, FADE / steps)
  }

  const stop = () => {
    const el = audio.current
    if (!el || el.paused) return setPlaying(false)
    setPlaying(false)
    fadeTo(0, () => el.pause())
  }

  const play = () => {
    const el = audio.current
    if (!current.preview) return
    if (el.src !== current.preview) el.src = current.preview
    el.volume = 0
    el.play().then(() => { setPlaying(true); fadeTo(VOLUME) }).catch(() => setPlaying(false))
  }

  // Moving to a different album stops the current preview
  useEffect(() => { stop() }, [index]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { clearInterval(fadeTimer.current); audio.current?.pause() }, [])

  const onCoverClick = (i) => {
    if (i !== index) return go(i)
    playing ? stop() : play()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); playing ? stop() : play() }
  }

  // Sideways trackpad scrolling flicks through albums; normal up/down scrolling still scrolls the page
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    wheel.current += e.deltaX
    if (Math.abs(wheel.current) > 40) { go(index + Math.sign(wheel.current)); wheel.current = 0 }
  }

  // Drag or swipe: the albums follow your finger, then glide on and settle when you let go
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const cover = stageRef.current.querySelector('.cover.is-current')
    const now = performance.now()
    drag.current = {
      x: e.clientX, start: posRef.current, lastX: e.clientX, lastTime: now, speed: 0, moved: false,
      albumWidth: (cover?.offsetWidth || 200) * DRAG_SPEED,
    }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 8) { d.moved = true; setDragging(true) }
    if (!d.moved) return
    const now = performance.now()
    const dt = Math.max(now - d.lastTime, 1)
    d.speed = 0.6 * ((e.clientX - d.lastX) / dt) + 0.4 * d.speed // recent speed in pixels per millisecond, smoothed
    d.lastX = e.clientX
    d.lastTime = now
    let p = d.start - dx / d.albumWidth
    if (p < 0) p *= EDGE_STRETCH                        // pulling past the ends stretches a little
    if (p > last) p = last + (p - last) * EDGE_STRETCH
    moveTo(p)
  }
  const onPointerUp = () => {
    const d = drag.current
    if (!d) return
    if (d.moved) {
      setDragging(false)
      const stillFor = performance.now() - d.lastTime
      const speed = stillFor > 80 ? 0 : d.speed / d.albumWidth // albums per millisecond (0 if they paused before letting go)
      const target = Math.round(posRef.current - speed * MOMENTUM)
      const albums = Math.abs(target - posRef.current)
      go(target, Math.min(0.45 + albums * 0.12, 1.3)) // further flicks take a little longer to settle
    }
    setTimeout(() => (drag.current = null), 0) // after the click that follows, so a drag doesn't also count as a tap
  }

  return (
    <div className="coverflow">
      <div
        ref={stageRef}
        className={`coverflow-stage${dragging ? ' is-dragging' : ''}`}
        style={{ '--glide': `${glide}s` }}
        tabIndex={0}
        role="listbox"
        aria-label="Songs I'm listening to. Use the left and right arrow keys to browse, and Enter to play a preview."
        aria-activedescendant={`cover-${index}`}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') onPointerUp() }}
        onPointerCancel={() => { if (drag.current?.moved) { setDragging(false); go(Math.round(posRef.current)) } drag.current = null }}
      >
        {items.map((song, i) => {
          const offset = i - pos
          const distance = Math.abs(offset)
          return (
            <button
              key={songKey(song)}
              id={`cover-${i}`}
              role="option"
              aria-selected={i === index}
              tabIndex={-1}
              className={`cover${i === index ? ' is-current' : ''}${i === index && playing ? ' is-playing' : ''}`}
              style={{ '--offset': offset, '--distance': distance, '--side': Math.sign(offset), zIndex: 1000 - Math.round(distance * 100) }}
              onClick={() => { if (!drag.current?.moved) onCoverClick(i) }}
              aria-label={`${song.title} by ${song.artist}`}
              hidden={distance > visible + 1}
            >
              {song.artwork
              ? <>
                  <img src={song.artwork} alt={`Album art for ${song.title} by ${song.artist}`} draggable="false" loading={distance > 2 ? 'lazy' : 'eager'} decoding="async" />
                  <span className="cover-reflection" aria-hidden="true">
                    <img src={song.artwork} alt="" draggable="false" loading="lazy" decoding="async" />
                  </span>
                </>
              : <span className="cover-placeholder" style={{ '--hue': (i * 47) % 360 }}>{song.title}</span>}
              {i === index && song.preview && (
                <span className="cover-play" aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="coverflow-caption" aria-live="polite">
        {/* The song title links to the song on Apple Music */}
        <p className="coverflow-title">
          {current.link
            ? <a href={current.link} target="_blank" rel="noreferrer" title="Listen on Apple Music">{current.title}</a>
            : current.title}
        </p>
        <p className="coverflow-artist">{current.artist}</p>
      </div>

      <div className="coverflow-controls">
        <button className="coverflow-arrow" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous album">‹</button>
        <button className="coverflow-arrow" onClick={() => go(index + 1)} disabled={index === items.length - 1} aria-label="Next album">›</button>
      </div>

      <audio ref={audio} onEnded={() => setPlaying(false)} preload="none" />
    </div>
  )
}
