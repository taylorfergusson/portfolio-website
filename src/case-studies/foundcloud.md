> **Live now!**
> Put on a DJ mix, hold up your phone, and see if FoundCloud can find the track.

<p><a class="btn" href="https://foundcloud.taylorfergusson.com/" target="_blank" rel="noreferrer">Try FoundCloud ↗</a></p>

## Overview

### Shazam, but for SoundCloud

FoundCloud finds the edits, bootlegs, and secret tracks that DJs love to gatekeep. I built it because I was tired of falling in love with songs I could never find again.

- **10,000 tracks** Downloaded and fingerprinted, all by me
- **Built solo** Crawler, algorithm, server, and site
- **Based on how Shazam works** My own version, built from scratch
- **Live on AWS** A working proof of concept

## The Problem

### I'd hear a song for one minute, then never again

When I was DJing, I'd fall in love with a track that played for a minute in someone's mix, and then… nothing. No tracklist, no full song, no way to credit the artist or share it with friends. A whole side of listening was closed off, for me and for everyone else.

<div class="columns">

#### Shazam

Only knows music that went through official distribution.

#### SoundCloud

A playground of edits and bootlegs, with nothing to search it.

</div>

> **Problem Statement**
> Listeners need a way to identify songs that only exist on SoundCloud, so they can find the full track, credit the artist, and share it.

## How It Works

### How it finds your song

![How FoundCloud works: it crawls SoundCloud, collects 10,000 songs and fingerprints them into a database. When you listen, your recording is fingerprinted the same way and matched against the database, with a confidence score.](/images/foundcloud/how-it-works.svg)

![Listening: 5 seconds of whatever's playing](/images/foundcloud/listening.png)
![Match: the original track, with a confidence score](/images/foundcloud/result.png)

## The Hard Part

### A matching algorithm from nothing

The hardest part, and the part I'm proudest of. I started with nothing but 10,000 songs and a lot of reading about how audio fingerprinting actually works.

The trick was figuring out what stays the same when a song plays somewhere else. Low frequencies are easy to map, for example, but you can't always trust them coming out of a speaker in a loud room.

![A song's spectrogram: the loudest peaks become its fingerprint](/images/foundcloud/spectrogram.jpg)

*A song's spectrogram. The loudest peaks become its fingerprint.*

## Next Steps

### Where I want to take it

So far, this has mostly been me building on my own. Next, I want to hear from the people who'd actually use it: real research, and interviews with friends who care about finding music as much as I do. Then I'll let that guide ideas like:

- **+Match from a link** Pick a section of a mix, like minutes 13 to 15
- **+Right on SoundCloud** A browser plugin that works on the page
- **+A bigger library** More songs, more matches
- **+Meet the artist** Dig into who made the track

I don't want it to turn into this whole big thing, though. I just want it to help people find the songs they don't have an ID for, and do that really well.

## Reflection

### Why this one matters to me

There's so much good music out there, and so little to help you find it all. So many missing connections! FoundCloud makes discovery a bit more democratic, so people can enjoy more music, share it, and give love to the creators who made it.

It's also the project where both halves of my brain finally got to work together. I found the problem as a listener, then built the fix myself.

<p><a class="btn" href="https://foundcloud.taylorfergusson.com/" target="_blank" rel="noreferrer">Try FoundCloud ↗</a></p>
