import DotGrid from './components/DotGrid'
import Header from './components/Header'
import Footer from './components/Footer'
import cendySaputraLogo from './assets/images/Cendy Saputra.svg'

function App() {
  return (
    <>
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
        </div>
      </div>

      {/* Footer - floating di bawah */}
      <Footer />
    </>
  )
}

export default App
