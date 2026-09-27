import { resumePdf } from '../site.js'

// The resume page: the PDF shown right on the page, with buttons to download it or open it full-size.
// The PDF itself lives in public/ (see resumePdf in site.js).
export default function Resume() {
  return (
    <section className="container resume-page">
      <div className="resume-top">
        <h1 className="reveal">Resume</h1>
        <div className="resume-actions reveal">
          <a href={resumePdf} target="_blank" rel="noreferrer" className="text-link">Open in new tab ↗</a>
          <a href={resumePdf} download className="btn">Download PDF</a>
        </div>
      </div>

      {/* Most desktop browsers show the PDF here. If one can't (some phones), the message inside shows instead. */}
      <object
        data={`${resumePdf}#view=Fit&toolbar=0&navpanes=0`}
        type="application/pdf"
        className="resume-viewer reveal"
        aria-label="Taylor Fergusson's resume"
      >
        <div className="resume-fallback">
          <p>Your browser can't show the resume on this page.</p>
          <a href={resumePdf} target="_blank" rel="noreferrer" className="btn">View the PDF</a>
        </div>
      </object>
    </section>
  )
}
