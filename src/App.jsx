import Squares from './components/Squares'

function App() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <Squares
        speed={0.1}
        squareSize={40}
        direction='down'
        borderColor='#FFECE8'
        hoverFillColor='#FFECE8'
      />
    </div>
  )
}

export default App
