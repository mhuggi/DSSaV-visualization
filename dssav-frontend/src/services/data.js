import axios from 'axios'
const baseUrl = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=EUR&limit=1825&api_key=51c7d72b0d64ae36dc113a2f99628bcb475eb682a4fcbb3f92a4563044984504'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
const getHour = () => {
  const request = axios.get('https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=EUR&limit=1000')
  return request.then(response => response.data)
}
  
export default { getAll, getHour }