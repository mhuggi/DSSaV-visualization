import React, {useState, useEffect} from 'react'
import dataService from '../services/data'
import * as d3 from "d3"


var width = window.innerWidth * 0.8, height = window.innerHeight / 2, margin = 50;
var chartWidth = width - (margin * 2);
var chartHeight = height - (margin * 2);

const Boxplot = () => {
    const [dataSet, setDataSet] = useState([])
    d3.select("svg").remove("path");
    d3.select("svg").remove("rect");


    useEffect(() => {
      dataService.getAll().then(data =>
        setDataSet( data.Data.Data )
      )
    }, [])
    const time = dataSet.map(d => d.time)
    const close = dataSet.map(d => d.close)
    const date = time.map(t => new Date(t * 1000))
    const years = date.map(d => d.getFullYear())

    var canvas = d3.select("section")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var chartGroup = canvas.append('g').attr("transform","translate("+margin+","+margin+")");
    
    var dateScale = d3.scaleBand()
    .domain(years)
    .range([0, chartWidth]);
    
    var xScale = d3.scaleBand()
    .domain(time)
    .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
    .domain([d3.min(close) - 100 , d3.max(close) + 100])
    .range([chartHeight, 0]);

    var path = d3.line()
    .x(function(d) {return xScale(d.time)})
    .y(function(d) {return yScale(d.close)})
    
    var area = d3.area()
    .x(function(d) { return xScale(d.time); })
    .y0(chartHeight)
    .y1(function(d) { return yScale(d.close); });



    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(dateScale);

    console.log(dataSet)
    chartGroup.append("path")
    .attr("fill", "none")
    .attr("stroke", "DarkBlue")
    .attr("stroke-width", 1)
    .attr("d",path(dataSet))
    .attr("transform","translate("+chartWidth/time.length/2+",0)");
    
    chartGroup.append("g").call(yAxis);
    chartGroup.append("g").call(xAxis).attr("transform","translate(0,"+chartHeight+")");

    chartGroup.append("path")
       .data([dataSet])
       .attr("fill", "LightBlue")
       .attr("d", area)
       .attr("transform","translate("+chartWidth/time.length/2+",0)");

return -1
}

export default Boxplot