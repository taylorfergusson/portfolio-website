import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

// One project row, used on the home page and the projects page.
export default function ProjectCard({ project }) {
  // The thumbnail grows gently from 90% to full size as it scrolls into view
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const reduceMotion = useReducedMotion()

  return (
    <Link to={`/case-study/${project.slug}`} className="project-card reveal">
      <motion.div ref={frameRef} className="project-frame" style={{ scale: reduceMotion ? 1 : scale }}>
        <img src={project.thumbnail} alt={project.thumbnailAlt || project.title} className="project-thumb" />
      </motion.div>
      <div>
        <p className="project-meta">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </p>
        <h3 className="project-title">{project.title} <span className="chevron" aria-hidden="true">›</span></h3>
        <p className="project-summary">{project.summary}</p>
      </div>
    </Link>
  )
}
