import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// Wraps every page with the header and footer.
export default function Layout() {
  const { pathname, hash } = useLocation()

  // On page change: jump to the top (or to a #section like /#contact)
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  // Fade-up animation: anything with class="reveal" (and every block in a
  // case study) fades in when it scrolls into view. The look is set in styles.css.
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const appearing = entries.filter((entry) => entry.isIntersecting)
      appearing.forEach((entry, i) => {
        const el = entry.target
        el.style.transitionDelay = `${Math.min(i, 5) * 80}ms` // items appearing together go one after another
        el.classList.add('visible')
        observer.unobserve(el)
        // Once it has faded in, remove the animation classes so hover effects work normally
        setTimeout(() => {
          el.classList.remove('reveal', 'visible')
          el.style.transitionDelay = ''
        }, 1400)
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal, .prose > *').forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
