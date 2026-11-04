import Phone from './Phone.jsx'
import { lookFor } from '../looks.js'
import './caseBanner.css'

// The picture at the top of each case study: the project's tint (the same as its card) with its screens
// laid out on it. It's built from banner: in projects.js, so updating a screen there updates the banner too.
//   type 'phone'   : 3-5 phone screens side by side, the middle one in front (never rotated)
//   type 'browser' : 2-3 website pages in browser windows, the middle one in front
//   type 'cards'   : 1-2 images on white cards (charts, diagrams)
// With no banner: in projects.js, it shows the project's thumbnail image instead.
export default function CaseBanner({ project }) {
  const { banner } = project
  if (!banner) return <img src={project.thumbnail} alt={project.thumbnailAlt || project.title} className="banner reveal" />

  const { type, images } = banner
  const middle = (images.length - 1) / 2
  // Where each screen sits: 0 in the middle, then 1, 2... toward the edges (negative on the left)
  const place = (i) => ({ '--pos': i - middle, '--dist': Math.abs(i - middle) })

  return (
    <div className={`case-banner case-banner-${type} reveal`} style={{ '--tint': lookFor(project.slug).tint }}
      role="img" aria-label={project.bannerAlt || project.thumbnailAlt || project.title}>
      <div className="case-banner-stage" aria-hidden="true">
        {images.map((img, i) => {
          const pic = <img src={img.src} alt="" fetchpriority={i === Math.round(middle) ? 'high' : undefined} />
          if (type === 'phone') return <div className="cb-item cb-phone" style={place(i)} key={img.src}><Phone>{pic}</Phone></div>
          if (type === 'browser') return (
            <div className="cb-item cb-browser" style={place(i)} key={img.src}>
              <div className="cb-bar"><i /><i /><i /><span>{img.url}</span></div>
              {pic}
            </div>
          )
          return <div className="cb-item cb-card" style={place(i)} key={img.src}>{pic}</div>
        })}
      </div>
    </div>
  )
}
