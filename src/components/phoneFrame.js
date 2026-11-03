// Puts any element (an image, a video, a prototype) inside the site's phone frame (iphone.css).
// For React, use <Phone> from Phone.jsx instead; both make the same markup.
export function makePhone(content) {
  const part = (className) => {
    const el = document.createElement('span')
    el.className = className
    return el
  }
  const decor = (className) => {
    const el = part(className)
    el.setAttribute('aria-hidden', 'true')
    return el
  }
  const phone = part('phone')
  const body = part('phone-body')
  const glass = part('phone-glass')
  if (content.parentNode) content.replaceWith(phone)
  glass.append(content, decor('phone-speaker'), decor('phone-island'))
  body.append(glass)
  phone.append(decor('phone-key phone-key-action'), decor('phone-key phone-key-up'), decor('phone-key phone-key-down'), decor('phone-key phone-key-side'), body)
  return phone
}
