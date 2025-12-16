import { useState, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import DotGrid from './components/DotGrid'
import Header from './components/Header'
import Footer from './components/Footer'
import cendySaputraLogo from './assets/images/Cendy Saputra.svg'
import scene7 from './assets/images/Scene 7.jpg'

function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupOrigin, setPopupOrigin] = useState({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)
  const [imageScale, setImageScale] = useState(0.3)
  const imageRef = useRef(null)

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
      // When image is at bottom of screen, scale = 0.3
      // When image is centered, scale = 1
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))

      // Scale from 0.3 to 1 based on scroll progress
      const scale = 0.3 + (scrollProgress * 0.7)
      setImageScale(scale)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleOpenPopup = (position) => {
    setPopupOrigin(position)
    setIsClosing(false)
    setShowPopup(true)
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
              pointerEvents: 'none'
            }}
          >
          <h1
            style={{
              fontFamily: "'Mona Sans', sans-serif",
              fontSize: '180px',
              color: '#000',
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              letterSpacing: '-1px',
              textAlign: 'center',
              overflow: 'visible',
              paddingBottom: '20px'
            }}
          >
            {'Ruang Artefak'.split('').map((char, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    animation: `slideUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.05}s forwards`,
                    transform: 'translateY(100%)'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </h1>
          <style>{`
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
            style={{
              display: 'block',
              marginTop: '-80px',
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
                padding: '16px 40px',
                border: '2px solid #1b1b1b',
                borderRadius: '50px',
                fontFamily: "'Mona Sans', sans-serif",
                fontSize: '18px',
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

        {/* Image Section - Scene 7 */}
        <div
          ref={imageRef}
          style={{
            position: 'relative',
            zIndex: 100,
            padding: '40px 20px',
            minHeight: '100vh',
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
              padding: '40px',
              borderRadius: '20px',
              border: '2px solid #1b1b1b',
              transform: `scale(${imageScale})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img
              src={scene7}
              alt="Scene 7"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '12px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer - floating di bawah */}
      <Footer onOpenPopup={handleOpenPopup} />
    </>
  )
}

export default App
