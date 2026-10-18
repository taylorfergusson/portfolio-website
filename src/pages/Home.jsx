import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../projects.js'
import { linkedin } from '../site.js'
import ProjectCard from '../components/ProjectCard.jsx'
import FlingPhoto from '../components/FlingPhoto.jsx'
import HeroBackground from '../components/HeroBackground.jsx'

// The hero sentence, revealed one letter at a time at about reading speed (about 250 words a minute).
// LETTER_DELAY is the gap between letters in seconds. The photo and blurb fade in once the last letter is in.
const heroSentence = "Hi! I'm Taylor, a UX researcher & designer with a background in computer science & psychology"
const heroWords = heroSentence.split(' ')
const LETTER_DELAY = 0.025
const ROW_DELAY = heroSentence.length * LETTER_DELAY + 0.3

export default function Home() {
  return (
    <>
      <section className="hero container">
        <HeroBackground />
        <div className="hero-inner">
          <h1 className="hero-headline" aria-label={heroSentence}>
            {(() => {
              let n = 0   // counts letters so each one starts a little after the last
              return heroWords.map((word, w) => (
                <Fragment key={w}>
                  <span className="hero-w" aria-hidden="true">
                    {[...word].map((ch, i) => (
                      <span key={i} className="hero-letter" style={{ '--d': `${(n++ * LETTER_DELAY).toFixed(3)}s` }}>{ch}</span>
                    ))}
                  </span>
                  {' '}
                </Fragment>
              ))
            })()}
          </h1>

          <div className="hero-row" style={{ '--row-delay': `${ROW_DELAY.toFixed(2)}s` }}>
            {/* The photo can still be grabbed and thrown */}
            <div className="hero-photo">
              <FlingPhoto src="/images/headshot.png" alt="Portrait of Taylor Fergusson" />
            </div>
            <div className="hero-side">
              <p className="hero-blurb">I turn complex research into accessible, robust interfaces (and build them too)</p>
              <Link to="/about" className="btn hero-btn">More about me <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>

      </section>

      <section className="projects dark">
        <div className="container">
          <h2 className="reveal">Projects</h2>
          {/* Featured projects only (featured: 1, 2, 3 in projects.js). The Projects page lists them all. */}
          {(() => {
            const featured = projects.filter((p) => p.featured && !p.hidden).sort((a, b) => a.featured - b.featured)
            return featured.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} total={featured.length} />)
          })()}
          <p className="center">
            <Link to="/case-study" className="text-link">View all projects <span className="chevron" aria-hidden="true">›</span></Link>
          </p>
        </div>
      </section>

      <section className="callout container">
        <h2 className="reveal">
          Need a designer, researcher, developer, or somebody who does all three? I can find the fun in anything. Let's connect!
        </h2>
        <Link to="/resume" className="btn reveal">View Resume</Link>
      </section>
    </>
  )
}
