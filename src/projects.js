// Your projects, newest first. This is the order on the Projects page (and for "Next project").
// The home page only shows the ones with featured: 1, 2, 3..., in that order.
// (FoundCloud is archived in archive/foundcloud/, with steps to bring it back.)
//
// To add a project:
//   1. Copy one of these blocks and change the details.
//   2. Write the case study in src/case-studies/<slug>.md (same name as the slug).
//   3. Put its images in public/images/<slug>/.

// Add hidden: true to a project to keep it off the Home and Projects pages and out of Google,
// while its page still works at /case-study/<slug> (handy for drafts and experiments).

export const projects = [
  {
    slug: 'sidequest',
    hidden: true,   // not shown anywhere yet. Delete this line to bring it back.
    title: 'SideQuest - AI Event Discovery',
    category: 'Development & AI',
    date: 'In progress',
    summary: 'Led the backend for an AI event app that finds Toronto events where they really get posted, including Instagram.',
    // TODO: swap in screenshots of the app
    // The two numbers under the summary on the project cards
    stats: [
      { value: '5', label: 'teammates onboarded to GitHub' },
      { value: '3', label: 'AI fallbacks, so the app never breaks' },
    ],
    // The "Outcome" row on the project cards. Wrap numbers in ** to make them bold.
    outcome: 'Working prototype, user testing next',
    // The screens on the project cards. TODO: swap in real app screens (type: 'phone') once you have them
    shots: { type: 'image', images: [{ src: '/images/sidequest/thumbnail.svg', alt: 'SideQuest: Toronto events near you, from Instagram and Ticketmaster' }] },
    thumbnail: '/images/sidequest/thumbnail.svg',
    thumbnailAlt: 'SideQuest: Toronto events near you, from Instagram and Ticketmaster, with AI suggestions',
    shareImage: '/images/share/default.jpg',
    details: { Role: 'Backend & API lead', Team: 'Team of 6', Timeline: 'Sep - Dec 2026', Tools: 'Node.js / Supabase / Ticketmaster & Instagram APIs / Anthropic API', Status: 'In progress' },
  },
  {
    slug: 'borrowcircle',
    title: 'BorrowCircle - Design System & UI',
    featured: 3,   // shown on the home page, in this order
    category: 'UI Design & Design Systems',
    date: 'Jan - Apr 2026',
    summary: 'Built a full design system for a community lending app, with every colour pairing passing WCAG AA.',
    // The two numbers under the summary on the project cards
    stats: [
      { value: '22', label: 'component sets on 3 tiers of tokens' },
      { value: '19/19', label: 'colour pairings pass WCAG AA' },
    ],
    // The "Outcome" row on the project cards. Wrap numbers in ** to make them bold.
    outcome: '**22** component sets, **19/19** pairings pass AA',
    // The screens on the project cards: type 'phone', 'browser', 'cards' or 'image'
    shots: { type: 'phone', images: [
      { src: '/images/borrowcircle/final-home.png', alt: 'BorrowCircle home: Wanted! signs and hot items nearby' },
      { src: '/images/borrowcircle/final-item.png', alt: 'BorrowCircle item page with the lender and borrowing terms' },
      { src: '/images/borrowcircle/final-request.png', alt: 'BorrowCircle borrow request form' },
    ] },
    thumbnail: '/images/borrowcircle/thumbnail.jpg',
    thumbnailAlt: 'BorrowCircle app screens: search results, home, an item page, a listing preview and a chat',
    shareImage: '/images/share/default.jpg',
    details: { Role: 'UI Designer', Team: 'Team of 3\n(my own final prototype)', Timeline: 'Jan - Apr 2026', Tools: 'Figma' },
    // TODO: add the prototype link so the "Prototype" row shows at the end
    // link: 'https://www.figma.com/proto/...',
    // linkLabel: 'Prototype',
    // linkText: 'Click through the final design in Figma.',
    // linkButton: 'Open prototype',
  },
  {
    slug: 'soundcloud-study',
    title: 'SoundCloud - Usability Study',
    cardTitle: 'SoundCloud Usability Study',   // the name on the project cards (otherwise it's the title before the dash)
    category: 'UX Research',
    date: 'Mar - Apr 2026',
    summary: 'Led a usability study that found 4 high-severity issues in SoundCloud, each with a ranked fix.',
    // The two numbers under the summary on the project cards
    stats: [
      { value: '6', label: 'participants, moderated in person' },
      { value: '4', label: 'high-severity issues, each with a fix' },
    ],
    // The "Outcome" row on the project cards. Wrap numbers in ** to make them bold.
    outcome: '**6** participants, **4** high-severity issues found',
    // The screens on the project cards: type 'phone', 'browser', 'cards' or 'image'
    shots: { type: 'cards', images: [
      { src: '/images/soundcloud-study/sus-scores.svg', alt: 'SUS scores by participant, with a median of 38.75 against a benchmark of 68' },
      { src: '/images/soundcloud-study/task-results.svg', alt: 'Task results for 6 participants across 7 tasks' },
    ] },
    thumbnail: '/images/soundcloud-study/thumbnail.jpg',
    thumbnailAlt: "SoundCloud's home page, where every test session started",
    shareImage: '/images/share/default.jpg',
    details: { Role: 'Research team lead', Team: 'Team of 5', Participants: '6 participants\n7 tasks', Methods: 'Moderated usability testing\nSystem Usability Scale\nProduct reaction cards' },
  },
  {
    slug: 'yumgo',
    title: 'YumGo - UX Case Study',
    featured: 1,   // shown on the home page, in this order
    category: 'UI/UX Design',
    date: 'Sep - Dec 2025',
    summary: 'Led a team of 4 from research to a tested prototype, and rebuilt a broken filter mid-study so testing could go on.',
    // The two numbers under the summary on the project cards
    stats: [
      { value: '6/6', label: 'testers finished the task after I rebuilt the filter' },
      { value: '8', label: 'interviews with recent tourists' },
    ],
    // The "Outcome" row on the project cards. Wrap numbers in ** to make them bold.
    outcome: '**6/6** testers finished the task after the filter rebuild',
    // The screens on the project cards: type 'phone', 'browser', 'cards' or 'image'
    shots: { type: 'phone', images: [
      { src: '/images/yumgo/final-discover.jpg', alt: 'YumGo Discover screen with dining tips for Toronto' },
      { src: '/images/yumgo/final-restaurant.jpg', alt: 'YumGo restaurant page for Mama\'s Diner' },
      { src: '/images/yumgo/final-filters.jpg', alt: 'YumGo filters for price, distance and dietary needs' },
    ] },
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
    title: 'CIUT - Content Audit & IA Redesign',
    featured: 2,   // shown on the home page, in this order
    category: 'Content Audit & IA',
    date: 'Oct 2025',
    summary: "Audited a campus radio station's whole website. The station adopted the fixes and is planning a full rebuild.",
    // The two numbers under the summary on the project cards
    stats: [
      { value: '155', label: 'URLs crawled and rated' },
      { value: '12', label: 'pages redesigned in Figma' },
    ],
    // The "Outcome" row on the project cards. Wrap numbers in ** to make them bold.
    outcome: '**155** URLs audited, **12** pages redesigned',
    // The screens on the project cards: type 'phone', 'browser', 'cards' or 'image'.
    // For 'browser', url is the text in the address bar; the second page sits behind the first.
    shots: { type: 'browser', images: [
      { src: '/images/ciut/redesign-home.jpg', url: 'ciut.fm', alt: 'Redesigned CIUT home page with On Air Now' },
      { src: '/images/ciut/redesign-shows.jpg', url: 'ciut.fm/shows', alt: 'Redesigned CIUT shows page' },
    ] },
    thumbnail: '/images/ciut/thumbnail.jpg',
    thumbnailAlt: 'CIUT website redesign concept with show listings and an alumni section',
    details: { Role: 'UX Designer (solo)', Team: 'Solo', Timeline: '3 weeks\nOct 2025', Tools: 'Screaming Frog\nFigma' },
    link: 'https://www.figma.com/proto/CVXtM5bAcmKy8SH2V2zSpn/CIUT-Prototype-Revised?node-id=3014-12187&starting-point-node-id=3014%3A12187&page-id=3002%3A7008&scaling=scale-down&content-scaling=fixed',
    linkLabel: 'Prototype',
    linkText: 'Click through the redesigned site in Figma.',
    linkButton: 'Open prototype',
  },
]
