import React, {useState, useEffect} from 'react'
import dataService from '../services/data'
import * as d3 from "d3"



const Boxplot = () => {
    const [dataSet, setDataSet] = useState([])
    
    useEffect(() => {
      dataService.getAll().then(data =>
        setDataSet( data.Data.Data )
      )
    }, [])
    const time = dataSet.map(d => d.time)
    const close = dataSet.map(d => d.close)
    console.log(time)
    console.log(close)


return -1
}

export default Boxplot