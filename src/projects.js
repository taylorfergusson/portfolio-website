// Your projects, in the order they appear on the site.
//
// To add a project:
//   1. Copy one of these blocks and change the details.
//   2. Write the case study in src/case-studies/<slug>.md (same name as the slug).
//   3. Put its images in public/images/<slug>/.

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
  },
]
