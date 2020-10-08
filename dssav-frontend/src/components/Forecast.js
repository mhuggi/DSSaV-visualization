import React from 'react'
import { useState, useEffect } from 'react'
import dataService from '../services/data'
import Plot from 'react-plotly.js';

const Plotlyforecastchart = () => {
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
    const forecast = dataSet.map(d => d.Forecast)
    const date = dataSet.map(d => d.DateTime)
    const actual = dataSet.map(d => d.Actual)
    const fMomentum = dataSet.map(d => d.f_momentum)
    const aMomentum = dataSet.map(d => d.a_momentum)


    return (
        <div>
            <Plot
                data={[
                    {
                        x: date,
                        y: forecast,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'light-blue' },
                        name: 'Forecast',
                    },
                    {
                        x: date,
                        y: actual,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'green' },
                        name: 'Acutal',
                    },
                    {
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'gray' },
                        x: date,
                        y: aMomentum,
                        fill: 'none',
                        name: 'Actual-momentum'
                    },
                    {
                        x: date,
                        y: fMomentum,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'gray' },
                        fill: 'tonexty',
                        name: 'Forecast momentum'
                    },

                ]}
                layout={{
                    width: width,
                    height: height,
                    title: 'A Multiline Plot',
                    xaxis: {
                        rangeslider: {}
                    },
                    yaxis: {
                        fixedrange: true
                    }
                }}
            />
        </div>
    )
}
export default Plotlyforecastchart