import { email } from '../site.js'
import CoverFlow from '../components/CoverFlow.jsx'
import FlingPhoto from '../components/FlingPhoto.jsx'

// The About page. Edit the text right here, like HTML.
export default function About() {
  return (
    <div className="about">
      <section className="container about-intro">
        <div>
          <h1 className="reveal">Who, Me?</h1>
          <p className="lead reveal">
            I'm a multifaceted UX designer and researcher who wants technology to feel easy for everyone.
          </p>
          {/* Little tag rows under the intro. Add a row by copying one <p className="tag-row"> block */}
          <p className="tag-row reveal">
            <span className="tag-label">Roots:</span>
            <span className="tag">Computer science</span>
            <span className="tag">Psychology</span>
            <span className="tag">Sooooo much music</span>
          </p>
        </div>
        <div className="photo-wrap reveal">
          <FlingPhoto src="/images/headshot.png" alt="Portrait of Taylor Fergusson" />
        </div>
      </section>

      <section className="container">
        <h2 className="reveal">How did I get here?</h2>
        <ol className="timeline">
          <li className="reveal">
            <span className="when">Where it started</span>
            <h3>My mom's iPod</h3>
            <p>Growing up in Saskatchewan, I learned how to download songs in seconds, while my mom struggled to play them on her iPod. I became her go-to tech support for everything once she found out I knew how to change the TV's input source. This left me thinking: how can you make technology that anyone can use comfortably?</p>
          </li>
          <li className="reveal">
            <span className="when">2018–2023</span>
            <h3>Computer science + psychology at McGill</h3>
            <p>I double majored in computer science and psychology, with a minor in sociology. I learned how to build things, why people do things, and how both computers and humans do what they do.</p>
            <figure className="timeline-figure">
              <img src="/images/about/mcgill-grad.jpg" alt="Taylor in a graduation gown with his dad at McGill" className="timeline-photo" loading="lazy" />
              <figcaption>My dad and I at my graduation (yes I'm wearing cowboy boots)</figcaption>
            </figure>
          </li>
          <li className="reveal">
            <span className="when">2022–now</span>
            <h3>Teaching coding</h3>
            <p>At Tensor Learning, I teach kids and lead adult workshops in Python, Java, Scratch, C#, and Cybersecurity. It's always been my goal to make coding easy and fun, and I take pride in my ability to get students back on board when they struggle or become disinterested, rebuilding their lessons around what they already love (Pokémon projects, a Kirby fighting game, a silly YouTube comments generator). Once I realized this was all user-centred design, everything clicked.</p>
          </li>
          <li className="reveal">
            <span className="when">Along the way</span>
            <h3>Building things I wanted to exist</h3>
            <p>While in my DJ stint (of which I'm now retired... mostly), I kept hearing songs in SoundCloud mixes that no app could find. So I built one: FoundCloud, a Shazam for SoundCloud. It was the first time I built something for a problem I actually had, and now I'm coming back to it as a designer.</p>
          </li>
          <li className="reveal">
            <span className="when">2025–now</span>
            <h3>UX Design at the University of Toronto</h3>
            <p>Now I'm doing my Master of Information in UX Design, and designing for UDesign, U of T's student design club. Next up: a product design role, somewhere I can raise a product and see it grow up like a newborn baby. Ok maybe not exactly like that, but you know what I mean.</p>
            <figure className="timeline-figure">
              <img src="/images/about/uoft.jpg" alt="Taylor and his sister under the University of Toronto sign" className="timeline-photo" loading="lazy" />
              <figcaption>My sister and I at U of T during her visit</figcaption>
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
            <li className="reveal lift"><h3>Music production</h3><p>Choir kid turned electronic musician. I love to produce and perform with friends, and am in 2 bands!</p></li>
            <li className="reveal lift"><h3>Cooking</h3><p>Vegan stuff, usually fully realized. Current fave: shiitake-miso ramen. Did somebody say yum?</p></li>
            <li className="reveal lift"><h3>Getting outside</h3><p>Skiing in the winter, and riding vintage Peugeot bike the rest of the year (when I'm not stuck fixing it).</p></li>
            <li className="reveal lift"><h3>Exploring</h3><p>From new corners of Canada to Wikipedia rabbit holes on syntactic ambiguity.</p></li>
          </ul>

          <div className="coverflow-intro">
            <h2 className="reveal">My faves!</h2>
            <p className="reveal"><span className="on-mouse">Click</span><span className="on-touch">Tap</span> around to hear some of my favourite songs, albums, and artists</p>
          </div>
        </div>
        <CoverFlow />
      </section>

      <section className="callout container">
        <h2 className="reveal">Need a designer, researcher, developer, or somebody who does all three? I can find the fun in anything. Let's connect!</h2>
        <a href={`mailto:${email}`} className="btn reveal">Say hello</a>
      </section>
    </div>
  )
}
