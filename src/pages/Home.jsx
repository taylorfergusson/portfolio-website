import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../projects.js'
import { linkedin, resume } from '../site.js'
import ProjectCard from '../components/ProjectCard.jsx'
import ToolStrip from '../components/ToolStrip.jsx'
import FlingPhoto from '../components/FlingPhoto.jsx'
import HeroBackground from '../components/HeroBackground.jsx'

// The words that cycle in the hero, in order
const heroWords = ['designer', 'researcher', 'developer', 'leader', 'friend']

// The app icons in the scrolling strip under the photo (files are in public/images/tools/)
const tools = ['figma', 'miro', 'ableton', 'photoshop', 'blender', 'html', 'css', 'javascript', 'python', 'java', 'linux', 'aws']

export default function Home() {
  // Switch to the next hero word every 2 seconds
  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setWordIndex((i) => (i + 1) % heroWords.length), 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <section className="hero container">
        <HeroBackground />
        <div className="hero-inner">
          <h1 className="hero-text reveal">
            Hi! I'm Taylor, a
          </h1>
          <h1 className="reveal">
            <span className="hero-word" key={wordIndex}>{heroWords[wordIndex]}</span>
          </h1>
          <h1 className="hero-text reveal">
            exploring how people listen, learn, and understand their world.
          </h1>
          <h1 className="hero-text hero-line reveal">
            Currently based in Toronto, Ontario.
          </h1>
        </div>
      </section>

      <section className="intro container">
        <div className="intro-left">
          <div className="photo-wrap reveal">
            <FlingPhoto src="/images/headshot.png" alt="Portrait of Taylor Fergusson" />
          </div>
          <ToolStrip tools={tools} />
        </div>

        <div className="intro-right">
          <h2 className="reveal">Building things, studying people, having fun in the process</h2>
          <p className="reveal">
            With my background in computer science and psychology, I tackle design problems from
            the inside out, bringing this human-centred and systems expertise to my work.
          </p>
          <ul className="info-cards">
            <li className="reveal lift">
              <img src="/images/icon-school.png" alt="" />
              <div><strong>UXD Master's Program</strong><span>University of Toronto</span></div>
            </li>
            <li className="reveal lift">
              <img src="/images/icon-teaching.png" alt="" />
              <div><strong>Coding Instruction</strong><span>Tensor Learning</span></div>
            </li>
            <li className="reveal lift">
              <img src="/images/icon-projects.png" alt="" />
              <div><strong>Audio & Design Projects</strong><span>Me</span></div>
            </li>
          </ul>
          <a href={linkedin} target="_blank" rel="noreferrer" className="btn reveal">Visit LinkedIn ↗</a>
        </div>
      </section>

      <section className="projects dark">
        <div className="container">
          <h2 className="reveal">Projects</h2>
          {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
          <p className="center">
            <Link to="/case-study" className="text-link">View all projects <span className="chevron" aria-hidden="true">›</span></Link>
          </p>
        </div>
      </section>

      <section className="callout container">
        <h2 className="reveal">
          Currently seeking co-ops in UX research/design, with a particular interest in digital
          media and education technology. I'd be happy to connect!
        </h2>
        <a href={resume} target="_blank" rel="noreferrer" className="btn reveal">View Resume ↗</a>
      </section>
    </>
  )
}
