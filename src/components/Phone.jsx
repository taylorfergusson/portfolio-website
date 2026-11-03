// The site's phone frame (a Black iPhone 18 Pro, styles in iphone.css). Put a screen inside it:
//   <Phone><img src="..." alt="..." /></Phone>
// phoneFrame.js makes the same markup for case study images and prototypes.
export default function Phone({ children, className = '' }) {
  return (
    <span className={`phone ${className}`.trim()}>
      <span className="phone-key phone-key-action" aria-hidden="true" />
      <span className="phone-key phone-key-up" aria-hidden="true" />
      <span className="phone-key phone-key-down" aria-hidden="true" />
      <span className="phone-key phone-key-side" aria-hidden="true" />
      <span className="phone-body">
        <span className="phone-glass">
          {children}
          <span className="phone-speaker" aria-hidden="true" />
          <span className="phone-island" aria-hidden="true" />
        </span>
      </span>
    </span>
  )
}
