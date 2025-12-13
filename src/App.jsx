import Squares from './components/Squares'
import Header from './components/Header'

function App() {
  return (
    <>
      {/* Background Grid */}
      <Squares
        speed={0.5}
        squareSize={40}
        direction='down'
        borderColor='#FFECE8'
        hoverFillColor='#FFECE8'
      />

      {/* Konten utama - atas background */}
      <div className="relative">
        <Header />
      </div>
    </>
  )
}

export default App
