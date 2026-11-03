import { projects } from '../projects.js'
import WorkCard from '../components/WorkCard.jsx'

// Every project that isn't hidden, in the order they're listed in projects.js
export default function Projects() {
  return (
    <section className="pcard-list container">
      <h1 className="reveal">Projects</h1>
      {projects.filter((p) => !p.hidden).map((p) => <WorkCard key={p.slug} project={p} />)}
    </section>
  )
}
