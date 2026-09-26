import { projects } from '../projects.js'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects() {
  return (
    <section className="projects dark">
      <div className="container">
        <h1 className="reveal">Projects</h1>
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
