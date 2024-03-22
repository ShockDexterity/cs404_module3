import Express from 'express'
import gameRouter from './api/api.js'

const app = Express()

// log all requests
app.use((req, res, next) => {
  console.log(`${req.method} request from path ${req.path}`)
  next()
})

// use custom router for game data
app.use('/games', gameRouter)

// serve the 'public' folder
app.use(Express.static('public'))

// respond to attempted POST requests to any url
app.post(/\/(.*)/, (req, res) => {
  res.status(501).json({ error: true, message: 'POST not implemented' })
})

// listen on port 5000
app.listen(5000, () => {
  console.log('Listening on port 5000')
})
