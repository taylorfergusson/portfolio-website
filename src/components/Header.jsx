import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { resume } from '../site.js'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  // Show a thin line under the header once the page is scrolled
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={close}>
          Taylor Fergusson
        </Link>

        {/* Burger button: only visible on phones (see styles.css) */}
        <button className="menu-button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="visually-hidden">Menu</span>
          <span className="burger" aria-hidden="true"></span>
        </button>

        <nav>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/case-study" onClick={close}>Projects</NavLink>
          <a href={resume} target="_blank" rel="noreferrer" onClick={close}>Resume</a>
          <Link to="/#contact" onClick={close}>Contact</Link>
        </nav>
      </div>
    </header>
  )
}
