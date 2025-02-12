import { useState } from 'react'
import './App.css'

// Move problem to be used within the App component
const problem = {
  "word": "freedom",
  "hints": ["human right", "usa", "not oppression", "revolutionary"]
}

function shuffleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5);
}

function LetterSquare({ letter }) {
  return (
    <div className="letter-square">
      {letter}
    </div>
  );
}

function App() {
  const [shuffledLetters, setShuffledLetters] = useState(() => shuffleWord(problem.word));

  return (
    <>
      <h1>Cluegram</h1>
      <div className="letters-container">
        {shuffledLetters.map((letter, index) => (
          <LetterSquare key={index} letter={letter} />
        ))}
      </div>
    </>
  )
}

export default App
