import React from 'react'
import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';
import { csv } from 'd3';
import * as d3 from 'd3';
import dataService from '../services/data'

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
    const datetime = dataSet.map(d => d.DateTime)
    const open = dataSet.map(d => d.Open)
    const low = dataSet.map(d => d.Low)
    const high = dataSet.map(d => d.High)
    const volume = dataSet.map(d => d.Volume)
    const maxDate = d3.max(datetime)
    const minDate = d3.min(datetime)
    const maxHigh = d3.max(high)
    const minLow = d3.min(low)
    console.log(datetime)

    return (
        <div>
            <Plot
                data={[
                    {
                        x: datetime,
                        close: close,
                        open: open,
                        low: low,
                        high: high,
                        y: close,
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
                    title: 'Candlestick',
                    margin: {
                        r: 10,
                        t: 25,
                        b: 40,
                        l: 60
                    },
                    showlegend: false,
                    xaxis: {
                        autorange: true,
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