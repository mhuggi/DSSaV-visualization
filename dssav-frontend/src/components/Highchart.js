import React from 'react'
import {useState, useEffect} from 'react'
import dataService from '../services/data'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more';

HC_more(Highcharts);


const Highchart = () => {
    const [dataSet, setDataSet] = useState([])


    useEffect(() => {
      dataService.getHour().then(data =>
        setDataSet( data.Data.Data )
      )
    }, [])
    const time = dataSet.map(d => d.time)
    const close = dataSet.map(d => d.close)
    const date = time.map(t => new Date(t * 1000))
    const years = date.map(d => d.getFullYear())
    const high = dataSet.map(d => d.high)
    const low = dataSet.map(d => d.low)
    const open = dataSet.map(d => d.open)
    const volume = dataSet.map(d => d.volumeto)
    const median = dataSet.map(d => (d.high + d.low) / 2)

    const boxPlot = dataSet.slice(1800).map(d => ({
        x: d.time * 1000,
        low: d.low, 
        q1: (d.low + d.high) * 0.25,
        median: (d.high + d.low) / 2,
        q3: (d.low + d.high) * 0.75,
        high: d.high
    }
    )
    )
    const boxPlotArr = dataSet.slice(1800).map(d => ([
        d.low, 
        d.open,
        (d.high + d.low) / 2,
        d.close,
        d.high
    ])
    )


    console.log(dataSet)


    const options = {
        title: {
          text: 'Bitcoin prizes'
        },
        xAxis: {
            categories: years,
            max: 10
        },
        series: [{
            type: 'boxplot',
            name: 'BTC/EUR',
            data: boxPlotArr
        }]
      }
  return (
    <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>
  

  )    
      
}
export default Highchart
