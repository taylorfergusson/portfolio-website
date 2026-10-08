> **Live now!**
> Put on a DJ mix, hold up your phone, and see if FoundCloud can find the track.

<p><a class="btn" href="https://foundcloud.taylorfergusson.com/" target="_blank" rel="noreferrer">Try FoundCloud ↗</a></p>

## Overview

<p class="my-part">Built it solo: crawler, algorithm, database, server, and site</p>

### Shazam, but for SoundCloud

FoundCloud finds the edits, bootlegs, and secret tracks that DJs love to gatekeep. I built it because I was tired of falling in love with songs I could never find again.

<div class="summary">

- **!The problem** Shazam only knows official releases, so songs that only live on SoundCloud are impossible to ID.
- **Why it matters** No ID means no full track, no way to credit the artist, and nothing to share with friends.
- **+The solution** My own audio-fingerprinting app, built from scratch, that matches what's playing against about 10,000 SoundCloud tracks.

</div>

## Result

<p class="my-part">Deployed and configured the AWS server myself</p>

### Hold up your phone, get the track

![Listening: 5 seconds of whatever's playing](/images/foundcloud/listening.png)
![Match: the original track, with a confidence score](/images/foundcloud/result.png)

#### Where it stands

<div class="numbered">

1. **About 10,000 tracks** Downloaded, fingerprinted, and indexed in a Postgres database, all by me
2. **60–70% of songs found** Most matches come back in 5 to 10 seconds, and up to about 20 in a noisy room. Results depend on background noise, the speaker, and how close your phone is to it.
3. **Live on AWS** I set up the server myself: Linux, Nginx, SSL, security groups, and backups

</div>

It's still a draft. I want the matching to be more accurate before I add more songs, so that's what I'm working on next.

<div class="process">

## The process

### How I got there

<div class="steps">

1. [Problem](#problem)
2. [How it works](#how-it-works)
3. [The hard part](#the-hard-part)

</div>

## Problem

### I'd hear a song for one minute, then never again

When I was DJing, I'd fall in love with a track that played for a minute in someone's mix, and then… nothing. The DJ hadn't posted a tracklist, so there was no full song, no way to credit the artist, and nothing to share with friends. A whole side of listening was closed off, for me and for everyone else.

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

A Python backend does the work. Every song is turned into a set of fingerprints and stored in hash maps, so a few seconds of audio from your phone can be looked up quickly instead of compared against every song one by one.

![How FoundCloud works: it crawls SoundCloud, collects 10,000 songs and fingerprints them into a database. When you listen, your recording is fingerprinted the same way and matched against the database, with a confidence score.](/images/foundcloud/how-it-works.svg)

## The Hard Part

<p class="my-part">Built the matching algorithm from scratch</p>

### A matching algorithm from nothing

The hardest part, and the part I'm proudest of. I started with nothing but 10,000 songs and a lot of reading about how audio fingerprinting actually works, starting with how Shazam does it.

The trick was figuring out what stays the same when a song plays somewhere else. So I compared the original files against recordings of the same songs played through speakers, to see what survives the trip. Low frequencies are easy to map, for example, but you can't always trust them coming out of a speaker in a loud room.

![A song's spectrogram: the loudest peaks become its fingerprint](/images/foundcloud/spectrogram.jpg)

*A song's spectrogram. The loudest peaks become its fingerprint.*

Every choice was a trade-off: how accurate and fast the matching is, against how much it costs to store and run on AWS. Balancing those is what turned a pile of songs into something that actually works.

</div>

## Next Steps

### Where I want to take it

So far, this has mostly been me building on my own. Next, I want to hear from the people who'd actually use it: real research, and interviews with friends who care about finding music as much as I do. Then I'll let that guide ideas like:

- **+Match from a link** Pick a section of a mix, like minutes 13 to 15
- **+Right on SoundCloud** A browser plugin that works on the page
- **+A bigger library** More songs, more matches (once the matching is more accurate)
- **+Meet the artist** Dig into who made the track

I don't want it to turn into this whole big thing, though. I just want it to help people find the songs they don't have an ID for, and do that really well.

## Reflection

### Why this one matters to me

<div class="numbered">

1. **So many missing connections!** There's so much good music out there, and so little to help you find it all. FoundCloud makes discovery a bit more democratic, so people can enjoy more music, share it, and give love to the creators who made it.
2. **Both halves of my brain** This is the project where both halves of my brain finally got to work together. I found the problem as a listener, then built the fix myself, all the way down to the server.
3. **The best version is the one you don't notice** If FoundCloud works, you hold up your phone and get a song. You never see the fingerprints, the hash maps, or the server behind it, and that's exactly how I want it.

</div>
