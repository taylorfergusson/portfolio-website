## Overview

### Showing off a station with a good heart

CIUT 89.5 FM is U of T's campus and community radio station. It has a good heart, but its website wasn't showing it. I found the technical reasons why, then redesigned the site around the people who love it.

<div class="columns">

#### The Challenge

Figure out what was keeping listeners, students, and volunteers from connecting with CIUT online.

#### The Outcome

A content audit, a new site structure, and a 12-page Figma prototype that feels like CIUT.

</div>

![CIUT website redesign concept](/images/ciut/overview.png)

- **155 URLs crawled** Every page, image, and file on the site
- **74 show pages** 10 audited in depth as representative samples
- **3 stations compared** CJTM, CKUT, and n10.as
- **12 pages redesigned** All clickable in Figma

## Problem

### I wanted to volunteer… but how?

CIUT runs on volunteers, so I was surprised that when I went looking to volunteer, the website barely mentioned it.

It didn't stop there. Info about the station and how to get involved was often missing, misplaced, or buried. For a nonprofit that runs on donations and volunteers, that's a big deal!

> **Problem Statement**
> CIUT's listeners and community need a clear way to find the station's shows, events, and ways to help, so they can connect with it and support it.

## Audit

### Every page, rated

This started as a school assignment, but I picked CIUT because I actually care about it, and I took it way past what was asked.

- ![](/images/ciut/icon-seo-crawl.png) **Phase 1: SEO crawl** Screaming Frog pulled every page, image, link, and bit of metadata, and surfaced hidden technical issues.
- ![](/images/ciut/icon-manual-audit.png) **Phase 2: Manual content audit** I rated every piece of content from 1 to 5 on whether it was:

<!-- This comment keeps the two groups of cards separate -->

- **Accurate** Correct and up to date
- **Actionable** Tells you what to do next
- **Findable** Easy to locate
- **Relevant** Serves the audience
- **Usable** Easy to understand

#### What I found

- ![](/images/ciut/icon-quality.png) **!Lack of polish** Broken show links, a COVID-19 notice still on the Advertising page, and a board list missing titles and emails
- ![](/images/ciut/icon-context.png) **!Missing context** A donate button beside unexplained hat and T-shirt photos, and captionless photos site-wide
- ![](/images/ciut/icon-stale.png) **!Stale content** Most shows had active social media that the site rarely linked to, and the events CIUT runs were barely mentioned
- ![](/images/ciut/icon-structure.png) **!Messy information** 70 pages with no meta description, 76 sharing "Just another WordPress site", and headings out of order

Visitors had to work way too hard to piece things together, and so did search engines.

![About page: a board list with inconsistent formatting and missing information](/images/ciut/audit-1.png)
![Home page: donate button next to an unexplained hat and shirt](/images/ciut/audit-2.png)
![Show page: Eclectica, with a low-quality photo and no links](/images/ciut/audit-3.png)
![HeadingsMap: the Contact page jumps from an h1 straight to h6s](/images/ciut/audit-4.png)

## Recommendations

### Five fixes, most important first

- **+1. Fix what's broken or missing** Every show and podcast gets its own page with a photo, description, and contact info
- **+2. Add context and clarity** Every section and call to action explains what it is and why it matters
- **+3. Restructure for readability** Short paragraphs, real subheadings, and consistent show pages
- **+4. Refine for SEO** Unique titles and meta descriptions, and a proper heading hierarchy
- **+5. Link out** Make the site the hub for shows' social media, CIUT's own accounts, and live events

## Comparative Analysis

### How do other stations do it?

I looked at three stations with similar missions and more polished sites: CJTM (TMU), CKUT (McGill), and n10.as (Montreal). Here's what they had in common:

- **+Always-there actions** "Listen Live" and "Donate" live in a fixed header
- **+Schedules vs. shows** Calendar-style schedules, and separate photo grids of shows with filters
- **+Show pages that invite** Genre tags, external links, and easy access to past episodes
- **+A home for events** Dedicated News & Events pages, plus footers with address and socials

## Architecture

### Restructuring the site around what listeners do

- **Always one click away** Listen Live and Donate sit in the header on every page
- **Schedule and Shows, split** "What's on now?" and "what's on CIUT?" each get a clear answer
- **New homes for content** Podcasts and News & Events get their own pages
- **A tidier menu** En Français, Alumni, and Bylaws move under About

![The original site structure](/images/ciut/ia-before.png)

*Before: a flat menu of ten sections, with shows only reachable through the schedule or an alphabetical list.*

![The proposed site structure](/images/ciut/ia-after.png)

*After: clear top-level sections, with individual show and podcast pages, and supporting pages grouped under About.*

## Redesign

### CIUT.fm, redesigned

I prototyped all 12 pages in Figma, so you can click around yourself:

<div class="prototype"
  data-src="https://embed.figma.com/proto/CVXtM5bAcmKy8SH2V2zSpn/CIUT-Prototype-Revised?node-id=3014-12187&starting-point-node-id=3014%3A12187&page-id=3002%3A7008&scaling=scale-down-width&content-scaling=fixed&hide-ui=1&embed-host=share"
  data-link="https://www.figma.com/proto/CVXtM5bAcmKy8SH2V2zSpn/CIUT-Prototype-Revised?node-id=3014-12187&starting-point-node-id=3014%3A12187&page-id=3002%3A7008&scaling=scale-down&content-scaling=fixed"
  data-poster="/images/ciut/redesign-home.jpg"></div>

#### The mystery hat and T-shirt, explained

<div class="compare wide">
<figure>
<figcaption>Before</figcaption>
<img src="/images/ciut/audit-2.png" alt="Original home page: a donate button next to an unexplained hat and shirt">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/ciut/redesign-donate.jpg" alt="Redesigned Donate page explaining why donations matter, with the free hat and T-shirt labelled as rewards">
</figure>
</div>

*The hat and shirt are now clearly rewards ("free with a donation over $50"), and the page explains where donations go.*

#### Every show gets a real page

<div class="compare wide">
<figure>
<figcaption>Before</figcaption>
<img src="/images/ciut/audit-3.png" alt="Original Eclectica show page with a low-quality photo and a block of text">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/ciut/redesign-show.jpg" alt="Redesigned show page with photo, time slot, categories, hosts, social links and past episodes">
</figure>
</div>

*A consistent layout for every show: time slot, genres, hosts, social links, and past episodes to play.*

#### Finally, who to email

<div class="compare wide">
<figure>
<figcaption>Before</figcaption>
<img src="/images/ciut/audit-1.png" alt="Original About page board list with inconsistent formatting">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/ciut/redesign-contact.jpg" alt="Redesigned Contact page with general inquiries, direct contacts, the board of directors, address, hours and social links">
</figure>
</div>

*The board moved to Contact, and every person now has a title and email, alongside the station's address, hours, and socials.*

#### Everywhere else

![Home: a live "On Air Now" banner showing the current show](/images/ciut/redesign-home.jpg)
![Schedule: weekly tabs, with the show on air right now highlighted](/images/ciut/redesign-schedule.jpg)
![Shows: a photo grid with genres, search, and filters](/images/ciut/redesign-shows.jpg)
![News & Events: a new page for the events CIUT already runs](/images/ciut/redesign-news.jpg)
![About: walls of text broken into clear, headed sections](/images/ciut/redesign-about.jpg)

## Reflection

### The work that matters most might be right in front of you

We often dream about redesigning giant platforms. But sometimes what needs the most help is a small, community thing close to home.

CIUT runs on volunteers, with limited funding and not enough hands to catch everything. It felt so good to turn a school project into real fixes on their site, and help people connect with an organization that's truly lovable.
