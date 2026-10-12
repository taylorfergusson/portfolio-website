import { Link } from 'react-router-dom'

// Turns "**155** URLs audited" into text with the number in bold
function withBold(text) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part))
}

// The screens on the right of each project. Set with shots: in projects.js
//   type 'phone'   : 2-4 phone screens side by side
//   type 'browser' : 1-2 website pages in browser windows (the second one sits behind)
//   type 'cards'   : 1-2 images on white cards (charts, diagrams)
//   type 'image'   : one wide image
function Shots({ shots, fallback }) {
  if (!shots) return <div className="work-shots"><img className="work-wide" src={fallback.src} alt={fallback.alt} /></div>
  const { type, images } = shots

  if (type === 'browser') {
    const [front, back] = images
    return (
      <div className="work-shots">
        <div className="work-stack">
          {back && (
            <div className="work-browser back">
              <div className="work-bar" aria-hidden="true"><i /><i /><i /><span>{back.url}</span></div>
              <img src={back.src} alt={back.alt} loading="lazy" />
            </div>
          )}
          <div className="work-browser front">
            <div className="work-bar" aria-hidden="true"><i /><i /><i /><span>{front.url}</span></div>
            <img src={front.src} alt={front.alt} loading="lazy" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'cards') {
    return (
      <div className="work-shots work-cards">
        {images.map((img) => <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />)}
      </div>
    )
  }

  if (type === 'image') {
    return <div className="work-shots"><img className="work-wide" src={images[0].src} alt={images[0].alt} loading="lazy" /></div>
  }

  return (
    <div className="work-shots work-phones">
      {images.map((img) => <div className="work-phone" key={img.src}><img src={img.src} alt={img.alt} loading="lazy" /></div>)}
    </div>
  )
}

// One project, used on the home page and the projects page:
// short text and a details table on the left, big screens on the right.
// Only the screens and the "Read case study" button are links; the text isn't.
export default function ProjectCard({ project, index, total }) {
  const d = project.details || {}
  // The rows of the details table. Leave a value out of projects.js and its row disappears.
  const rows = [
    ['Role', d.Role],
    ['Team', d.Team],
    ['Timeline', project.date],
    ['Outcome', project.outcome],
  ].filter(([, value]) => value)

  return (
    <article className="work reveal">
      <div className="work-text">
        {total > 1 && <p className="work-index">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>}
        <p className="work-cat">{project.category}</p>
        <h3 className="work-title">{project.cardTitle || project.title.split(' - ')[0]}</h3>
        <p className="work-summary">{project.summary}</p>
        <dl className="work-details">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{label === 'Outcome' ? withBold(value) : value.replace(/\n/g, ', ')}</dd>
            </div>
          ))}
        </dl>
        <Link to={`/case-study/${project.slug}`} className="work-cta">Read case study <span aria-hidden="true">→</span></Link>
      </div>
      {/* The screens link to the case study too. Keyboard users get the button above, so this link is skipped when tabbing. */}
      <Link to={`/case-study/${project.slug}`} className="work-shots-link" tabIndex={-1} aria-hidden="true">
        <Shots shots={project.shots} fallback={{ src: project.thumbnail, alt: project.thumbnailAlt || project.title }} />
      </Link>
    </article>
  )
}
