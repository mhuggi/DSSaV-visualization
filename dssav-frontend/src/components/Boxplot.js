import React, {useState, useEffect} from 'react'
import dataService from '../services/data'


const Boxplot = () => {
    const [dataSet, setDataSet] = useState([])
    useEffect(() => {
      dataService.getAll().then(data =>
        setDataSet( data )
      )
    }, [])
  
    console.log(dataSet)
  

    return -1

}

export default Boxplot