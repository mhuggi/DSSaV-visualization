import { useState, useEffect } from 'react'
import dataService from '../services/data'
import * as d3 from "d3"

//margins
var width = window.innerWidth * 0.8,
    height = window.innerHeight,
    margin = 50,
    chartWidth = width - (margin * 2),
    chartHeight = height - (margin * 2);

const Chart = () => {

    const [dataSet, setDataSet] = useState([])
    useEffect(() => {
        dataService.getAll().then(data =>
            setDataSet(data.Data.Data)
        )
    }, [])
    const time = dataSet.map(d => d.time)
    const close = dataSet.map(d => d.close)
    const open = dataSet.map(d => d.open)
    const high = dataSet.map(d => d.high)
    const low = dataSet.map(d => d.low)
    const date = time.map(t => new Date(t * 1000))
    const years = date.map(d => d.getFullYear())

    const canvas = d3.select("section")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const chartGroup = canvas.append('g').attr("transform", "translate(" + margin + "," + margin + ")");

    const dateScale = d3.scaleBand()
        .domain(years)
        .range([0, chartWidth]);

    const xScale = d3.scaleBand()
        .domain(time)
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(close) - 100, d3.max(close) + 100])
        .range([chartHeight, 0]);

    const lineClose = d3.line()
        .x(function (d) { return xScale(d.time) })
        .y(function (d) { return yScale(d.close) })

    const lineOpen = d3.line()
        .x(function (d) { return xScale(d.time) })
        .y(function (d) { return yScale(d.open) })

    const lineLow = d3.line()
        .x(function (d) { return xScale(d.time) })
        .y(function (d) { return yScale(d.low) })

    const lineHigh = d3.line()
        .x(function (d) { return xScale(d.time) })
        .y(function (d) { return yScale(d.high) })

    const area = d3.area()
        .x(function (d) { return xScale(d.time); })
        .y0(chartHeight)
        .y1(function (d) { return yScale(d.close); });

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(dateScale);

    console.log(dataSet)
    chartGroup.append("path")
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 1)
        .attr("d", lineClose(dataSet))
        .attr("transform", "translate(" + chartWidth / time.length / 2 + ",0)");

    chartGroup.append("g").call(yAxis);
    chartGroup.append("g").call(xAxis).attr("transform", "translate(0," + chartHeight + ")");

    chartGroup.append("path")
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("d", lineOpen(dataSet))
        .attr("transform", "translate(" + chartWidth / time.length / 2 + ",0)");

    chartGroup.append("path")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 1)
        .attr("d", lineLow(dataSet))
        .attr("transform", "translate(" + chartWidth / time.length / 2 + ",0)");

    chartGroup.append("path")
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 1)
        .attr("d", lineHigh(dataSet))
        .attr("transform", "translate(" + chartWidth / time.length / 2 + ",0)");

    chartGroup.append("path")
        .data([dataSet])
        .attr("fill", "none")
        .attr("d", area)
        .attr("transform", "translate(" + chartWidth / time.length / 2 + ",0)");

    /* chartGroup
         .append("g")
         .selectAll("dot")
         .data(dataSet)
         .enter()
         .append("circle")
           .attr("cx", function(d) { return xScale(d.time) } )
           .attr("cy", function(d) { return yScale(d.close) } )
           .attr("r", 1)
           .attr("fill", "#69b3a2")*/


    return "Multiline"
}

export default Chart