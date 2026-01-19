import { useEffect, useRef, useCallback } from 'react'
import { animate } from 'animejs'

const SvgTextDraw = () => {
  const containerRef = useRef(null)
  const perimeterRef = useRef(0)
  const currentAnimation = useRef(null)

  const reverseAnimation = useCallback((textElement) => {
    const perimeter = perimeterRef.current

    if (currentAnimation.current) {
      currentAnimation.current.pause()
    }

    currentAnimation.current = animate(textElement, {
      strokeDashoffset: perimeter,
      duration: 8000,
      ease: 'inOut(2)'
    })
  }, [])

  const playAnimation = useCallback((textElement) => {
    const perimeter = perimeterRef.current

    if (currentAnimation.current) {
      currentAnimation.current.pause()
    }

    currentAnimation.current = animate(textElement, {
      strokeDashoffset: [perimeter, 0],
      duration: 15000,
      ease: 'out(2)'
    })
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const textElement = containerRef.current.querySelector('.svg-text')
    if (!textElement) return

    const initAndObserve = () => {
      const bbox = textElement.getBBox()
      const perimeter = (bbox.width + bbox.height) * 3
      perimeterRef.current = perimeter

      textElement.style.strokeDasharray = perimeter
      textElement.style.strokeDashoffset = perimeter

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playAnimation(textElement)
            } else {
              reverseAnimation(textElement)
            }
          })
        },
        { threshold: 0.3 }
      )

      observer.observe(containerRef.current)

      return () => observer.disconnect()
    }

    let cleanup
    if (document.fonts) {
      document.fonts.ready.then(() => {
        cleanup = initAndObserve()
      })
    } else {
      setTimeout(() => {
        cleanup = initAndObserve()
      }, 100)
    }

    return () => {
      if (cleanup) cleanup()
    }
  }, [playAnimation, reverseAnimation])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 100,
        padding: '0 20px'
      }}
    >
      <svg
        viewBox="0 0 1440 400"
        style={{
          width: '100%',
          maxWidth: '1440px',
          height: 'auto'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@800&display=swap');
              .svg-text {
                font-family: 'Mona Sans', sans-serif;
                font-weight: 800;
              }
            `}
          </style>
        </defs>
        <text
          className="svg-text"
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="385"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <tspan stroke="#1b1b1b">CEN</tspan><tspan stroke="#F04F23">SE.</tspan>
        </text>
      </svg>
    </div>
  )
}

export default SvgTextDraw
