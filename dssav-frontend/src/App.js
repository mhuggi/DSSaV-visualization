import React, {useState, useEffect} from 'react';
import Boxplot from './components/Boxplot'
import dataService from './services/data'

function App() {
  const [dataSet, setDataSet] = useState([])
  useEffect(() => {
    dataService.getAll().then(data =>
      setDataSet( data )
    )
  }, [])

  console.log(dataSet)



  return (
    <div className="App">
      <Boxplot />
    </div>
  );
}

export default App;
