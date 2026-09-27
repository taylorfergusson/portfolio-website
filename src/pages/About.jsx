import { email } from '../site.js'
import CoverFlow from '../components/CoverFlow.jsx'

// The About page. Edit the text right here, like HTML.
export default function About() {
  return (
    <div className="about">
      <section className="container about-intro">
        <div>
          <h1 className="reveal">About me</h1>
          <p className="lead reveal">
            I'm a UX designer and researcher who came to design through code, psychology, and a lot of music.
          </p>
        </div>
        <img src="/images/headshot.png" alt="Portrait of Taylor Fergusson" className="headshot reveal" />
      </section>

      <section className="container">
        <h2 className="reveal">How I got here</h2>
        <ol className="timeline">
          <li className="reveal">
            <span className="when">2018–2023</span>
            <h3>Computer science + psychology at McGill</h3>
            <p>I studied computer science and psychology side by side, with a minor in sociology. The part I kept coming back to was where they overlap: not just how to build something, but why people use it the way they do.</p>
          </li>
          <li className="reveal">
            <span className="when">2022–now</span>
            <h3>Teaching people to code</h3>
            <p>At Tensor Learning I teach kids Python and Java one-on-one and lead workshops. The biggest lesson: people learn when they care. When a student started losing interest, I rebuilt their lessons around what they already loved, like Pokémon-themed projects and a Kirby fighting game, and everything clicked. Turns out that's user-centred design, just with a kid as the user.</p>
          </li>
          <li className="reveal">
            <span className="when">Along the way</span>
            <h3>Building things I wanted to exist</h3>
            <p>Before I'd ever heard of UX, I was DJing and kept hearing underground tracks in SoundCloud mixes that no app could identify, so I built one on my own: FoundCloud, a Shazam-style finder for SoundCloud. It was a pure computer science project, but it was the first time I built something for a problem I actually had. Now I'm coming back to it as a designer, starting with the people who'd actually use it.</p>
          </li>
          <li className="reveal">
            <span className="when">2025–now</span>
            <h3>UX Design at the University of Toronto</h3>
            <p>Now I'm doing my Master of Information with a UX Design concentration, where I've run a usability study of SoundCloud and researched people's listening habits, and I design for UDesign, U of T's student design organization. Next, I want to do product design where my coding background is a strength, ideally somewhere focused on music or digital media.</p>
          </li>
        </ol>
      </section>

      <section className="dark">
        <div className="container">
          <h2 className="reveal">Outside of work</h2>
          <ul className="interests">
            <li className="reveal lift"><h3>Music production</h3><p>I'm a musician first. I've played in bands, I produce my own tracks, and I love sound design: building a sound from scratch until it feels exactly right. It's the same loop as design: make something, listen, tweak, repeat.</p></li>
            <li className="reveal lift"><h3>Cooking</h3><p>I cook vegan, and I don't do sad side dishes. I like making full, complete meals that feel elevated and a little unexpected, the kind that make people forget to ask where the meat is.</p></li>
            <li className="reveal lift"><h3>Cycling</h3><p>I ride a vintage bike and take it everywhere, as long as there's no snow on the ground. When something breaks, I fix it myself, which has taught me a lot about how things are put together.</p></li>
            <li className="reveal lift"><h3>Thrifting</h3><p>Thrift stores and online ads are my happy place. I'm always hunting for vintage clothing and home goods with some history to them, and it's fed a real love of interior design.</p></li>
          </ul>

          <div className="coverflow-intro">
            <h2 className="reveal">My faves!</h2>
            <p className="reveal">Click around to hear some previews</p>
          </div>
        </div>
        <CoverFlow />
      </section>

      <section className="callout container">
        <h2 className="reveal">I'm looking for UX research and design co-ops, especially in digital media and education technology. If that sounds like you, I'd love to chat!</h2>
        <a href={`mailto:${email}`} className="btn reveal">Say hello</a>
      </section>
    </div>
  )
}
