type MarqueeBarProps = {
  text: string
}

export function MarqueeBar({ text }: MarqueeBarProps) {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}
