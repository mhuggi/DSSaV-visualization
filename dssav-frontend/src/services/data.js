import axios from 'axios'
const baseUrl = 'https://pi4rodbg9g.execute-api.eu-north-1.amazonaws.com/test/getdata'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
const getHour = () => {
  const request = axios.get('https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=EUR&limit=1000')
  return request.then(response => response.data)
}
  
export default { getAll, getHour }