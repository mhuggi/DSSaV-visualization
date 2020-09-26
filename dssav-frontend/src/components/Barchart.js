import { useState, useEffect } from 'react'
import dataService from '../services/data'
import * as d3 from "d3"

//margins
const margin = { top: 100, right: 100, bottom: 100, left: 100 };
const width = window.innerWidth - margin.left - margin.right;
const height = window.innerHeight - margin.top - margin.bottom;

const Chart = () => {
    const [dataSet, setDataSet] = useState([])

    useEffect(() => {
        dataService.getAll().then(data =>
            setDataSet(data.Data.Data)
        )
    }, [])
    //parse data
    const time = dataSet.map(d => d.time)
    const close = dataSet.map(d => d.close)
    const date = time.map(t => new Date(t * 1000))
    const years = date.map(d => d.getFullYear())


    var svg = d3.select("section")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //X-axis
    //values shown in graph
    const x = d3.scaleBand()
        .range([0, width])
        .domain(time).padding(0.2);

    // values/text shown under the x-axis
    const xAxis = d3.scaleBand()
        .range([0, width])
        .domain(years).padding(0.2);

    svg.append('g')
    .attr('transform', 'translate(0,'+ height + ')')
    .call(d3.axisBottom(xAxis))


    //Y-axis
    const y = d3.scaleLinear()
    .domain([d3.min(close), d3.max(close)])
    .range([height, 0])

    svg.append('g')
    .call(d3.axisLeft(y));
   
    //bars
    svg.selectAll('mybar')
    .data(dataSet)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.time))
    .attr('y', (d) => y(d.close))
    .attr('width', x.bandwidth())
    .attr('height',(d,i) => height -y(d.close))
    .attr('fill', "#69b3a2")

    return "Barchart"
}

export default Chart