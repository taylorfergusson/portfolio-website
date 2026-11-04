import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../projects.js'
import FlingPhoto from '../components/FlingPhoto.jsx'
import HeroTiles from '../components/HeroTiles.jsx'
import WorkCard from '../components/WorkCard.jsx'
import './home.css'

// The home page: the headline, your photo rolling in with a chat beside it, then the featured projects.

// The hero headline, typed out one letter at a time
const HEADLINE = "Hi! I'm Taylor, a UX designer & researcher with a background in computer science & psychology"

// The chat with visitors. Your bubble starts with the first answer. The other questions show as reply chips
// under it, like suggested replies in a messaging app: tapping one sends it as the visitor's message,
// then your bubble types out the answer.
const CHAT = [
  { ask: 'What kind of designer are you?', text: 'I turn complex research into accessible interfaces (and build them too)' },
  { ask: 'What do you care about?', text: 'Invisible, intentional, and accessible design, where every choice traces back to research' },
  { ask: 'What do you bring to teams?', text: 'Honest, kind feedback, and the extra polish that takes work beyond "good enough"' },
  { ask: 'What are you up to?', text: 'Teaching kids to code, studying UX at U of T, and seeking a co-op/internship' },
]
const TYPING = 700   // how long "typing…" shows before the answer, in milliseconds
// The photo rolls in like a basketball: it slows as it rolls, hits a wall at its resting spot, bounces back a little and stops.
const FRICTION = 750      // how quickly it slows down while rolling (pixels per second²). Higher = everything happens faster and it hits harder
const BOUNCE = 0.5        // how much speed it keeps when it hits the wall (0 = dead stop, 1 = full bounce)
const BOUNCE_BACK = 0.16  // how far it rolls back off the wall, as a share of its width
const LETTER_DELAY = 0.025   // gap between letters on first load, in seconds
const SWITCH_DELAY = 0.012   // gap between letters when an answer types out (faster, so it feels responsive)
const ROW_DELAY = HEADLINE.length * LETTER_DELAY + 0.3   // the photo rolls in just after the headline finishes typing
// When the reply chips appear, so there's a moment to read the bubble first
const REPLIES_AFTER_POP = 1.2      // seconds after the bubble pops out (on load)
const REPLIES_AFTER_ANSWER = 0.5   // seconds after an answer finishes typing

// The intro (typed headline, photo roll) plays on someone's first visit. After that, the home page shows
// everything right away, even on later visits. This uses localStorage, not a cookie: it stays in this
// browser and is never sent anywhere. Change localStorage to sessionStorage below to replay the intro
// once per visit instead (it then resets when the tab closes).
const INTRO_KEY = 'intro-seen'
const introSeen = () => { try { return localStorage.getItem(INTRO_KEY) === '1' } catch { return false } }
const markIntroSeen = () => { try { localStorage.setItem(INTRO_KEY, '1') } catch { /* storage blocked: the intro just plays again */ } }

// One sentence, revealed one letter at a time (the letter animation is in styles.css)
function Letters({ sentence, delay }) {
  let n = 0
  return sentence.split(' ').map((word, w) => (
    <Fragment key={w}>
      <span className="hero-w" aria-hidden="true">
        {[...word].map((ch, i) => (
          <span key={i} className="hero-letter" style={{ '--d': `${(n++ * delay).toFixed(3)}s` }}>{ch}</span>
        ))}
      </span>{' '}
    </Fragment>
  ))
}

