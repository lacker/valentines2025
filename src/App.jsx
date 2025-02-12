import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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

LetterSquare.propTypes = {
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

function App() {
  const [shuffledLetters] = useState(() => shuffleWord(problem.word));
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [usedIndices, setUsedIndices] = useState(new Set());
  const [visibleHints, setVisibleHints] = useState([]);

  // Create shuffled hints array on component mount
  const [shuffledHints] = useState(() => 
    [...problem.hints].sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    // Don't set up timer if we've shown all hints
    if (visibleHints.length >= problem.hints.length) return;

    const timer = setInterval(() => {
      setVisibleHints(prev => {
        if (prev.length >= problem.hints.length) {
          clearInterval(timer);
          return prev;
        }
        // Use shuffledHints instead of problem.hints
        return [...prev, shuffledHints[prev.length]];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [visibleHints.length, shuffledHints]);

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

  // Create array of 4 slots, fill with hints or empty strings
  const hintSlots = Array(4).fill('').map((_, index) => 
    visibleHints[index] || ''
  );

  return (
    <>
      <h1>Cluegram</h1>
      <div className="hints-container">
        {hintSlots.map((hint, index) => (
          <div key={index} className={`hint-item ${hint ? 'visible' : 'invisible'}`}>
            {hint || 'placeholder'}
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
