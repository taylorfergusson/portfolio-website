import { email, linkedin, resume } from '../site.js'

export default function Footer() {
  return (
    <footer id="contact" className="site-footer dark">
      <div className="container">
        <p className="footer-small">Want to know more? Just say</p>
        <a className="footer-email" href={`mailto:${email}`}>{email}</a>
        <p className="footer-links">
          <a href={`mailto:${email}`}>Email</a>
          <a href={resume} target="_blank" rel="noreferrer">Resume</a>
          <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  )
}