export default function Home() {
  const [skipIntro] = useState(introSeen)   // true if the intro already played in this browser
  useEffect(markIntroSeen, [])
  const [current, setCurrent] = useState(0)   // which answer the bubble shows
  const [asked, setAsked] = useState(0)       // how many questions the visitor has asked (0 = none yet)
  const [typing, setTyping] = useState(false)
  const typingTimer = useRef(null)
  const photoRef = useRef(null)
  const [impact, setImpact] = useState(false)   // true once the photo hits the wall: the chat bubble pops out then
  const [repliesShown, setRepliesShown] = useState(false)   // the reply chips show once the message has been read
  const repliesTimer = useRef(null)
  const showRepliesAfter = (seconds) => {
    clearTimeout(repliesTimer.current)
    repliesTimer.current = setTimeout(() => setRepliesShown(true), seconds * 1000)
  }
  // When the bubble pops out, give the reader a moment with the first message before the chips appear
  useEffect(() => { if (impact) showRepliesAfter(skipIntro ? 0.2 : REPLIES_AFTER_POP) }, [impact])
  useEffect(() => () => clearTimeout(repliesTimer.current), [])

  // A visitor taps a chip: their question is sent, "typing…" shows, the answer types out,
  // and the chips come back shortly after it finishes
  const ask = (i) => {
    setCurrent(i)
    setAsked((n) => n + 1)
    setTyping(true)
    setRepliesShown(false)
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => setTyping(false), TYPING)
    showRepliesAfter(TYPING / 1000 + CHAT[i].text.length * SWITCH_DELAY + REPLIES_AFTER_ANSWER)
  }
  useEffect(() => () => clearTimeout(typingTimer.current), [])

  // The photo rolls in from the left edge of the screen like a basketball (real physics, worked out for this screen size):
  // rolling friction slows it, it hits a wall just past its spot, bounces back at half speed and comes to rest.
  // It turns exactly as far as it rolls, like a real ball. The chat bubble pops out at the moment it hits the wall.
  useLayoutEffect(() => {
    const box = photoRef.current
    const photo = box?.querySelector('img')
    if (!box || !photo || skipIntro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setImpact(true); return }
    const startedAt = performance.now()
    let roll = null
    let cancelled = false
    let watch = 0
    const fallback = setTimeout(() => setImpact(true), ROW_DELAY * 1000 + 2500)   // in case the photo never loads
    // Measure once the photo has loaded (before that it has no size), keeping the roll on its usual schedule
    const start = () => {
      if (cancelled) return
      const r = photo.getBoundingClientRect()
      if (!r.width) return
      const radius = r.width / 2
      const back = BOUNCE_BACK * r.width            // distance it rolls back off the wall
      const from = -(r.right + 24)                  // starts just past the left edge of the screen
      const toWall = back - from                    // distance from the start to the wall
      const vAfter = Math.sqrt(2 * FRICTION * back) // speed just after the bounce (just enough to roll back and stop)
      const vHit = vAfter / BOUNCE                  // speed when it hits the wall
      const vStart = Math.sqrt(vHit * vHit + 2 * FRICTION * toWall)
      const tHit = (vStart - vHit) / FRICTION       // seconds until it hits the wall
      const total = tHit + vAfter / FRICTION
      const x = (t) => (t < tHit
        ? from + vStart * t - 0.5 * FRICTION * t * t
        : back - vAfter * (t - tHit) + 0.5 * FRICTION * (t - tHit) ** 2)
      const frames = []
      for (let i = 0; i <= 60; i++) {
        const t = (i / 60) * total
        const pos = x(t)
        const squash = 1 - 0.07 * Math.exp(-(((t - tHit) / 0.035) ** 2))   // squashes against the wall
        frames.push({ offset: i / 60, transform: `translateX(${pos.toFixed(2)}px) rotate(${((pos / radius) * 180 / Math.PI).toFixed(2)}deg) scaleX(${squash.toFixed(3)})` })
      }
      const delay = Math.max(0, ROW_DELAY * 1000 - (performance.now() - startedAt))
      roll = box.animate(frames, { duration: total * 1000, delay, fill: 'both', easing: 'linear' })
      // Watch the roll itself, and pop the bubble out the moment the photo reaches the wall
      const hitAt = delay + tHit * 1000
      const check = () => {
        if (cancelled) return
        if ((roll.currentTime ?? 0) >= hitAt) { clearTimeout(fallback); setImpact(true) }
        else watch = requestAnimationFrame(check)
      }
      watch = requestAnimationFrame(check)
    }
    if (photo.complete && photo.naturalWidth) start()
    else photo.addEventListener('load', start, { once: true })
    return () => { cancelled = true; clearTimeout(fallback); cancelAnimationFrame(watch); photo.removeEventListener('load', start); roll?.cancel() }
  }, [])

  const featured = projects.filter((p) => p.featured && !p.hidden).sort((a, b) => a.featured - b.featured)

  return (
    <div className="home">
      <section className={`hero container${impact ? ' home-impact' : ''}${skipIntro ? ' home-skip-intro' : ''}`} style={{ '--row-delay': `${ROW_DELAY.toFixed(2)}s` }}>
        <HeroTiles />
        <div className="hero-inner">
          <h1 className="hero-headline" aria-label={HEADLINE}>
            <Letters sentence={HEADLINE} delay={LETTER_DELAY} />
          </h1>

          <div className="hero-row">
            {/* The photo can still be grabbed and thrown */}
            <div className="hero-photo" ref={photoRef}>
              <FlingPhoto src="/images/headshot.png" alt="Portrait of Taylor Fergusson" />
            </div>
            <div className="hero-side">
              <div className="home-chat">
                {/* Your bubble. Every answer sits in the same spot (the hidden ones keep the space), so it doesn't change size */}
                <div className="hero-blurb home-bubble">
                  <div className="home-bubble-texts" aria-live="polite">
                    {CHAT.map((c, i) =>
                      i === current && !typing ? (
                        <p key={`on-${i}-${asked}`}>
                          {asked > 0 ? (
                            <>
                              <span className="visually-hidden">{c.text}</span>
                              <Letters sentence={c.text} delay={SWITCH_DELAY} />
                            </>
                          ) : c.text}
                        </p>
                      ) : (
                        <p key={`off-${i}`} className="home-ghost" aria-hidden="true">{c.text}</p>
                      )
                    )}
                    {typing && <span className="home-typing" aria-hidden="true"><i /><i /><i /></span>}
                  </div>
                </div>

                {/* Reply chips: the questions the visitor hasn't just asked */}
                <div className={`home-replies${repliesShown ? ' is-shown' : ''}`}>
                  <div className="home-reply-row" role="group" aria-label="Ask Taylor">
                  {CHAT.filter((c, i) => i !== current).map((c, n) => (
                    <button
                      key={c.ask}
                      type="button"
                      className="home-reply"
                      style={{ '--d': `${(n * 0.08).toFixed(2)}s` }}
                      onClick={() => ask(CHAT.indexOf(c))}
                      tabIndex={repliesShown ? 0 : -1}
                    >
                      {c.ask}
                    </button>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pcard-list container" id="work">
        <h2 className="reveal">Projects</h2>
        {featured.map((p) => <WorkCard key={p.slug} project={p} />)}
        <p className="center">
          <Link to="/case-study" className="text-link">View all projects <span className="chevron" aria-hidden="true">›</span></Link>
        </p>
      </section>

      <section className="callout container">
        <h2 className="reveal">
          Need a designer, researcher, developer, or somebody who does all three? I can find the fun in anything. Let's connect!
        </h2>
        <Link to="/resume" className="btn reveal">View resume</Link>
      </section>
    </div>
  )
}
