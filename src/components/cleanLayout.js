import './cleanLayout.css'

// The case study layout: every section becomes a row, with its small label on the left and its content
// on the right. It's used for every case study (theme: 'classic' in projects.js brings back the older look).
// The case study's Markdown doesn't need anything special. The look is in cleanLayout.css.
export function makeCleanLayout(prose) {
  if (prose.dataset.clean) return
  prose.dataset.clean = 'true'

  // The process sections become ordinary rows, with "Process · 01", "Process · 02"... above their labels
  prose.querySelectorAll(':scope > .process').forEach((band) => {
    band.querySelectorAll(':scope > h2').forEach((h, i) => {
      if (i > 0) h.dataset.step = `Process · ${String(i).padStart(2, '0')}`
    })
    band.replaceWith(...band.childNodes)
  })

  // Cards get a round badge: your icon in white (or ! / + if the card has no icon),
  // orange for problems, green for opportunities, black for everything else. Summary cards keep their own look.
  prose.querySelectorAll('ul:has(> li > strong:first-child), ul:has(> li > img:first-child)').forEach((list) => {
    if (list.closest('.summary')) return
    list.classList.add('badge-cards')
    ;[...list.children].forEach((li) => {
      const icon = li.querySelector(':scope > img:first-child')
      const badge = document.createElement('span')
      badge.className = 'badge'
      badge.setAttribute('aria-hidden', 'true')
      if (icon) { icon.alt = ''; badge.append(icon) }
      else if (li.classList.contains('card-problem')) badge.textContent = '!'
      else if (li.classList.contains('card-opportunity')) badge.textContent = '+'
      else li.classList.add('no-badge')
      const body = document.createElement('div')
      body.className = 'badge-body'
      body.append(...li.childNodes)
      li.append(badge, body)
    })
  })

  // A small colour key above the first section
  const key = document.createElement('p')
  key.className = 'cs-key'
  key.innerHTML = '<span class="key-me">My part</span><span class="key-problem">Problem</span><span class="key-solution">Solution</span><span class="key-insight">Insight</span>'
  prose.before(key)

  // Each ## heading starts a new row: the heading goes in the left column, everything after it on the right
  let content = null
  let label = null
  const startRow = (heading) => {
    const row = document.createElement('section')
    row.className = 'cs-row'
    label = document.createElement('div')
    label.className = 'cs-label'
    if (heading) { label.append(heading); row.dataset.section = heading.id }
    content = document.createElement('div')
    content.className = 'cs-content'
    row.append(label, content)
    prose.append(row)
  }
  ;[...prose.childNodes].forEach((node) => {
    if (node.nodeName === 'H2') startRow(node)
    else if (node.classList?.contains('my-part') && label) label.append(node) // "My part" sits under the label
    else if (content) content.append(node)
    else if (node.nodeType === Node.ELEMENT_NODE) { startRow(null); content.append(node) }
    else node.remove() // blank space or a note before the first section
  })
}
