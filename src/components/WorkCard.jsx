import { Link } from 'react-router-dom'
import HeroTiles from './HeroTiles.jsx'
import Phone from './Phone.jsx'
import './workCard.css'

// A project card: a tinted panel with the project's screens, under a pane of glass that slides down on hover.
// Used on the home page and the Projects page.

// How each project's panel looks: the same glass tiles as the home page hero, lit up under the cursor.
//   tint: the panel colour behind the glass
//   glow: the two colours the tiles light up in
const LOOK = {
  yumgo: { tint: '#DDE8DE', glow: ['#20665F', '#C06234'] },
  'ciut-upgrade': { tint: '#F3DDD0', glow: ['#C06234', '#BE3A30'] },
  borrowcircle: { tint: '#F1E9D8', glow: ['#BE3A30', '#C06234'] },   // BorrowCircle's cream and red
  'soundcloud-study': { tint: '#E3E8EA', glow: ['#C06234', '#20665F'] },   // a cool grey, lit in orange like SoundCloud
}
const DEFAULT_LOOK = { tint: '#E8E8ED', glow: ['#20665F', '#C06234'] }

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

export default function WorkCard({ project }) {
  const look = LOOK[project.slug] || DEFAULT_LOOK
  const name = project.cardTitle || project.title.split(' - ')[0]
  const d = project.details || {}
  const meta = ['Role', 'Team', 'Timeline'].map((k) => d[k] && d[k].split('\n')[0]).filter(Boolean)

  return (
    <article className="pcard" style={{ '--tint': look.tint }}>
      <Link to={`/case-study/${project.slug}`} className="pcard-link" aria-label={`${name} case study`}>
        <div className="pcard-panel">
          <HeroTiles colours={tileColours(look.glow)} base={look.tint} ghost={PANEL_GHOST} />
          <Shots project={project} />
          <div className="pcard-lip" aria-hidden="true" />
        </div>
        <p className="pcard-eyebrow">{name} <span aria-hidden="true">·</span> {project.category}</p>
        <p className="pcard-outcome">{project.summary}</p>
        {meta.length > 0 && <p className="pcard-meta">{meta.join('  ∙  ')}</p>}
      </Link>
    </article>
  )
}
