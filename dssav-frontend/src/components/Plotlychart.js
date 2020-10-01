import React from 'react'
import {useState, useEffect} from 'react'
import dataService from '../services/data'
import Plot from 'react-plotly.js';


const Plotlychart = () => {
    const [dataSet, setDataSet] = useState([])
    const width = window.innerWidth * 0.8, 
    height = window.innerHeight / 2
    
    

    useEffect(() => {
      dataService.getAll().then(data =>
        setDataSet( data )
      )
    }, [])

    console.log(dataSet)
    const actual = dataSet.map(d => d.Actual)
    const date = dataSet.map(d => d.DateTime)
    const forecast = dataSet.map(d => d.Forecast)



  return (
    <div>
      <Plot
        data={[
          {
            x: date,
            y: actual,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            name: 'Actual'
          },
          {
            type: 'scatter',
            mode: 'lines+markers',
            x: date,
            y: forecast,
            name: 'Forecast'
          }
        ]}
        layout={ {width: width, height: height, title: 'A Fancy Plot'} }
        />
  </div>
  )     
}
export default Plotlychart
