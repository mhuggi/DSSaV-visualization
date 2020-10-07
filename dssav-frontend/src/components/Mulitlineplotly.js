import React from 'react'
import { useState, useEffect } from 'react'
import dataService from '../services/data'
import Plot from 'react-plotly.js';

const Plotlymultilinechart = () => {
    const [dataSet, setDataSet] = useState([])
    const width = window.innerWidth,
        height = window.innerHeight * 0.8

    useEffect(() => {
        dataService.getAll().then(data =>
            setDataSet(data)
        )
    }, [])

    console.log(dataSet)

    //designed with CSV data
    const close = dataSet.map(d => d.Close)
    const date = dataSet.map(d => d.DateTime)
    const open = dataSet.map(d => d.Open)
    const low = dataSet.map(d => d.Low)
    const high = dataSet.map(d => d.High)
    const volume = dataSet.map(d => d.Volume)


    return (
        <div>
            <Plot
                data={[
                    {
                        x: date,
                        y: volume,
                        yaxis: 'y2',
                        type: 'bar',
                        marker: { color: 'lightgray', line: 'transparent' },
                        name: 'Volume'
                    },
                    {
                        x: date,
                        y: close,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'green' },
                        name: 'Close'
                    },
                    {
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                        x: date,
                        y: open,
                        name: 'Open'
                    },
                    {
                        x: date,
                        y: low,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'blue' },
                        name: 'Low'
                    },
                    {
                        x: date,
                        y: high,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'yellow' },
                        name: 'High'
                    },

                ]}
                layout={{
                    width: width,
                    height: height,
                    title: 'Multiline Plot',
                    xaxis: {
                        rangeslider: {}
                    },
                    yaxis: { title: 'EURUS value', overlaying: 'y2', fixedrange: true },
                    yaxis2: {
                        title: 'Volume', titlefont: { color: 'rgb(148, 103, 189)' },
                        tickfont: { color: 'rgb(148, 103, 189)' },
                        side: 'right',
                        fixedrange: true
                    }
                }}
            />
        </div>
    )
}
export default Plotlymultilinechart
