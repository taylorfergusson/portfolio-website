// Looks up every song in src/songs.js on Apple Music (the free iTunes Search API)
// and saves its album art, 30-second preview and link into src/songs-data.json.
// Run it with:  npm run songs
import { writeFile } from 'node:fs/promises'
import { songs, songKey } from '../src/songs.js'

const COUNTRY = 'ca' // which Apple Music store to search

// Lowercase, drop accents, brackets and punctuation, so "Only Girl (In the World)" ≈ "only girl in the world"
const clean = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/&/g, 'and').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// Give each search result a score: how well its artist and title match what we asked for
function score(result, song) {
  const artist = clean(song.artist)
  const title = clean(song.title)
  const titleNoMix = clean(song.title.replace(/\(.*?\)/g, ''))
  const gotArtist = clean(result.artistName || '')
  const gotTitle = clean(result.trackName || '')
  let points = 0
  if (gotArtist === artist) points += 3
  else if (gotArtist.includes(artist) || artist.includes(gotArtist)) points += 2
  if (gotTitle === title) points += 3
  else if (gotTitle.startsWith(titleNoMix)) points += 2
  if (/\(.*\)/.test(song.title) && gotTitle.includes(clean(song.title.match(/\((.*?)\)/)[1]))) points += 1
  if (!/\bremix|mix|live|edit|version\b/.test(title) && /\b(remix|live|instrumental|karaoke)\b/.test(gotTitle)) points -= 2
  return points
}

async function lookUp(song) {
  if (song.id) {
    const { results } = await getJson(`https://itunes.apple.com/lookup?id=${song.id}&country=${COUNTRY}`)
    return results[0]
  }
  const term = encodeURIComponent(`${song.artist} ${song.title.replace(/[()]/g, '')}`)
  const { results } = await getJson(`https://itunes.apple.com/search?term=${term}&entity=song&limit=25&country=${COUNTRY}`)
  const best = results
    .map((r) => ({ r, points: score(r, song) }))
    .sort((a, b) => b.points - a.points)[0]
  return best && best.points >= 4 ? best.r : null
}

const data = {}
for (const song of songs) {
  try {
    const r = await lookUp(song)
    if (!r) { console.log(`✗ not found: ${songKey(song)}  (add its Apple Music id in songs.js)`); continue }
    data[songKey(song)] = {
      artwork: r.artworkUrl100.replace('100x100bb', '600x600bb'),
      preview: r.previewUrl || null,
      link: r.trackViewUrl,
      found: `${r.artistName} - ${r.trackName}`,
    }
    console.log(`✓ ${songKey(song)}  →  ${r.artistName} - ${r.trackName}`)
  } catch (err) {
    console.log(`✗ error: ${songKey(song)}  (${err.message})`)
  }
  await new Promise((wait) => setTimeout(wait, 400)) // go easy on Apple's servers
}

await writeFile(new URL('../src/songs-data.json', import.meta.url), JSON.stringify(data, null, 2) + '\n')
console.log(`\nSaved ${Object.keys(data).length} of ${songs.length} songs to src/songs-data.json`)
