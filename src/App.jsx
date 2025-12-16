import DotGrid from './components/DotGrid'
import Header from './components/Header'
import Footer from './components/Footer'

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
      </div>

      {/* Footer - floating di bawah */}
      <Footer />
    </>
  )
}

export default App
