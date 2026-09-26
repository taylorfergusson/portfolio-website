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
    date: 'Sep 12, 2025',
    summary: 'International restaurant discovery app for tourists, aimed at improving overall travel experiences',
    thumbnail: '/images/yumgo/thumbnail.png',
    // Shown as labelled columns under the title. Add, remove or rename labels freely.
    details: { Role: 'Lead UI/UX Designer', Team: 'Team of 4', Timeline: 'Sep - Nov 2025', Tools: 'Figma' },
  },
  {
    slug: 'ciut-upgrade',
    title: 'CIUT - Website Redesign',
    category: 'UI/UX Design',
    date: 'Oct 22, 2025',
    summary: "Concept website update for UofT's campus radio station, built on findings from a content audit",
    thumbnail: '/images/ciut/thumbnail.jpg',
    details: { Role: 'Lead UI/UX Designer', Team: 'Solo', Timeline: 'Sep - Oct 2025', Tools: 'Screaming Frog / Figma' },
  },
  {
    slug: 'foundcloud',
    title: 'FoundCloud - UX Case Study',
    category: 'Development & UX',
    date: 'In progress',
    summary: 'A Shazam-style audio recognition tool built for SoundCloud: DJ edits, bootlegs, and songs buried inside hour-long mixes',
    thumbnail: '/images/foundcloud/thumbnail.svg',
    details: { Role: 'Designer & Developer', Team: 'Solo', Tools: 'Python / FastAPI / Postgres / JavaScript / AWS', Status: 'Live, in progress' },
  },
]
