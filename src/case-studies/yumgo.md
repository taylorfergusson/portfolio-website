## Overview

### Comfort in the unfamiliar

YumGo is a food discovery app for tourists. When you're somewhere new, with dietary needs or a certain vibe in mind, it helps you find a place that feels right.

<div class="summary">

- **!The problem** Finding somewhere to eat on a trip means bouncing between apps, with missing menus and info you can't trust.
- **Why it matters** Being somewhere new is half the fun of travelling, until you're tired, juggling a group, and hunger hits.
- **+The solution** One app for the whole journey, from discovering to dining, so you know what to expect before you walk in.

</div>

## Result

### YumGo (Taylor's Version)

My own take on the final design: the fun of travelling, the comfort of apps you already know, and real photos to ground you. Try it yourself!

<div class="prototype" data-device="phone"
  data-src="https://embed.figma.com/proto/X8Lj3tw4SuO8GV3fsCCiKU/YumGo-Final-Prototype?node-id=2131-13299&starting-point-node-id=2131%3A13299&page-id=2131%3A13129&scaling=scale-down&content-scaling=fixed&hide-ui=1&embed-host=share"
  data-link="https://www.figma.com/proto/X8Lj3tw4SuO8GV3fsCCiKU/YumGo-Final-Prototype?node-id=2131-13299&starting-point-node-id=2131%3A13299&page-id=2131%3A13129&scaling=min-zoom&content-scaling=fixed"
  data-poster="/images/yumgo/final-home.jpg"></div>

#### The full journey, from discovering to dining

![Search results: photos, ratings, distance, price and dietary icons at a glance](/images/yumgo/final-results.jpg)
![Restaurant info: real photos, hours, price, and what the restaurant offers](/images/yumgo/final-restaurant.jpg)
![Menu: dishes matching your filters are pinned to the top](/images/yumgo/final-menu.jpg)
![Reviews: the most relevant first, with photos](/images/yumgo/final-reviews.jpg)
![Booking: reserve a table without leaving the app](/images/yumgo/final-booking.jpg)
![Directions: route and arrival time to the restaurant](/images/yumgo/final-directions.jpg)
![Wishlist: save places for this trip or the next](/images/yumgo/final-wishlist.jpg)
![Group voting: share a link so everyone can vote on where to eat](/images/yumgo/final-voting.jpg)
![Discover Toronto: dining tips, tipping, and local foods to try](/images/yumgo/final-discover.jpg)

#### What came out of it

<div class="numbered">

1. **One app, discover to dine** Search, menus, reviews, booking, and directions, all in one place.
2. **Built on real people** 8 interviews and 8 usability tests shaped what made it in.
3. **Four designers, one app** I led a team of 4 from research to prototype, and kept it feeling like one app.

</div>

<div class="process">

## The process

### How we got there

<div class="steps">

