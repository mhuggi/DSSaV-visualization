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
    const invest = dataSet.map(d => d.Invest)
    const a_momentum = dataSet.map(d => d.a_momentum)
    const f_momentum = dataSet.map(d => d.f_momentum)




  return (
    <div>
      <Plot
        data={[
          {
            x: date,
            y: actual,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'blue'},
            name: 'Actual',
          },
          {
            type: 'scatter',
            mode: 'lines',
            x: date,
            y: forecast,
            marker: {color: 'green'},
            name: 'Forecast',
            text: invest

          },
          {
            type: 'bar',
            x: date,
            y: a_momentum,
            yaxis: 'y2'
          },
          {
            type: 'bar',
            x: date,
            y: f_momentum,
            yaxis: 'y2'

          }

        ]}
        layout={ {
          width: width, 
          height: height, 
          title: 'Plot', 
          plot_bgcolor: 'lightgray',
          yaxis: {
            title: 'Actual/Forecast'
          },
          yaxis2: {
            title: 'Momentum',
            overlaying: 'y',
            side: 'right',
            range: [-0.03, 0.2]
          }
        } }
        />
  </div>
  )     
}
export default Plotlychart
