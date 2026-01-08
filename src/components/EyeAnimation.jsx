import { useState, useEffect } from 'react'

const EyeAnimation = ({ className, style }) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const moveEyes = () => {
      // Random movement range for pupils - balanced for visibility without going outside
      const randomX = (Math.random() - 0.5) * 14
      const randomY = (Math.random() - 0.5) * 14

      setEyePosition({ x: randomX, y: randomY })
    }

    // Initial movement after 1 second
    const initialTimeout = setTimeout(moveEyes, 1000)

    // Random movements every 0.8-1.5 seconds (more frequent)
    const interval = setInterval(() => {
      moveEyes()
    }, Math.random() * 700 + 800)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <svg
      width="127"
      height="126"
      viewBox="0 0 127 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Mata kanan - bagian putih */}
      <path
        d="M72.431 8.24072C64.3672 10.3247 58.3314 17.3971 55.1496 27.2898C51.9701 37.1755 51.6709 49.8063 55.0366 62.8295C58.4022 75.8527 64.7837 86.757 72.3547 93.8643C79.9313 100.977 88.6379 104.239 96.7017 102.155C104.766 100.071 110.801 92.9988 113.983 83.1061C117.163 73.2205 117.462 60.5896 114.096 47.5664C110.731 34.5433 104.349 23.639 96.778 16.5316C89.2015 9.41923 80.4948 6.15675 72.431 8.24072Z"
        fill="white"
        stroke="black"
      />

      {/* Mata kiri - bagian putih */}
      <path
        d="M30.139 22.9968C22.0752 25.0808 16.0394 32.1532 12.8576 42.0459C9.67813 51.9316 9.37894 64.5624 12.7446 77.5856C16.1102 90.6088 22.4917 101.513 30.0627 108.62C37.6393 115.733 46.3459 118.995 54.4098 116.911C62.4736 114.827 68.5093 107.755 71.6912 97.8622C74.8707 87.9766 75.1698 75.3457 71.8042 62.3226C68.4386 49.2994 62.0571 38.3951 54.486 31.2877C46.9095 24.1753 38.2029 20.9129 30.139 22.9968Z"
        fill="white"
        stroke="black"
      />

      {/* Pupil kiri hitam - dengan animasi */}
      <g style={{
        transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
      }}>
        <ellipse
          cx="9.62883"
          cy="15.2198"
          rx="9.62883"
          ry="15.2198"
          transform="matrix(-0.968191 0.250214 0.250214 0.968191 63.04 48.8492)"
          fill="black"
        />
        {/* Highlight kiri putih */}
        <ellipse
          cx="4.63438"
          cy="2.83157"
          rx="4.63438"
          ry="2.83157"
          transform="matrix(-0.90708 0.420958 0.420958 0.90708 68.6997 64)"
          fill="white"
        />
      </g>

      {/* Pupil kanan hitam - dengan animasi */}
      <g style={{
        transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
      }}>
        <ellipse
          cx="9.62883"
          cy="15.2198"
          rx="9.62883"
          ry="15.2198"
          transform="matrix(-0.968191 0.250214 0.250214 0.968191 104.769 36.152)"
          fill="black"
        />
        {/* Highlight kanan putih */}
        <ellipse
          cx="4.63438"
          cy="2.83157"
          rx="4.63438"
          ry="2.83157"
          transform="matrix(-0.90708 0.420958 0.420958 0.90708 110.008 53.152)"
          fill="white"
        />
      </g>
    </svg>
  )
}

export default EyeAnimation
