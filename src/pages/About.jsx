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
          {/* Little tag rows under the intro. Add a row by copying one <p className="tag-row"> block */}
          <p className="tag-row reveal">
            <span className="tag-label">Roots:</span>
            <span className="tag">Computer science</span>
            <span className="tag">Psychology</span>
            <span className="tag">So much music</span>
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
            <p>Growing up in Saskatchewan, I could download songs in seconds, while my mom struggled just to play them on her iPod. I became her go-to tech support, and it left me with a question I'm still chasing: how do you make technology that anyone can use comfortably?</p>
          </li>
          <li className="reveal">
            <span className="when">2018–2023</span>
            <h3>Computer science + psychology at McGill</h3>
            <p>I double majored in computer science and psychology, with a minor in sociology. One side taught me how to build things, the other taught me why people use them the way they do. Outside of class, I volunteered with Midnight Kitchen and facilitated Rad Frosh.</p>
            <figure className="timeline-figure">
              <img src="/images/about/mcgill-grad.jpg" alt="Taylor in a graduation gown with his dad at McGill" className="timeline-photo" loading="lazy" />
              <figcaption>My dad and I at my McGill graduation</figcaption>
            </figure>
          </li>
          <li className="reveal">
            <span className="when">2022–now</span>
            <h3>Teaching people to code</h3>
            <p>At Tensor Learning, I teach kids Python and Java and lead workshops. When one of my students started losing interest, I rebuilt their lessons around what they already loved (Pokémon projects, a Kirby fighting game) and everything clicked. Turns out that's user-centred design, just with a kid as the user!</p>
          </li>
          <li className="reveal">
            <span className="when">Along the way</span>
            <h3>Building things I wanted to exist</h3>
            <p>While DJing, I kept hearing songs in SoundCloud mixes that no app could find. So I built one: FoundCloud, a Shazam for SoundCloud. It was the first time I built something for a problem I actually had, and now I'm coming back to it as a designer.</p>
          </li>
          <li className="reveal">
            <span className="when">2025–now</span>
            <h3>UX Design at the University of Toronto</h3>
            <p>Now I'm doing my Master of Information in UX Design, and designing for UDesign, U of T's student design club. Next up: product design, somewhere I get to see a whole product through from the first question to the finished thing.</p>
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
            <li className="reveal lift"><h3>Music production</h3><p>Choir kid turned electronic musician. I produce, DJ, and perform.</p></li>
            <li className="reveal lift"><h3>Cooking</h3><p>Vegan, and I go all out. No sad side salads here.</p></li>
            <li className="reveal lift"><h3>Getting outside</h3><p>Skiing in the winter, and my vintage bike the rest of the year.</p></li>
            <li className="reveal lift"><h3>Exploring</h3><p>From new corners of Canada to 2am Wikipedia rabbit holes.</p></li>
          </ul>

          <div className="coverflow-intro">
            <h2 className="reveal">My faves!</h2>
            <p className="reveal">Click an album to hear a little preview</p>
          </div>
        </div>
        <CoverFlow />
      </section>

      <section className="callout container">
        <h2 className="reveal">Need a designer, a researcher, or someone who does both? I can find the fun in anything, so let's talk!</h2>
        <a href={`mailto:${email}`} className="btn reveal">Say hello</a>
      </section>
    </div>
  )
}
