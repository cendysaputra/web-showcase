import LetterGlitch from './components/LetterGlitch'

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <LetterGlitch
        glitchColors={['#ff8c00', '#ffa500', '#ff7f00', '#ffb347', '#ff9f40']}
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />
    </div>
  )
}

export default App
