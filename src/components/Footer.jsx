import { Link } from 'react-router-dom'
import { email, linkedin } from '../site.js'

export default function Footer() {
  return (
    <footer id="contact" className="site-footer dark">
      <div className="container">
        <p className="footer-small">Want to know more? Just say</p>
        <a className="footer-email" href={`mailto:${email}`}>{email}</a>
        <p className="footer-links">
          <a href={`mailto:${email}`}>Email</a>
          <Link to="/resume">Resume</Link>
          <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  )
}