1. [Problem](#problem)
2. [Secondary research](#secondary-research)
3. [Interviews](#interviews)
4. [Prototyping](#prototyping)
5. [Testing](#testing)

</div>

## Problem

### Eating while travelling should be good and easy. No ifs, ands, or buts.

Being somewhere unfamiliar is half the fun of travelling. It's all fun and games, until you're tired, short on time, juggling a group… and then hunger hits.

Now you're bouncing between apps to find the info you actually care about. Where do you even start?

> **Problem Statement**
> Tourists need one personalized place to discover and book restaurants, so that eating somewhere new feels easy and memorable.

## Secondary research

### We (wrongfully) assumed it was all about time

We thought tourists wanted food ASAP so they could get back to sightseeing. Early research said otherwise: wait times barely came up.

- ![](/images/yumgo/icon-missing-info.png) **!Missing information** Incomplete business and menu info
- ![](/images/yumgo/icon-weak-discovery.png) **!Weak discovery & booking** Apps didn't support the full journey
- ![](/images/yumgo/icon-irrelevant.png) **!Irrelevant content** Full of noise and unwanted results
- ![](/images/yumgo/icon-authenticity.png) **+Desire for authenticity!** Tourists wanted local, quality meals

> **The takeaway**
> So I convinced my team to pivot: less about speed, more about authentic experiences that current apps weren't supporting.

## Interviews

### Travellers wanted to dine with certainty

We ran eight interviews with recent tourists about travel, food, and the apps they use for it. I moderated two and took notes on two more.

![Affinity map from our interviews](/images/yumgo/research-1.jpg)
![Interview synthesis table](/images/yumgo/research-2.png)
![Persona: Pat, the Picky Western Taster](/images/yumgo/research-3.png)
![Persona: Halsey](/images/yumgo/research-4.png)
![User flow](/images/yumgo/research-5.png)
![Early sketches](/images/yumgo/research-6.jpg)

> **The takeaway**
> People wanted to feel like they'd been somewhere before they walked in the door. So we focused on cultural connection and seeing the menu ahead of time.

## Prototyping

### So… what do we make?

We got a little too excited about features, so I defined our main user path early to keep us focused. I built the main restaurant page for the wireframe: info, menu, and reviews.

![Home map](/images/yumgo/wireframe-1.png)
![Restaurant info](/images/yumgo/wireframe-2.png)
![Booking](/images/yumgo/wireframe-3.png)
![Menu](/images/yumgo/wireframe-4.png)
![Reviews](/images/yumgo/wireframe-5.png)
![Directions](/images/yumgo/wireframe-6.png)
![Learn About Toronto](/images/yumgo/wireframe-7.png)
![Wishlist](/images/yumgo/wireframe-8.png)

#### Our two rules

<div class="numbered">

1. **Less is more!** Fewer features, one complete journey
2. **Familiarity is the way** Borrow from apps people already know

</div>

## Testing

### Clarity had to be improved… a lot

Eight participants tried two tasks in our Figma prototype:

1. Book a table somewhere dog-friendly with vegan and gluten-free options
2. Write a review afterwards

<div class="callout-box">

**MAYDAY**

After the first two interviews, I noticed that task 1 encouraged participants to use the search filters, but the toggle interactions were broken and users got stuck trying to make it work. OH NO!

I wanted to avoid unnecessary friction in future tests, and also wanted to make room for unique, novel, and valuable insights (instead of something I already knew). So, I scurried to solve this problem in the couple hours before the next user test.

<div class="compare">
<figure>
<figcaption>Before</figcaption>
<img src="/images/yumgo/toggle-before.jpg" alt="Initial version: not all filter buttons updated as expected">
</figure>
<figure>
<figcaption>After</figcaption>
<img src="/images/yumgo/toggle-after.jpg" alt="Updated version: icons are now properly selectable and deselectable">
</figure>
</div>

*Left: the initial toggle, where not all filter buttons updated as expected. Right: icons are now properly selectable and deselectable, and their status is reflected in the restaurant list.*

In the nick of time, I solved the problem and toggling now worked better than ever. Also, all future participants did indeed use this function, which made me feel like a superhero. Phew!

</div>

#### What we discovered

- ![](/images/yumgo/icon-filters.png) **!Filters were unclear** People still didn't know what the icons meant
- ![](/images/yumgo/icon-key-info.png) **!Key info was easy to miss** Too much text buried what mattered

<p class="kicker">The fix · Labels for every icon</p>

#### From tested to final

<div class="compare">
<figure>
<figcaption>Tested</figcaption>
<img src="/images/yumgo/toggle-after.jpg" alt="Filters as tested: icon-only buttons">
</figure>
<figure>
<figcaption>Final</figcaption>
<img src="/images/yumgo/final-filters.jpg" alt="Final filters: every icon has a label, plus price and distance sliders">
</figure>
</div>

*Participants didn't understand the icon-only filters, so every icon now has a label.*

</div>

## Reflection

### What I learned

<div class="numbered">

1. **Keeping four people's work feeling like one app** Everyone used Figma and components a little differently, so there was a lot of reorganizing to do. I'm proudest that I could spot when we were drifting off course, rally the team, and get everyone's ideas flowing together, instead of ending up with a bunch of disjointed pieces.
2. **Moving in reverse is still moving** Backpedalling (like on wait times) was hard, but I learned to hold ideas loosely and see pivots for what they REALLY are: improvements!

</div>
