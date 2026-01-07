import { useEffect, useRef } from 'react'
import './RunningText.css'

function RunningText({ text = "Design • Development • Creative • Visual", speed = 50 }) {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    const marqueeContent = marquee.querySelector('.marquee-content')
    const clone = marqueeContent.cloneNode(true)
    marquee.appendChild(clone)

    const totalWidth = marqueeContent.offsetWidth
    let position = 0

    const animate = () => {
      position -= speed / 60
      if (Math.abs(position) >= totalWidth) {
        position = 0
      }
      marquee.style.transform = `translateX(${position}px)`
      requestAnimationFrame(animate)
    }

    animate()
  }, [speed])

  return (
    <div className="running-text-wrapper">
      <div ref={marqueeRef} className="marquee">
        <div className="marquee-content">
          {text.split('•').map((item, index) => (
            <span key={index} className="marquee-item">
              {item.trim()}
              {index < text.split('•').length - 1 && <span className="separator">•</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RunningText
