import React from 'react';
import Plot from 'react-plotly.js';

const Heatmap = () => {
    const width = window.innerWidth * 0.9,
        height = window.innerHeight * 0.8

    var xValues = ["buy", "sell", "hold"];

    var yValues = ["buy", "sell", "hold"];
    // Mock data values for testing
    var zValues = [
        [55, 61, 3],
        [48, 58, 8],
        [198, 174, 13]
    ];

    var colorscales = [
        [0, '#FF0000'], //red
        [0.5, '#ffff00'], //yellow
        [1, '#008000'] //green
    ];

    var data = [{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: colorscales,
        showscale: true,
    }];

    var layout = {
        width: width,
        height: height,
        annotations: [],
        xaxis: {
            ticks: '',
            side: 'top',
            title: 'Actual values'
        },
        yaxis: {
            ticks: '',
            ticksuffix: ' ',
            width: width,
            height: height,
            autosize: false,
            title: 'Predicted values'
        }
    };

    for (var i = 0; i < yValues.length; i++) {
        for (var j = 0; j < xValues.length; j++) {

            var textColor = 'black';
            var result = {
                xref: 'x1',
                yref: 'y1',
                x: xValues[j],
                y: yValues[i],
                text: zValues[i][j],
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(50, 171, 96)'
                },
                showarrow: false,
                font: {
                    color: textColor
                }
            };
            layout.annotations.push(result);
        }
    }
    return (
        <div>
            <Plot
                data={data}
                layout={layout}
            />
        </div>
    )

}
export default Heatmap
