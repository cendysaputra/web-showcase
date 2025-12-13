import DotGrid from './components/DotGrid'
import Header from './components/Header'

function App() {
  return (
    <>
      {/* Background DotGrid */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#EEE"
          activeColor="#FFE5DE"
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
    </>
  )
}

export default App
