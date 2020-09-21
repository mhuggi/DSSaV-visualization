import React from 'react';

function App() {
  const Svg = () => {
    return (
      <svg style={{
        border: "2px solid gold"
      }} />
    )
  }
  const Circle = () => {
    return (
      <svg>
        <circle
          cx="150"
          cy="77"
          r="40"
        />
      </svg>
    )
  }
    
  return (
    <div className="App">
      <Svg />
      <Circle />
    </div>
  );
}

export default App;
