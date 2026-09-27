import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  // scrolled: show a thin line under the header once the page is scrolled
  // hidden: slide the header away while scrolling down, bring it back when scrolling up
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (y < 80) setHidden(false)              // always show near the top of the page
      else if (y > lastY + 6) setHidden(true)   // scrolling down
      else if (y < lastY - 6) setHidden(false)  // scrolling up
      if (Math.abs(y - lastY) > 6) lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}${scrolled ? ' scrolled' : ''}${hidden && !menuOpen ? ' hidden' : ''}`}>
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
          <NavLink to="/resume" onClick={close}>Resume</NavLink>
        </nav>
      </div>
    </header>
  )
}
