# FoundCloud (archived)

Taken off the site in October 2026. Nothing here is built or published: Vite only reads
src/ and public/.

To bring it back:
1. Move foundcloud.md to src/case-studies/foundcloud.md
2. Move images/ to public/images/foundcloud/ (and images/share-foundcloud.jpg to public/images/share/foundcloud.jpg)
3. Paste the entry below back into the list in src/projects.js

```js
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
```
