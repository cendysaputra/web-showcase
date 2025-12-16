import { useState, useEffect } from 'react'
import DotGrid from './components/DotGrid'
import Header from './components/Header'
import Footer from './components/Footer'
import cendySaputraLogo from './assets/images/Cendy Saputra.svg'

function App() {
  const [showPopup, setShowPopup] = useState(false)

  const handleOpenPopup = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            animation: 'slideInRight 0.5s cubic-bezier(0.77, 0, 0.175, 1)'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              border: '2px solid #1b1b1b'
            }}
          >
            <button
              onClick={handleClosePopup}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
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
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#333',
                margin: '0 0 20px 0',
                paddingRight: '20px'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button
              onClick={handleClosePopup}
              style={{
                width: '100%',
                padding: '12px 30px',
                backgroundColor: '#FFD700',
                border: '2px solid #1b1b1b',
                borderRadius: '50px',
                fontFamily: "'Mona Sans', sans-serif",
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1b1b1b'
                e.target.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FFD700'
                e.target.style.color = '#000'
              }}
            >
              Oke, Siap!
            </button>
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
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

      {/* Footer - floating di bawah */}
      <Footer />
    </>
  )
}

export default App
