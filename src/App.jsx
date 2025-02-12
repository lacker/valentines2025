import { useState, useEffect } from 'react'
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
  const [visibleHints, setVisibleHints] = useState([]);

  useEffect(() => {
    // Don't set up timer if we've shown all hints
    if (visibleHints.length >= problem.hints.length) return;

    const timer = setInterval(() => {
      setVisibleHints(prev => {
        if (prev.length >= problem.hints.length) {
          clearInterval(timer);
          return prev;
        }
        return [...prev, problem.hints[prev.length]];
      });
    }, 5000);

    // Show first hint immediately
    if (visibleHints.length === 0) {
      setVisibleHints([problem.hints[0]]);
    }

    return () => clearInterval(timer);
  }, [visibleHints.length]);

  const handleLetterClick = (letter, index) => {
    if (usedIndices.has(index)) return;
    
    setSelectedLetters(prev => [...prev, letter]);
    setUsedIndices(prev => new Set([...prev, index]));
  };

  const handleSolutionLetterClick = (indexToRemove) => {
    // Get the letter that was in this position
    const letterToRemove = selectedLetters[indexToRemove];
    
    // Find the original index in shuffledLetters
    const originalIndex = shuffledLetters.findIndex((letter, index) => 
      letter === letterToRemove && usedIndices.has(index)
    );

    // Remove from selected letters
    setSelectedLetters(prev => prev.filter((_, index) => index !== indexToRemove));
    
    // Remove from used indices
    setUsedIndices(prev => {
      const newSet = new Set(prev);
      newSet.delete(originalIndex);
      return newSet;
    });
  };

  return (
    <>
      <h1>Cluegram</h1>
      <div className="hints-container">
        {visibleHints.map((hint, index) => (
          <div key={index} className="hint-item">
            {hint}
          </div>
        ))}
      </div>
      <div className="solution-bar">
        {selectedLetters.map((letter, index) => (
          <div 
            key={index} 
            className="solution-letter"
            onClick={() => handleSolutionLetterClick(index)}
          >
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
