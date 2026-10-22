<!-- TODO (Taylor): add the prototype link in projects.js. These comments don't show on the site. -->

## Overview

<p class="my-part">I worked with the team through ideation, flows, and the shared design system, taking the lead on tokens and components, then built and refined my own final prototype.</p>

### Building community trust, one favour at a time

BorrowCircle is a community lending app: neighbours list the tools and equipment they rarely use, and people nearby can borrow them. Our team of 3 did the research and testing together, and then each of us designed and finished our own final prototype. This one is mine.

<div class="summary">

- **!The problem** We all have too much stuff we barely use, but asking to borrow the little things can feel like too much work.
- **Why it matters** Having relationships with your neighbours turns a neighbourhood into a community.
- **+The solution** A community lending app that uses borrowing as a reason to actually meet your neighbours.

</div>

## Result

### BorrowCircle's final prototype

We each finalized our own prototype individually. This one is mine. Styled after Honest Ed's, the quirky Toronto landmark that once gave its neighbourhood character.

#### The borrowing flow

![Home: "Wanted!" signs for what neighbours need, and hot items nearby](/images/borrowcircle/final-home.png)
![Search: "What do you need?", with recent searches one tap away](/images/borrowcircle/final-search.png)
![Results: nearby shovels, with a "Get it now!" starburst on the one you can borrow today](/images/borrowcircle/final-results.png)
![Item: photos, the lender's rating, tags, and the borrowing terms up front](/images/borrowcircle/final-item.png)
![Request: pick a duration, pickup date and time, and add a message](/images/borrowcircle/final-request.png)
![Chat: plan the pickup together, then see the borrow marked complete and the deposit refunded](/images/borrowcircle/final-chat.png)

#### The lending flow

![Post: add photos and details, with a deposit amount and condition](/images/borrowcircle/final-lend.png)
![Preview: see your listing exactly as neighbours will](/images/borrowcircle/final-preview.png)
![Profile: what you're borrowing, what you're lending, and your reviews](/images/borrowcircle/final-profile.png)

#### What came out of it

<div class="numbered">

1. **A fully integrated design system** 3-tier tokens and 27 component sets, built in Figma with variables, components, and auto layout.
2. **Accessible colour pairings** All 16 text and background pairings meet WCAG AA, and 9 of them reach AAA.
3. **Four changes backed by usability testing** Reviews, transaction details, borrowing status, and availability tags were all reworked.

</div>

<div class="process">

## The process

### How I got there

<div class="steps">

1. [Research](#research)
2. [Prototyping](#prototyping)
3. [Design system](#design-system)
4. [Testing](#testing)
5. [Iterating](#iterating)

</div>

## Research

### Supporting both sides of the loan

We started with a scenario. Bill has just moved to the suburbs, and his family is coming for dinner. His yard is overgrown, he can't afford a lawnmower yet, and he hasn't met any neighbours he could ask.

From there, we wrote proto-personas for both sides of a loan:

- **Bill, the borrower** A remote software developer on a budget due to moving. Comfortable online, nervous face to face. "I'm a little nervous making an introduction."
- **Janine, the lender** A community-minded grandmother whose house is full of equipment from years past. "We have all this junk that we only ever use every couple years!"

<div class="shots">
<figure><img src="/images/borrowcircle/persona-bill.png" alt="Proto-persona: Bill, the borrower. Remote software developer, budget-conscious, people pleaser, prefers chatting online. Quotes: I'm ok with the mess, as long as no one else sees it. I should really get on that, but I gotta do this first. I'm a little nervous making an introduction."><figcaption>Bill, the borrower</figcaption></figure>
<figure><img src="/images/borrowcircle/persona-janine.png" alt="Proto-persona: Janine, the lender. Grandmother, community-driven, empty nester, lots of equipment from past years. Quotes: We have all this junk that we only ever use every couple years! It's hard to keep up with all the people moving in and out of the neighbourhood. Back in my day I would have liked someone to help me out."><figcaption>Janine, the lender</figcaption></figure>
</div>

Each persona got a core task: Bill borrows a nearby lawnmower on short notice, and Janine lists her lawn equipment for the community. We mapped both as task flows before designing any screens.

![Borrowing flow: open the app, choose Borrow, search or browse, pick a user with the item, then schedule and confirm a pickup](/images/borrowcircle/flow-borrow.png)

*Bill's flow: choose Borrow, search or browse, pick a neighbour with the item, then schedule and confirm a pickup.*

![Lending flow: open the app, choose Lend, add item details, preview and confirm the posting, then contact the borrower and arrange pickup](/images/borrowcircle/flow-lend.png)

*Janine's flow: choose Lend, add the item's details, preview and post it, then arrange pickup with the borrower.*

> **The takeaway**
> Bill and Janine both need to trust each other, which should shape the screens we built.

## Prototyping

### Initial screens

<!-- PLACEHOLDER: add the initial screens here, e.g. ![Description](/images/borrowcircle/initial-home.png) -->

## Design System

<p class="my-part">Led the tokens, components and documentation</p>

### Design system

I set up the system before the screens, then we built the full screens with it.

<div class="numbered">

1. **Tokens first** Spacing and greyscale colours were set up first to give the screens a solid foundation that could be restyled later.
2. **27 component sets** Reusable elements like item cards, buttons, text input, and user info, all with variants and variant properties.
3. **AA contrast throughout** All 16 text pairings are at least 4.5:1 (AA), with 9 above 7:1 (AAA).

</div>

<div class="ds-grid">
<figure class="ds-figure">
<div class="ds-card">
<table class="ds-tiers">
<thead><tr><th scope="col">Tier</th><th scope="col">Tokens</th><th scope="col">Example</th></tr></thead>
<tbody>
<tr><td>Primitive</td><td>95, hidden</td><td><span class="ds-swatch" style="--c: #ba3830" aria-hidden="true"></span><code>colour/red/600</code></td></tr>
<tr><td>Semantic</td><td>74</td><td><span class="ds-swatch" style="--c: #ba3830" aria-hidden="true"></span><code>colour/brand/accent</code></td></tr>
<tr><td>Component</td><td>73</td><td><span class="ds-swatch" style="--c: #ba3830" aria-hidden="true"></span><code>button/primary-bg</code></td></tr>
</tbody>
</table>
</div>
<figcaption>Token tiers</figcaption>
</figure>
<div class="shots one">
<figure><img src="/images/borrowcircle/ds-search.png" alt="Search field component in all 3 states: default, typing with a clear button, and filled"><figcaption>Search field · all 3 states</figcaption></figure>
</div>
</div>

<div class="shots three">
<figure><img src="/images/borrowcircle/ds-wanted.png" alt="Wanted! poster component in all 3 variants: yellow, red and cream"><figcaption>Wanted! poster · all 3 variants</figcaption></figure>
<figure><img src="/images/borrowcircle/ds-tag.png" alt="Item tag component in all 3 variants: grey, yellow and dark"><figcaption>Item tag · all 3</figcaption></figure>
<figure><img src="/images/borrowcircle/ds-message.png" alt="Message component in both types: received with an avatar, and sent"><figcaption>Message · both types</figcaption></figure>
</div>

<figure class="ds-figure">
<div class="ds-card">
<table class="contrast">
<thead><tr><th scope="col">Text ↓ Background →</th><th scope="col">page</th><th scope="col">subtle</th><th scope="col">surface</th><th scope="col">loud</th><th scope="col">vibrant</th><th scope="col">brand/accent</th><th scope="col">dark</th><th scope="col">messages</th></tr></thead>
<tbody>
<tr><th scope="row">text/primary</th><td><span class="pair" style="background: #fcfcfb; color: #191919">17.1 AAA</span></td><td><span class="pair" style="background: #f3f2ee; color: #191919">15.7 AAA</span></td><td><span class="pair" style="background: #eeebe6; color: #191919">14.8 AAA</span></td><td><span class="pair" style="background: #fff6d7; color: #191919">16.3 AAA</span></td><td><span class="pair" style="background: #ffde5c; color: #191919">13.3 AAA</span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td></tr>
<tr><th scope="row">text/secondary</th><td><span class="pair" style="background: #fcfcfb; color: #555350">7.5 AAA</span></td><td><span class="pair" style="background: #f3f2ee; color: #555350">6.8 AA</span></td><td><span class="pair" style="background: #eeebe6; color: #555350">6.4 AA</span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td></tr>
<tr><th scope="row">text/attention</th><td><span class="pair" style="background: #fcfcfb; color: #ba3830">5.5 AA</span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair" style="background: #eeebe6; color: #ba3830">4.8 AA</span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td></tr>
<tr><th scope="row">status/error</th><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair" style="background: #fff6d7; color: #892d26">7.9 AAA</span></td><td><span class="pair" style="background: #ffde5c; color: #892d26">6.4 AA</span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td></tr>
<tr><th scope="row">text/light</th><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair" style="background: #ba3830; color: #f1efea">4.9 AA</span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td></tr>
<tr><th scope="row">text/inverse</th><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair none"><span class="visually-hidden">Not used</span></span></td><td><span class="pair" style="background: #ba3830; color: #fcfcfb">5.5 AA</span></td><td><span class="pair" style="background: #322a12; color: #fcfcfb">13.9 AAA</span></td><td><span class="pair" style="background: #2c2b2a; color: #fcfcfb">13.8 AAA</span></td></tr>
</tbody>
</table>
</div>
<figcaption>Contrast matrix · Pairings used in the prototype</figcaption>
</figure>

## Testing

<p class="my-part">Moderated 2 of our 6 remote sessions and gathered findings from the transcripts</p>

### Testing with people who already use marketplaces

We recruited 6 participants familiar with online marketplace platforms and ran remote usability testing: 5-second tests, think-aloud tasks, follow-up interviews, and the System Usability Scale.

#### What we found

- **!Trust was in question** People checked reviews and profiles before agreeing to meet a stranger
- **!The deposit got skimmed** The deposit checkbox was required, but most people ticked it out of habit
- **!"On lend" read as unavailable** People assumed they couldn't borrow those items at all
- **!Borrowing vs. messaging** People expected to message the lender first, like on Facebook Marketplace

> **Participant 3, on the deposit**
> "I kinda just skimmed everything […] I feel a lot of people do the same thing that I would and just check box because it's this force of habit."

#### Peer review

Before testing, peer designers had critiqued the same prototype. Reading their notes next to the test findings, the same themes came up again:

- **!No shared return date** The item page showed the deposit, but not how long you could borrow it or when it was due back
- **!Whose review is it?** Reviews on an item page read like reviews of the item, not of the person lending it
- **!Borrow, or chat?** It wasn't clear that tapping "Borrow" would lead to a conversation with the lender
- **!Safety needs an exit** Meeting strangers calls for a way to report or block someone

> **The takeaway**
> Both groups were really asking the same question: can I trust this person, and do I know exactly what I'm agreeing to?

## Iterating

<p class="my-part">Turned the findings into four changes in my final prototype</p>

### Four changes, all about trust

<p class="kicker">Change 1</p>

#### Mandatory, clear deposit

Moved out of a checkbox buried in the form, into its own confirmation step you have to read and accept.

<div class="compare wide">
<figure>
<figcaption>Before</figcaption>
<img src="/images/borrowcircle/before-request.png" alt="Earlier borrow form, with the deposit as a small checkbox above the buttons">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/borrowcircle/final-deposit.png" alt="Deposit Notice: This item requires a $15 deposit. Do you still wish to confirm?">
</figure>
</div>

**Borrow terms up front** Condition, borrow length, pickup time, and location are now clearly shown on the item page.

<div class="compare">
<figure>
<figcaption>Before</figcaption>
<img src="/images/borrowcircle/before-item.png" alt="Earlier item page with a single grey Borrow button and one user review">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/borrowcircle/final-item.png" alt="Final item page with the lender's rating, tags, and a box of borrowing terms">
</figure>
</div>

<p class="kicker">Change 2</p>

#### Distinct profile reviews

Profiles now show the person's rating on its own, apart from reviews of a single item.

<div class="compare">
<figure>
<figcaption>Before</figcaption>
<img src="/images/borrowcircle/before-profile-other.png" alt="Earlier profile with a short bio, listings and borrowed items, and no reviews">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/borrowcircle/final-profile-other.png" alt="Final profile with a star rating, what they're currently borrowing, listings and reviews">
</figure>
</div>

<p class="kicker">Change 3</p>

#### Show what people are borrowing right now

A borrowing history became a live "Currently borrowing" list, with days left on each item. Seeing that someone returns things on time is more convincing than a list of past loans.

<div class="compare">
<figure>
<figcaption>Before</figcaption>
<img src="/images/borrowcircle/before-profile-you.png" alt="Earlier version of your own profile, with a list of borrowed items">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/borrowcircle/final-profile.png" alt="Final version of your own profile, with a Currently Borrowing list showing days left">
</figure>
</div>

<p class="kicker">Change 4</p>

#### Clear availability

Items you can borrow right now get a "Get it now!" tag, and the "On lend" label was removed completely, so people stop assuming a borrowed item is off-limits.

<div class="compare">
<figure>
<figcaption>Before</figcaption>
<img src="/images/borrowcircle/before-results.png" alt="Earlier search results with Available and On Lend tags">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/borrowcircle/final-results.png" alt="Final search results where only the item you can borrow now gets a Get it now! starburst">
</figure>
</div>

</div>

## Reflection

### What I learned

<div class="numbered">

1. **The power of design systems** While building tokens and components felt slow at first, it quickly paid off as the prototype scaled. New screens with repeated elements were faster to build, and building the tablet and desktop layouts was easy. Accessibility checks at the end were credible too, since I knew exactly which colours I was using and could trust they were applied correctly everywhere.
2. **Don't make users fight what's natural** Since ticking boxes is automatic, people glossed past the required checkbox. Something like money needs a proper confirmation, so people know what they're getting into.

</div>
