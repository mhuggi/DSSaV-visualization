import React from 'react'
import {useState, useEffect} from 'react'
import dataService from '../services/data'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more';

HC_more(Highcharts);


const Boxplot = () => {
    const [dataSet, setDataSet] = useState([])


    useEffect(() => {
      dataService.getAll().then(data =>
        setDataSet( data )
      )
    }, [])

    console.log(dataSet)


  return (
    <div>
  </div>
  

  )    
      
}
export default Boxplot
