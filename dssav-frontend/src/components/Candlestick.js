import React from 'react'
import { useState, useEffect } from 'react'
import dataService from '../services/data'
import Plot from 'react-plotly.js';
import * as d3 from 'd3'

const Candlestickchart = () => {
    const [dataSet, setDataSet] = useState([])
    const width = window.innerWidth * 0.9,
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
    const maxDate = d3.max(date)
    const minDate = d3.min(date)
    const maxHigh = d3.max(high)
    const minLow = d3.min(low)


    return (
        <div>
            <Plot
                data={[
                    {
                        x: date,
                        close: close,
                        open: open,
                        low: low,
                        high: high,
                        y: volume,
                        decreasing: { line: { color: 'red' } },
                        increasing: { line: { color: 'green' } },
                        line: { color: 'rgba(31,119,180,1)' },
                        yaxis: 'y',
                        xaxis: 'x',
                        type: 'candlestick',

                    }
                ]}
                layout={{
                    width: width,
                    height: height,
                    dragmode: 'zoom',
                    margin: {
                        r: 10,
                        t: 25,
                        b: 40,
                        l: 60
                    },
                    showlegend: false,
                    xaxis: {
                        autorange: true,
                        domain: [0, 1],
                        range: [minDate, maxDate],
                        rangeslider: { range: [minDate, maxDate] },
                        type: 'date'
                    },
                    yaxis: {
                        autorange: true,
                        domain: [0, 1],
                        range: [minLow, maxHigh],
                        type: 'linear'
                    }
                }}
            />
        </div>
    )
}
export default Candlestickchart
