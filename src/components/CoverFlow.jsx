import { useEffect, useRef, useState } from 'react'
import { songs, songKey } from '../songs.js'
import songData from '../songs-data.json'

// iPod-style Cover Flow. Click a side album to bring it to the middle,
// click the middle album to hear a 30-second preview from Apple Music.
// Songs live in src/songs.js. The look (sizes, angles, reflection) is in the "Cover Flow" part of styles.css.

const VOLUME = 0.8    // preview loudness (0 to 1)
const FADE = 400      // how long the sound fades in and out (milliseconds)
const DRAG_STEP = 70  // how far to drag or swipe (pixels) to move one album
const VISIBLE = 4     // how many albums to show on each side of the middle one
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
  const [index, setIndex] = useState(Math.floor(items.length / 2))
  const [playing, setPlaying] = useState(false)
  const audio = useRef(null)
  const fadeTimer = useRef(null)
  const drag = useRef(null)
  const wheel = useRef(0)

  const go = (i) => setIndex(Math.max(0, Math.min(items.length - 1, i)))
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

  // Drag with the mouse or swipe on a phone
  const onPointerDown = (e) => { drag.current = { x: e.clientX, start: index, moved: false } }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 8) drag.current.moved = true
    go(drag.current.start - Math.round(dx / DRAG_STEP))
  }
  const onPointerUp = () => { setTimeout(() => (drag.current = null), 0) }

  return (
    <div className="coverflow">
      <div
        className="coverflow-stage"
        tabIndex={0}
        role="listbox"
        aria-label="Songs I'm listening to. Use the left and right arrow keys to browse, and Enter to play a preview."
        aria-activedescendant={`cover-${index}`}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {items.map((song, i) => {
          const offset = i - index
          const distance = Math.abs(offset)
          return (
            <button
              key={songKey(song)}
              id={`cover-${i}`}
              role="option"
              aria-selected={i === index}
              tabIndex={-1}
              className={`cover${i === index ? ' is-current' : ''}${i === index && playing ? ' is-playing' : ''}`}
              style={{ '--offset': offset, '--distance': distance, '--side': Math.sign(offset), zIndex: 100 - distance }}
              onClick={() => { if (!drag.current?.moved) onCoverClick(i) }}
              aria-label={`${song.title} by ${song.artist}`}
              hidden={distance > VISIBLE}
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
