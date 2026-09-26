import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container not-found">
      <h1>Page not found</h1>
      <p className="muted">That page doesn't exist (or it moved).</p>
      <Link to="/" className="btn">Back home</Link>
    </section>
  )
}
