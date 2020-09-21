import React, { useState} from 'react';
import useInterval from 'react-useinterval';


function App() {
  const generateDataset = () => (
    Array(100).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  )
  
  
  const Circles = () => {
    const [dataset, setDataset] = useState(
      generateDataset()
    )
    useInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 2000)
    return (
      <svg viewBox="0 0 100 50">
        {dataset.map(([x, y], i) => (
          <circle
            cx={x}
            cy={y}
            r="1"
          />
        ))}
      </svg>
    )
  }
      
  return (
    <div className="App">
      <Circles />
    </div>
  );
}

export default App;
