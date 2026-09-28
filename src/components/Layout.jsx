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
    const show = (el, i = 0) => {
      if (el.classList.contains('visible')) return
      el.style.transitionDelay = `${Math.min(i, 5) * 80}ms` // items appearing together go one after another
      el.classList.add('visible')
      observer.unobserve(el)
      // Once it has faded in, remove the animation classes so hover effects work normally
      setTimeout(() => {
        el.classList.remove('reveal', 'visible')
        el.style.transitionDelay = ''
      }, 1400)
    }
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry, i) => show(entry.target, i))
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' }) // starts as soon as the top of a block is on screen
    // The black process section is too tall to fade in as one piece, so its contents fade in one by one
    document.querySelectorAll('.reveal, .prose > :not(.process), .prose .process > *').forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })
    // Safety net: anything already scrolled past is shown, even if a fast scroll skipped it
    let frame
    const catchUp = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) show(el)
        })
      })
    }
    window.addEventListener('scroll', catchUp, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', catchUp)
      cancelAnimationFrame(frame)
    }
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
