import { Link } from 'react-router-dom'
import HeroTiles from './HeroTiles.jsx'
import Phone from './Phone.jsx'
import { lookFor } from '../looks.js'
import './workCard.css'

// A project card: a tinted panel with the project's screens, under a pane of glass that slides down on hover.
// Used on the home page and the Projects page.

// Each project's tint and glow colours live in src/looks.js (shared with the case study banners)

const PANEL_GHOST = 0.25   // how visible the tile grid is before you hover (the hero uses 0.15)

// The tiles want 4 colour spots: the project's two colours in opposite corners
const tileColours = ([a, b]) => [
  { hex: a, x: 0.1, y: 0.15 },
  { hex: b, x: 0.9, y: 0.25 },
  { hex: b, x: 0.15, y: 0.9 },
  { hex: a, x: 0.85, y: 0.85 },
]

// The project's screens inside its panel (shots in projects.js)
function Shots({ project }) {
  const { shots } = project
  if (shots?.type === 'phone') {
    return (
      <div className="pcard-shots pcard-phones">
        {shots.images.slice(0, 3).map((img, i) => (
          <div className={`pcard-phone pcard-phone-${i}`} key={img.src}>
            <Phone><img src={img.src} alt={img.alt} loading="lazy" /></Phone>
          </div>
        ))}
      </div>
    )
  }
  if (shots?.type === 'browser') {
    const img = shots.images[0]
    return (
      <div className="pcard-shots">
        <div className="pcard-browser">
          <div className="pcard-bar" aria-hidden="true"><i /><i /><i /><span>{img.url}</span></div>
          <img src={img.src} alt={img.alt} loading="lazy" />
        </div>
      </div>
    )
  }
  if (shots?.type === 'cards') {
    return (
      <div className="pcard-shots">
        {shots.images.slice(0, 2).map((img) => <img key={img.src} className="pcard-chart" src={img.src} alt={img.alt} loading="lazy" />)}
      </div>
    )
  }
  const img = shots?.images?.[0] || { src: project.thumbnail, alt: project.thumbnailAlt || project.title }
  return <div className="pcard-shots"><img className="pcard-wide" src={img.src} alt={img.alt} loading="lazy" /></div>
}

// headingLevel: 3 on the home page (under its "Projects" heading), 2 on the Projects page (under its title)
export default function WorkCard({ project, headingLevel = 3 }) {
  const look = lookFor(project.slug)
  const name = project.cardTitle || project.title.split(' - ')[0]
  const d = project.details || {}
  const meta = ['Role', 'Team', 'Timeline'].map((k) => d[k] && d[k].split('\n')[0]).filter(Boolean)
  const Heading = `h${headingLevel}`
  const id = `card-${project.slug}`   // the link is named by the heading and described by the text under it

  return (
    <article className="pcard" style={{ '--tint': look.tint }}>
      <Link to={`/case-study/${project.slug}`} className="pcard-link" aria-labelledby={`${id}-name`} aria-describedby={`${id}-summary${meta.length ? ` ${id}-meta` : ''}`}>
        <div className="pcard-panel">
          <HeroTiles colours={tileColours(look.glow)} base={look.tint} ghost={PANEL_GHOST} />
          <Shots project={project} />
          <div className="pcard-lip" aria-hidden="true" />
        </div>
        <Heading className="pcard-eyebrow" id={`${id}-name`}>{name} <span aria-hidden="true">·</span> {project.category}</Heading>
        <p className="pcard-outcome" id={`${id}-summary`}>{project.summary}</p>
        {meta.length > 0 && <p className="pcard-meta" id={`${id}-meta`}>{meta.join('  ∙  ')}</p>}
      </Link>
    </article>
  )
}
