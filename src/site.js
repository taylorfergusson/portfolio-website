// Links used in more than one place on the site.
export const email = 'hello@taylorfergusson.com'
export const linkedin = 'https://www.linkedin.com/in/taylorfergusson/'
// Your resume PDF, in the public/ folder. To update it, replace the file and keep the same name.
export const resumePdf = '/Taylor-Fergusson-Resume.pdf'

// ---------------------------------------------------------------------------
// Page titles, descriptions and link previews
//
// These show in the browser tab, in Google results, and in the preview card when someone
// shares a link (iMessage, LinkedIn, Slack...). Case study pages use their title, summary and
// share image from projects.js instead.
// Preview images are 1200 x 630 and live in public/images/share/.
// ---------------------------------------------------------------------------

// Your website's address, with no slash at the end
export const siteUrl = 'https://taylorfergusson.com'
export const siteName = 'Taylor Fergusson'
// The preview image for every page that doesn't set its own
export const defaultShareImage = '/images/share/default.jpg'

export const pages = {
  '/': {
    title: 'Taylor Fergusson – UX Designer & Researcher',
    description: 'Taylor Fergusson is a UX designer and researcher in Toronto, exploring how people listen, learn, and understand their world.',
  },
  '/about': {
    title: 'About – Taylor Fergusson',
    description: "I'm a UX designer and researcher who wants technology to feel easy for everyone, not just the people who grew up with it.",
  },
  '/case-study': {
    title: 'Projects – Taylor Fergusson',
    description: 'UX design, research, and development case studies by Taylor Fergusson: YumGo, CIUT, and FoundCloud.',
  },
  '/resume': {
    title: 'Resume – Taylor Fergusson',
    description: "Taylor Fergusson's resume: UX design, UX research, and development.",
  },
}
