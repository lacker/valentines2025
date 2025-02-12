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

function LetterSquare({ letter, onClick, disabled }) {
  return (
    <div 
      className={`letter-square ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && onClick(letter)}
    >
      {letter}
    </div>
  );
}

function App() {
  const [shuffledLetters, setShuffledLetters] = useState(() => shuffleWord(problem.word));
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [usedIndices, setUsedIndices] = useState(new Set());

  const handleLetterClick = (letter, index) => {
    if (usedIndices.has(index)) return;
    
    setSelectedLetters(prev => [...prev, letter]);
    setUsedIndices(prev => new Set([...prev, index]));
  };

  return (
    <>
      <h1>Cluegram</h1>
      <div className="solution-bar">
        {selectedLetters.map((letter, index) => (
          <div key={index} className="solution-letter">
            {letter}
          </div>
        ))}
      </div>
      <div className="letters-container">
        {shuffledLetters.map((letter, index) => (
          <LetterSquare 
            key={index} 
            letter={letter} 
            onClick={() => handleLetterClick(letter, index)}
            disabled={usedIndices.has(index)}
          />
        ))}
      </div>
    </>
  )
}

export default App
