const express = require('express')
const app = express()


let data = [
  {
    id: 1,
    price: 50,
  },
  {
    id: 2,
    price: 70,
  },
  {
    id: 3,
    price: 65,
  },

  {
    id: 4,
    price: 55,
  }
]
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/data', (req, res) => {
    res.json(data)
  })
  app.get('/api/data/:id', (request, response) => {
    const id = request.params.id
    const note = data.find(note => note.id === id)
    response.json(note)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  