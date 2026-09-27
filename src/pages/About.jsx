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
            I'm a UX designer and researcher who wants technology to feel easy for everyone, not just the people who grew up with it.
          </p>
        </div>
        <img src="/images/headshot.png" alt="Portrait of Taylor Fergusson" className="headshot reveal" />
      </section>

      <section className="container">
        <h2 className="reveal">How I got here</h2>
        <ol className="timeline">
          <li className="reveal">
            <span className="when">Where it started</span>
            <h3>My mom's iPod</h3>
            <p>Growing up in Saskatchewan as phones and the internet took off, I could download songs in seconds, while my mom struggled just to play them on her iPod. I became her go-to tech support, and it left me with a question I'm still working on: how do you design technology that anyone can use comfortably, whatever their background?</p>
          </li>
          <li className="reveal">
            <span className="when">2018–2023</span>
            <h3>Computer science + psychology at McGill</h3>
            <p>I studied computer science and psychology, with a minor in sociology. Computer science taught me to build things, psychology showed me how people process information, and sociology showed me who gets left out. Outside class, I volunteered with Midnight Kitchen on food accessibility and facilitated Rad Frosh.</p>
            <figure className="timeline-figure">
              <img src="/images/about/mcgill-grad.jpg" alt="Taylor in a graduation gown with his dad at McGill" className="timeline-photo" loading="lazy" />
              <figcaption>My dad and I at my McGill graduation</figcaption>
            </figure>
          </li>
          <li className="reveal">
            <span className="when">2022–now</span>
            <h3>Teaching people to code</h3>
            <p>At Tensor Learning I teach kids Python and Java one-on-one and lead workshops. The biggest lesson: people learn when they care. When a student started losing interest, I rebuilt their lessons around what they already loved, like Pokémon-themed projects and a Kirby fighting game, and everything clicked. Turns out that's user-centred design, just with a kid as the user. Teaching kids of every background and skill level also showed me how much sound and visuals shape whether someone leans in or gives up.</p>
          </li>
          <li className="reveal">
            <span className="when">Along the way</span>
            <h3>Building things I wanted to exist</h3>
            <p>Before I'd ever heard of UX, I was DJing and kept hearing underground tracks in SoundCloud mixes that no app could identify, so I built one on my own: FoundCloud, a Shazam-style finder for SoundCloud. It was a pure computer science project, but it was the first time I built something for a problem I actually had. Now I'm coming back to it as a designer, starting with the people who'd actually use it.</p>
          </li>
          <li className="reveal">
            <span className="when">2025–now</span>
            <h3>UX Design at the University of Toronto</h3>
            <p>Now I'm doing my Master of Information with a UX Design concentration. I'm especially interested in accessibility, and in how sound and multimodal design can make interfaces more engaging and usable for people with visual impairments or cognitive differences. I've run a usability study of SoundCloud and researched people's listening habits, and I design for UDesign, U of T's student design organization. Next, I want to do product design where my coding background is a strength, ideally somewhere focused on music or digital media.</p>
            <figure className="timeline-figure">
              <img src="/images/about/uoft.jpg" alt="Taylor and his sister under the University of Toronto sign" className="timeline-photo" loading="lazy" />
              <figcaption>My sister and I at the U of T</figcaption>
            </figure>
          </li>
        </ol>
      </section>

      <section className="dark">
        <div className="container">
          <h2 className="reveal">Outside of work</h2>
          {/* Polaroid-style snapshots. Add or swap photos in public/images/about/ */}
          <div className="snapshots reveal">
            <figure>
              <img src="/images/about/on-stage.jpg" alt="Taylor performing on stage at a laptop and mixer" loading="lazy" />
              <figcaption>Performing electronic music :)</figcaption>
            </figure>
            <figure>
              <img src="/images/about/selfie.jpg" alt="Selfie of Taylor in a leather jacket and striped scarf under a winter sky" loading="lazy" />
              <figcaption>Prairie winter</figcaption>
            </figure>
            <figure>
              <img src="/images/about/snow.jpg" alt="Taylor and a friend resting in the snow on a sunny mountain" loading="lazy" />
              <figcaption>Skiing in Whitehorse, YT</figcaption>
            </figure>
          </div>
          <ul className="interests">
            <li className="reveal lift"><h3>Music production</h3><p>I've sung in choirs, vocal jazz and musical theatre, and now I produce, DJ and perform electronic music. I've also organized dance events for music I've released, tuning the sound, lighting and space to shape how people feel and move. It's sensory design, just in a room instead of on a screen.</p></li>
            <li className="reveal lift"><h3>Cooking</h3><p>I cook vegan, and I don't do sad side dishes. I like making full, complete meals that feel elevated and a little unexpected, the kind that make people forget to ask where the meat is.</p></li>
            <li className="reveal lift"><h3>Cycling</h3><p>I ride a vintage bike and take it everywhere, as long as there's no snow on the ground. When something breaks, I fix it myself, which has taught me a lot about how things are put together.</p></li>
            <li className="reveal lift"><h3>Thrifting</h3><p>Thrift stores and online ads are my happy place. I'm always hunting for vintage clothing and home goods with some history to them, and it's fed a real love of interior design.</p></li>
          </ul>

          <div className="coverflow-intro">
            <h2 className="reveal">My faves!</h2>
            <p className="reveal">Click around to hear some previews of my favourite songs</p>
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
