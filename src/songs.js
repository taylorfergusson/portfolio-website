// Songs in the Cover Flow on the About page. They're sorted A–Z by artist automatically, so add them in any order.
// After adding, removing or changing a song, run:  npm run songs
// That looks each one up on Apple Music and saves its album art + 30-second preview into songs-data.json.
//
// If the wrong version of a song comes up, add its Apple Music ID:
// open the song on music.apple.com, and the ID is the number after "?i=" in the link.
//   { artist: 'Björk', title: 'Hunter', id: '1234567890' },
export const songs = [
  { artist: 'The Cardigans', title: "Gordon's Gardenparty" },
  { artist: 'Rihanna', title: 'Only Girl (In the World)' },
  { artist: 'Britney Spears', title: 'Heaven on Earth' },
  { artist: 'Miss Kittin & The Hacker', title: 'Stock Exchange' },
  { artist: 'M.I.A.', title: 'XR2' },
  { artist: 'Nadia Oh', title: 'My Egyptian Lover' },
  { artist: 'Kylie Minogue', title: 'Come into My World (Fischerspooner Mix)' },
  { artist: 'Madonna', title: 'Impressive Instant' },
  { artist: 'Björk', title: 'Hunter' },
  { artist: 'Arthur Russell', title: 'Habit of You' },
  { artist: 'Chaka Khan', title: 'I Feel for You' },
  { artist: 'Donna Summer', title: 'Take Me' },
  { artist: 'Fleetwood Mac', title: 'Silver Springs' },
  { artist: 'Nelly Furtado', title: 'Do It' },
  { artist: 'Jai Paul', title: 'Genevieve' },
  { artist: 'Mr Twin Sister', title: 'Rude Boy', id: '905957636' },
  { artist: 'Lana Del Rey', title: 'Diet Mountain Dew' },
  { artist: 'Joni Mitchell', title: 'Free Man in Paris' },
  { artist: 'Justice', title: 'D.A.N.C.E.' },
  { artist: 'Beach House', title: 'Lover of Mine' },
]

// Used to match each song to its saved Apple Music info
export const songKey = (song) => `${song.artist} - ${song.title}`
