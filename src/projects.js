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
    summary: 'International restaurant discovery app for tourists, aimed at improving overall travel experiences',
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
    summary: "Concept website update for UofT's campus radio station, built on findings from a content audit",
    thumbnail: '/images/ciut/thumbnail.jpg',
    thumbnailAlt: 'CIUT website redesign concept with show listings and an alumni section',
    details: { Role: 'Lead UI/UX Designer', Team: 'Solo', Timeline: '3 weeks\nOct 2025', Tools: 'Screaming Frog\nFigma' },
  },
  {
    slug: 'foundcloud',
    title: 'FoundCloud - Web App Development',
    category: 'Development & UX',
    date: 'In progress',
    summary: 'A Shazam-style audio recognition tool built for SoundCloud: DJ edits, bootlegs, and songs buried inside hour-long mixes',
    thumbnail: '/images/foundcloud/thumbnail.jpg',
    thumbnailAlt: 'FoundCloud match screen showing a remix it identified, with an 80% confidence score',
    details: { Role: 'Designer & Developer', Team: 'Solo', Tools: 'Python / FastAPI / Postgres / JavaScript / AWS', Status: 'Live, in progress' },
  },
]
