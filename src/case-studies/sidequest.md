<!-- TODO (Taylor): add images. Ideally: the opportunity solution tree, a few screens of the app,
     and a diagram of how events flow in from Ticketmaster and Instagram.
     The Reflection points are drafts in your voice: rewrite them so they're really yours. These comments don't show on the site. -->

## Overview

<p class="my-part">Led the backend and API integration, and set up how the team builds</p>

### Something to do tonight, picked for you

SideQuest is a Toronto event discovery app with AI-powered suggestions. It's our team project for Designing Human Agency in AI Systems at U of T, built from the first week of class to a demo day on December 3. It's still in progress.

<div class="summary">

- **!The problem** Local events are scattered across many sites, so finding something that fits your budget, your plans, and your mood takes too long.
- **Why it matters** If finding something is hard, people stay home, and good local events miss the people who'd love them.
- **+The solution** One app that brings real Toronto events together, including the ones only posted on Instagram, and uses AI to suggest the right ones while leaving people in control.

</div>

## Result

### Where it stands

<div class="numbered">

1. **A working prototype** Still bare bones, but it runs end to end, with a database set up for events, profiles, and analytics
2. **Events from where people actually post them** We're moving to the Ticketmaster and Instagram Business APIs, so events that only live on Instagram finally show up
3. **AI with guardrails** Budget and travel limits are applied before the AI runs, and only eligible events are accepted back

</div>

<div class="process">

## The process

### How we got there

<div class="steps">

1. [Research](#research)
2. [Team setup](#team-setup)
3. [Building](#building)
4. [Human agency](#human-agency)

</div>

## Research

<p class="my-part">Interviewed Toronto locals and mapped the opportunities</p>

### Talking to people first

We interviewed Toronto locals about how they find events, then mapped what we heard into an opportunity solution tree. It didn't flip the idea on its head, but it showed us something we'd been taking too lightly: location.

I'd assumed people would travel for an event they cared about. Many wouldn't. Some people's comfort zone is much smaller than I expected, and they'd rather not leave their own neighbourhood at all.

> **The takeaway**
> How far someone is willing to go is as important as what they're into. So distance became a core part of how SideQuest suggests events, not just a filter.

## Team Setup

<p class="my-part">Set up GitHub, VS Code, and Claude Code, and onboarded the team</p>

### Six people, one codebase

Most of our team had never written code. I set up our version control (branches, pull requests, and code review) along with VS Code and Claude Code, then onboarded 5 teammates so everyone could contribute.

From there, we split the work by strength. I took the backend and API integration, since I've worked with APIs before. Teammates took on the visual design and recruiting participants for usability testing. I still review the team's pull requests.

## Building

<p class="my-part">Built the first drafts, then led the backend</p>

### From Sketch 0 to a real app

I built the first working drafts (our "Sketch 0"), then built and directed the later versions using my own coding skills, with Claude Code as an assistant for repetitive work like deployment.

#### Version 1: careful web scraping

Our first event importer collected events from public sites:

- **Only from sources that allow it** We checked every site's robots.txt and terms first, and left out the ones that didn't allow it
- **Never guessing** When information was missing, the app showed "N/A" instead of making it up
- **Polite and tidy** It rate-limited and cached requests, and merged events listed on more than one site

It worked, but it wasn't reliable enough. Scraped pages didn't consistently give us the details we needed.

#### Version 2: real APIs

So I'm moving us to the Ticketmaster and Instagram Business APIs. Instagram is the big one: lots of Toronto events, especially smaller local ones, are only ever posted there. Most event apps miss them completely, and they're hard to find on Instagram itself, since it isn't built for browsing events.

The data now lives in a Supabase database, set up for events, user profiles, and analytics.

## Human Agency

### AI that helps, without taking over

The course is about designing AI that leaves people in control, so that shaped every AI feature:

- **Personal taste scoring** Suggestions based on what you've liked before
- **Mood-based search** Describe the night you want, not just a category
- **Group picks** Recommendations that work for a whole party
- **Help for hosts** Drafts event ideas from what attendees are asking for

Behind them, a fallback chain (the Anthropic API, then Claude Code, then simple keyword matching) means the app never breaks, and it always shows which one was used.

> **Honest metrics**
> Accepting a quest only counts as intent. Attendance only counts after someone confirms "Did you go?"

</div>

## Next Steps

### On the way to demo day

The prototype works, but some flows are still unintuitive. Before demo day on December 3, we're:

- **Finishing the API integration** Getting Ticketmaster and Instagram events flowing in reliably
- **Fixing the rough flows** Making the app as easy to use as it is functional
- **Testing with real people** Running usability tests with participants our team is recruiting

## Reflection

### What I'm learning so far

<div class="numbered">

1. **The setup is part of the design** Getting everyone able to ship code safely was the most important thing I did in the first few weeks.
2. **Honest data builds trust** Showing "N/A", leaving out sources that don't allow it, and only counting confirmed attendance all make the app easier to trust.
3. **Check your own assumptions about people** I'd have happily designed for people who travel across the city for a good event. The interviews showed me that a lot of people won't, and that changed what the app needs to do first.

</div>
