> **Live now: try it yourself**
> Play a song from a DJ mix, hold up your phone, and see if FoundCloud can find it. It's a personal project I built before studying UX, and I'm now redesigning it as a designer.

<p><a class="btn" href="https://foundcloud.taylorfergusson.com/" target="_blank" rel="noreferrer">Try FoundCloud ↗</a></p>

## Overview

### Shazam, built for SoundCloud

Record a few seconds of a song from a DJ mix, and FoundCloud finds the original SoundCloud upload, including the edits and bootlegs that Shazam can't.

- **10,000 tracks** A library I built myself by crawling SoundCloud
- **Solo, end to end** Research, algorithm, server, and interface
- **From scratch** Based on Shazam's published fingerprinting method
- **Deliberately scoped** A working proof of concept on AWS's free tier

## The Problem

### A great song, and no way to find it

The best tracks in DJ mixes often have no tracklist, no lyrics online, and titles that don't match the original song. Mainstream apps only know licensed music, so they come up empty.

> **Problem Statement**
> No identification tool was built for SoundCloud's underground. So I built one.

## How It Works

### Four steps from a song to a match

- **1. Discover** A crawler follows SoundCloud's recommendations to grow the library
- **2. Collect** Tracks are downloaded, filtered, and checked for quality
- **3. Fingerprint** Each song becomes a set of hashes that survive background noise
- **4. Match** A phone recording is fingerprinted the same way and scored for confidence

![Fingerprinting: each song becomes a spectrogram, and its loudest peaks become its fingerprint](/images/foundcloud/spectrogram.jpg)
![Listening: FoundCloud records 5 seconds of whatever's playing](/images/foundcloud/listening.png)
![Match: the original track, with a confidence score and a link to it](/images/foundcloud/result.png)

## Tradeoffs

### Every technical choice was a user experience choice

- **Accuracy vs. speed** More detail per song meant better matches but slower results, so I tuned for fast enough to use in the moment
- **An honest answer** A confidence score instead of a yes/no, so people know how much to trust a match
- **Tested like it's used** Clean files first, then phone recordings in noisy rooms, the way people actually use it
- **!Know the limits** Repetitive dance tracks are hardest to identify, and they're exactly what shows up in DJ mixes

## Next Steps

### Designing what comes next

- **+Live waveform** Show the mic is picking up sound while recording
- **+Clearer errors** "Mic blocked" and "server down" need different fixes
- **+Onboarding** Explain why it needs the mic before asking
- **+Mobile first** It's a phone-in-the-air tool, so design for that first


## Reflection

### I can design the fix, and build it

FoundCloud started with a problem I felt myself, long before I studied UX. Building the whole system solo taught me what's possible under the hood, so I don't stop at saying what a product should do differently. I can make it happen.

<p><a class="btn" href="https://foundcloud.taylorfergusson.com/" target="_blank" rel="noreferrer">Try FoundCloud ↗</a></p>
