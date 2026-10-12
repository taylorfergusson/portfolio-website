import { projects } from '../projects.js'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects() {
  return (
    <section className="projects dark">
      <div className="container">
        <h1 className="reveal">Projects</h1>
        {(() => {
          const shown = projects.filter((p) => !p.hidden)
          return shown.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} total={shown.length} />)
        })()}
      </div>
    </section>
  )
}
