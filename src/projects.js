// Your projects, in the order they appear on the site.
//
// To add a project:
//   1. Copy one of these blocks and change the details.
//   2. Write the case study in src/case-studies/<slug>.md (same name as the slug).
//   3. Put its images in public/images/<slug>/.

// Add hidden: true to a project to keep it off the Home and Projects pages and out of Google,
// while its page still works at /case-study/<slug> (handy for drafts and experiments).

export const projects = [
  {
    slug: 'yumgo',
    title: 'YumGo - UX Case Study',
    category: 'UI/UX Design',
    date: 'Sep - Dec 2025',
    summary: 'A food discovery app that gives tourists comfort in the unfamiliar. I led a team of 4!',
    thumbnail: '/images/yumgo/thumbnail.png',
    thumbnailAlt: 'YumGo app screens showing a restaurant map, listings and menus',
    // Shown as labelled columns under the title. Add, remove or rename labels freely.
    details: { Role: 'Lead UI/UX Designer', Team: 'Team of 4', Timeline: '12 weeks\nSep - Dec 2025', Tools: 'Figma' },
    // The row at the very end of the case study. Leave these out to skip it.
    link: 'https://www.figma.com/proto/X8Lj3tw4SuO8GV3fsCCiKU/YumGo-Final-Prototype?node-id=2131-13299&starting-point-node-id=2131%3A13299&page-id=2131%3A13129&scaling=min-zoom&content-scaling=fixed',
    linkLabel: 'Prototype',
    linkText: 'Click through the final design in Figma.',
    linkButton: 'Open prototype',
  },
  {
    slug: 'ciut-upgrade',
    title: 'CIUT - Audit & Website Redesign',
    category: 'UI/UX Design',
    date: 'Oct 2025',
    summary: "A content audit and competitor-informed redesign to help people connect with U of T's campus radio station",
    thumbnail: '/images/ciut/thumbnail.jpg',
    thumbnailAlt: 'CIUT website redesign concept with show listings and an alumni section',
    details: { Role: 'Lead UI/UX Designer', Team: 'Solo', Timeline: '3 weeks\nOct 2025', Tools: 'Screaming Frog\nFigma' },
    link: 'https://www.figma.com/proto/CVXtM5bAcmKy8SH2V2zSpn/CIUT-Prototype-Revised?node-id=3014-12187&starting-point-node-id=3014%3A12187&page-id=3002%3A7008&scaling=scale-down&content-scaling=fixed',
    linkLabel: 'Prototype',
    linkText: 'Click through the redesigned site in Figma.',
    linkButton: 'Open prototype',
  },
  {
    slug: 'foundcloud',
    title: 'FoundCloud - Web App Development',
    category: 'Development & UX',
    date: 'In progress',
    summary: 'Like Shazam, but for songs that only live on SoundCloud. Built completely solo, from the database to the design',
    thumbnail: '/images/foundcloud/thumbnail.jpg',
    thumbnailAlt: 'FoundCloud match screen showing a remix it identified, with an 80% confidence score',
    details: { Role: 'Designer & Developer', Team: 'Solo', Tools: 'Python / FastAPI / Postgres / JavaScript / AWS', Status: 'Live, in progress' },
    link: 'https://foundcloud.taylorfergusson.com/',
    linkLabel: 'Live project',
    linkText: 'Hold up your phone to a DJ mix and try it.',
    linkButton: 'Visit site',
  },
]
