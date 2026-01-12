import { useState, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import DotGrid from './components/DotGrid'
import Header from './components/Header'
import Footer from './components/Footer'
import VariableProximity from './components/VariableProximity'
import RunningText from './components/RunningText'
import EyeAnimation from './components/EyeAnimation'
import cendySaputraLogo from './assets/images/Cendy Saputra.svg'

function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupOrigin, setPopupOrigin] = useState({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)
  const [imageScale, setImageScale] = useState(0.7)
  const imageRef = useRef(null)
  const textContainerRef = useRef(null)
  const textSectionRef = useRef(null)
  const [textOpacity, setTextOpacity] = useState(0)
  const hasAutoShownRef = useRef(false)

  // Auto-show popup for first-time visitors
  useEffect(() => {
    // Check if popup was already shown
    const popupShownData = localStorage.getItem('ruangArtefakPopupShown')

    if (popupShownData) {
      const { timestamp } = JSON.parse(popupShownData)
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
      const now = Date.now()

      // Check if 2 days have passed
      if (now - timestamp < twoDaysInMs) {
        // Session still valid, don't auto-show popup
        hasAutoShownRef.current = true
        return
      }
    }

    // Auto-show popup after 3 seconds for first-time or expired session
    if (!hasAutoShownRef.current) {
      const timer = setTimeout(() => {
        // Get approximate position at bottom right (where footer text is)
        const position = {
          x: window.innerWidth - 100,
          y: window.innerHeight - 40
        }
        setPopupOrigin(position)
        setIsClosing(false)
        setShowPopup(true)
        hasAutoShownRef.current = true

        // Save timestamp to localStorage
        localStorage.setItem('ruangArtefakPopupShown', JSON.stringify({
          timestamp: Date.now()
        }))
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Disable browser zoom
  useEffect(() => {
    // Disable zoom via viewport meta
    const setViewport = () => {
      const viewport = document.querySelector('meta[name=viewport]')
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover')
      }
    }
    setViewport()

    // Prevent zoom with keyboard shortcuts
    const preventZoom = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0' || e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 48)
      ) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    // Prevent zoom with mouse wheel + ctrl/cmd
    const preventWheelZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    // Prevent pinch zoom on touchpad/touchscreen
    const preventTouchZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    // Prevent double-tap zoom on mobile
    let lastTouchEnd = 0
    const preventDoubleTapZoom = (e) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      lastTouchEnd = now
    }

    // Prevent gesture zoom on trackpad
    const preventGestureZoom = (e) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // Add all event listeners
    document.addEventListener('keydown', preventZoom, { passive: false, capture: true })
    document.addEventListener('wheel', preventWheelZoom, { passive: false, capture: true })
    document.addEventListener('touchstart', preventTouchZoom, { passive: false, capture: true })
    document.addEventListener('touchmove', preventTouchZoom, { passive: false, capture: true })
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false, capture: true })
    document.addEventListener('gesturestart', preventGestureZoom, { passive: false, capture: true })
    document.addEventListener('gesturechange', preventGestureZoom, { passive: false, capture: true })
    document.addEventListener('gestureend', preventGestureZoom, { passive: false, capture: true })

    return () => {
      document.removeEventListener('keydown', preventZoom, { capture: true })
      document.removeEventListener('wheel', preventWheelZoom, { capture: true })
      document.removeEventListener('touchstart', preventTouchZoom, { capture: true })
      document.removeEventListener('touchmove', preventTouchZoom, { capture: true })
      document.removeEventListener('touchend', preventDoubleTapZoom, { capture: true })
      document.removeEventListener('gesturestart', preventGestureZoom, { capture: true })
      document.removeEventListener('gesturechange', preventGestureZoom, { capture: true })
      document.removeEventListener('gestureend', preventGestureZoom, { capture: true })
    }
  }, [])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.4,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Image scale animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return

      const imageSection = imageRef.current
      const rect = imageSection.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate scroll progress
      // When image is at bottom of screen, scale = 0.7
      // When image is centered, scale = 1
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))

      // Scale from 0.7 to 1 based on scroll progress
      const scale = 0.7 + (scrollProgress * 0.3)
      setImageScale(scale)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Text fade in animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!textSectionRef.current) return

      const textSection = textSectionRef.current
      const rect = textSection.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Start animation when section is 20% into viewport
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top - windowHeight * 0.2) / (windowHeight * 0.6)))

      setTextOpacity(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleTogglePopup = (position) => {
    if (showPopup) {
      // Close popup
      setIsClosing(true)
      setTimeout(() => {
        setShowPopup(false)
        setIsClosing(false)
      }, 400)
    } else {
      // Open popup
      setPopupOrigin(position)
      setIsClosing(false)
      setShowPopup(true)

      // Update session when manually opened
      if (!hasAutoShownRef.current) {
        localStorage.setItem('ruangArtefakPopupShown', JSON.stringify({
          timestamp: Date.now()
        }))
        hasAutoShownRef.current = true
      }
    }
  }

  const handleClosePopup = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowPopup(false)
      setIsClosing(false)
    }, 400)
  }

  return (
    <>
      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            bottom: '60px',
            right: '20px',
            zIndex: 9999
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '20px',
              maxWidth: '400px',
              width: '100%',
              position: 'relative',
              border: '2px solid #1b1b1b',
              transformOrigin: `calc(100% - ${window.innerWidth - popupOrigin.x}px) calc(100% + 20px + ${window.innerHeight - popupOrigin.y}px)`,
              animation: isClosing
                ? 'macCloseAnimation 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards'
                : 'macOpenAnimation 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
            }}
          >
            <button
              onClick={handleClosePopup}
              style={{
                position: 'absolute',
                top: '4px',
                right: '8px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                lineHeight: 1,
                padding: '5px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#000')}
              onMouseLeave={(e) => (e.target.style.color = '#666')}
            >
              ×
            </button>
            <p
              style={{
                fontFamily: "'Mona Sans', sans-serif",
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#333',
                margin: '0',
                paddingRight: '14px'
              }}
            >
               Every completed project is a story worth recording. The Artifact Room was born from my desire to celebrate that process. Here, you'll see the final results, as well as how I think and experiment through visual art.
            </p>
          </div>
        </div>
      )}

      {/* Background DotGrid */}
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#EEE"
          activeColor="#EEE"
          proximity={80}
          shockRadius={180}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Konten utama - atas background */}
      <div className="relative">
        <Header />

        {/* Hero Banner */}
        <div
          className="hero-banner"
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <div
            style={{
              pointerEvents: 'none',
              position: 'relative'
            }}
          >
          {/* Eye Animation SVG */}
          <EyeAnimation
            className="eye-animation"
            style={{
              position: 'absolute',
              height: 'auto',
              zIndex: 10,
              opacity: 0
            }}
          />
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Mona Sans', sans-serif",
              color: '#000',
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-1px',
              textAlign: 'center',
              overflow: 'visible',
              paddingBottom: '20px'
            }}
          >
            <span className="hero-word" style={{ fontFamily: "'Mona Sans', sans-serif" }}>
              {'Ruang'.split('').map((char, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    verticalAlign: 'bottom',
                    fontFamily: "'Mona Sans', sans-serif"
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      animation: `slideUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.05}s forwards`,
                      transform: 'translateY(100%)',
                      fontFamily: "'Mona Sans', sans-serif"
                    }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
            {' '}
            <span className="hero-word" style={{ fontFamily: "'Mona Sans', sans-serif" }}>
              {'Artefak'.split('').map((char, index) => (
                <span
                  key={index + 5}
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    verticalAlign: 'bottom',
                    fontFamily: "'Mona Sans', sans-serif"
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      animation: `slideUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${(index + 6) * 0.05}s forwards`,
                      transform: 'translateY(100%)',
                      fontFamily: "'Mona Sans', sans-serif"
                    }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <style>{`
            /* Responsive Hero Banner */
            .hero-banner {
              padding: 0;
            }
            @media (max-width: 767px) {
              .hero-banner {
                height: auto !important;
                min-height: 100vh;
                padding: 120px 16px !important;
              }
            }
            @media (max-width: 480px) {
              .hero-banner {
                height: auto !important;
                min-height: 100vh;
                padding: 120px 16px !important;
              }
            }

            /* Responsive Eye Animation */
            .eye-animation {
              width: 90px;
              left: calc(50% - 340px);
              top: 60px;
              animation: fadeIn 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards;
            }
            @media (max-width: 1199px) {
              .eye-animation {
                width: 60px;
                left: calc(50% - 220px);
                top: 40px;
              }
            }
            @media (max-width: 767px) {
              .eye-animation {
                width: 50px;
                left: 20px;
                top: 30px;
              }
            }
            @media (max-width: 480px) {
              .eye-animation {
                width: 45px;
                left: 15px;
                top: 25px;
              }
            }

            /* Responsive Hero Title */
            .hero-title {
              font-size: 180px;
              white-space: nowrap;
              font-family: 'Mona Sans', sans-serif !important;
            }
            .hero-title * {
              font-family: 'Mona Sans', sans-serif !important;
            }
            .hero-word {
              display: inline-block;
              font-family: 'Mona Sans', sans-serif !important;
            }
            @media (max-width: 1199px) {
              .hero-title {
                font-size: 100px;
                white-space: normal;
              }
              .hero-word {
                display: block;
              }
            }
            @media (max-width: 767px) {
              .hero-title {
                font-size: 85px;
                white-space: normal;
              }
              .hero-word {
                display: block;
              }
            }
            @media (max-width: 480px) {
              .hero-title {
                font-size: 85px;
                white-space: normal;
              }
              .hero-word {
                display: block;
              }
            }

            /* Responsive Cendy Saputra Logo */
            .cendy-logo {
              width: auto;
              height: auto;
              margin-top: -80px;
            }
            @media (max-width: 1199px) {
              .cendy-logo {
                margin-top: -60px;
                max-width: 200px;
              }
            }
            @media (max-width: 767px) {
              .cendy-logo {
                margin: -50px auto 0 !important;
                right: 0 !important;
                max-width: 200px;
              }
            }
            @media (max-width: 480px) {
              .cendy-logo {
                margin: -50px auto 0 !important;
                right: 0 !important;
                max-width: 200px;
              }
            }

            /* Responsive Button */
            .pill-button {
              padding: 16px 40px;
              font-size: 18px;
            }
            @media (max-width: 767px) {
              .pill-button {
                padding: 12px 30px;
                font-size: 16px;
              }
            }
            @media (max-width: 480px) {
              .pill-button {
                padding: 10px 24px;
                font-size: 14px;
              }
            }

            @keyframes slideUp {
              to {
                transform: translateY(0);
              }
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            @keyframes slideInRight {
              from {
                transform: translateX(100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
            @keyframes macOpenAnimation {
              0% {
                opacity: 0;
                transform: scale(0.01);
              }
              1% {
                opacity: 1;
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes macCloseAnimation {
              0% {
                opacity: 1;
                transform: scale(1);
              }
              99% {
                opacity: 1;
              }
              100% {
                opacity: 0;
                transform: scale(0.01);
              }
            }
            .flip-button {
              position: relative;
              transform-style: preserve-3d;
              transition: transform 0.6s;
            }
            .flip-button:hover {
              transform: rotateX(360deg);
            }
            .flip-button:hover .button-front {
              background-color: #1b1b1b;
              color: #fff;
            }
          `}</style>
          <img
            src={cendySaputraLogo}
            alt="Cendy Saputra"
            className="cendy-logo"
            style={{
              display: 'block',
              marginLeft: 'auto',
              position: 'relative',
              right: '-40px',
              opacity: 0,
              animation: 'fadeInUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.7s forwards'
            }}
          />

          {/* View Project Button */}
          <div
            style={{
              margin: '40px auto 0',
              width: 'fit-content',
              opacity: 0,
              animation: 'fadeInUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) 1.2s forwards'
            }}
          >
            <button
              className="pill-button"
              style={{
                position: 'relative',
                border: '2px solid #1b1b1b',
                borderRadius: '50px',
                fontFamily: "'Mona Sans', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
                pointerEvents: 'auto',
                overflow: 'hidden'
              }}
            >
              <span className="hover-circle" />
              <span className="label-stack">
                <span className="pill-label">View Project Now</span>
                <span className="pill-label-hover">View Project Now</span>
              </span>
            </button>
          </div>
          <style>{`
            .pill-button {
              --pill-height: 56px;
              background-color: #FFD700 !important;
              transition: background-color 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .hover-circle {
              position: absolute;
              left: 50%;
              bottom: 0;
              background-color: #1b1b1b;
              border-radius: 50%;
              pointer-events: none;
              transform: translateX(-50%) scale(0);
              transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .label-stack {
              position: relative;
              display: inline-block;
            }

            .pill-label {
              display: block;
              color: #000;
              transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .pill-label-hover {
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              color: #fff;
              opacity: 0;
              transform: translateY(60px);
              transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .pill-button:hover {
              background-color: #1b1b1b !important;
            }

            .pill-button:hover .hover-circle {
              transform: translateX(-50%) scale(1.2);
            }

            .pill-button:hover .pill-label {
              transform: translateY(-60px);
            }

            .pill-button:hover .pill-label-hover {
              transform: translateY(0);
              opacity: 1;
            }

            .pill-button:active {
              transform: scale(0.955);
            }
          `}</style>
          </div>
        </div>

        {/* Video Section - YouTube */}
        <div
          ref={imageRef}
          className="image-section"
          style={{
            position: 'relative',
            zIndex: 100,
            padding: '0 20px 80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              width: '100%',
              margin: '0 auto',
              backgroundColor: '#fff',
              padding: '16px',
              borderRadius: '20px',
              border: '1px solid #1b1b1b',
              transform: `scale(${imageScale})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '12px'
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/4obkMThkU_I?autoplay=1&mute=1&loop=1&playlist=4obkMThkU_I&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1"
                style={{
                  position: 'absolute',
                  top: '-60px',
                  left: 0,
                  width: '100%',
                  height: 'calc(100% + 120px)',
                  border: 'none',
                  borderRadius: '12px',
                  pointerEvents: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Text Section with Variable Proximity */}
        <div
          ref={textSectionRef}
          className="text-section-container"
          style={{
            position: 'relative',
            zIndex: 100,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px'
          }}
        >
          <div
            ref={textContainerRef}
            style={{
              maxWidth: '1100px',
              width: '100%',
              margin: '0 auto',
              position: 'relative',
              opacity: textOpacity,
              transform: `translateY(${(1 - textOpacity) * 50}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
            }}
          >
            <p
              className="text-section-paragraph"
              style={{
                fontFamily: "'Mona Sans Variable', 'Mona Sans', sans-serif",
                fontSize: '40px',
                lineHeight: '1.4',
                color: '#1b1b1b',
                textAlign: 'center',
                margin: 0,
                cursor: 'default',
                userSelect: 'none'
              }}
            >
              <>
                <VariableProximity
                  label="None of the projects you see here started with a tool. Instead, they all began with a single question:"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={textContainerRef}
                  radius={100}
                  falloff="linear"
                />
                <br />
                <span
                  style={{
                    display: 'inline-block',
                    position: 'relative'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    <VariableProximity
                      label="'What story do we want to tell?'"
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={textContainerRef}
                      radius={100}
                      falloff="linear"
                    />
                  </span>
                  <svg
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: 0,
                      width: '100%',
                      height: '8px',
                      transformOrigin: 'left',
                      transform: `scaleX(${textOpacity})`,
                      transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                      overflow: 'visible',
                      zIndex: 0
                    }}
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0,4 Q 5,2 10,3.5 T 20,4 Q 25,5 30,3.8 T 40,4.2 Q 45,3 50,4.5 T 60,3.8 Q 65,5 70,4 T 80,4.3 Q 85,3 90,4.2 T 100,4"
                      fill="none"
                      stroke="#F04F23"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </>
            </p>
          </div>
        </div>
        <style>{`
          /* Responsive Text Section */
          .text-section-container {
            min-height: 100vh;
          }
          .text-section-paragraph {
            font-size: 40px;
          }
          @media (max-width: 1199px) {
            .text-section-paragraph {
              font-size: 36px !important;
            }
          }
          @media (max-width: 767px) {
            .text-section-paragraph {
              font-size: 28px !important;
            }
            .text-section-container {
              min-height: 80vh;
            }
          }
          @media (max-width: 480px) {
            .text-section-paragraph {
              font-size: 24px !important;
            }
            .text-section-container {
              min-height: 70vh;
            }
          }
        `}</style>

        {/* Running Text Section */}
        <RunningText
          text="UI/UX • Graphic Design • 3D Modeling • Wordpress Developer • Frontend Web Developer"
          speed={50}
        />
      </div>

      {/* Footer - floating di bawah */}
      <Footer onOpenPopup={handleTogglePopup} />
    </>
  )
}

export default App
