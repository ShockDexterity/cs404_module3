import Express, { Router } from 'express'
import fs from 'fs'
import validateGame from './apiutils.js'

const rawGames = fs.readFileSync('./server/api/gamesList.json', {
  encoding: 'utf-8'
})
let games = JSON.parse(rawGames)

let summarizedGames = games.map((game) => ({
  id: game.id,
  title: game.title,
  year: game.year,
  thumbnail: game.thumbnail
}))

// this router is intended to be used on path '/games'
const gameRouter = new Router({
  caseSensitive: false,
  strict: true
})

// make sure the router uses application/json
gameRouter.use(
  Express.json({
    type: 'application/json'
  })
)

// get all GET requests from /games
gameRouter.get('/', (req, res) => {
  if (!summarizedGames) {
    res
      .status(500)
      .json({ error: true, message: 'Unable to get list of games' })
  }
  else {
    res.status(200).json(summarizedGames)
  }
})

// get all GET requests from /games/:id
gameRouter.get('/:id', (req, res) => {
  const gameID = parseInt(req.params.id)

  if (!gameID || isNaN(gameID)) {
    res.status(400).json({ error: true, message: 'invalid id' })
    return
  }

  const specificGame = games.find((game) => game.id === gameID)
  if (!specificGame) {
    res.status(404).json({ error: true, message: 'game not found' })
    return
  }

  res.status(200).json(specificGame)
})

// get all PUT requests from /games
gameRouter.put('/', (req, res) => {
  validateGame(req.body, (err, gameToSubmit) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
    }
    else {
      if (games.find((game) => game.id === gameToSubmit.id)) {
        res.status(400).json({ error: true, message: 'Game already exists' })
      }
      else {
        games.push(gameToSubmit)

        summarizedGames.push({
          id: gameToSubmit.id,
          title: gameToSubmit.title,
          year: gameToSubmit.year,
          thumbnail: gameToSubmit.thumbnail
        })

        res.status(200).json({
          success: true,
          id: gameToSubmit.id,
          message: `"${gameToSubmit.title}" successfully added`
        })
      }
    }
  })
})

// get all PUT requests from /games/edit
gameRouter.put('/edit', (req, res) => {
  validateGame(req.body, (err, gameToSubmit) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
    }
    else {
      if (games.find((game) => game.id === gameToSubmit.id)) {
        games = games.map((game) => {
          if (game.id === gameToSubmit.id) {
            return gameToSubmit
          }
          else {
            return game
          }
        })

        summarizedGames = summarizedGames.map((game) => {
          if (game.id === gameToSubmit.id) {
            return {
              id: gameToSubmit.id,
              title: gameToSubmit.title,
              year: gameToSubmit.year,
              thumbnail: gameToSubmit.thumbnail
            }
          }
          else {
            return game
          }
        })

        res.status(200).json({
          success: true,
          id: gameToSubmit.id,
          message: `"${gameToSubmit.title}" successfully updated`
        })
      }
      else {
        res.status(400).json({ error: true, message: 'Game does not exist' })
      }
    }
  })
})

// get all DELETE requests from /games/id
gameRouter.delete('/:id', (req, res) => {
  const gameID = parseInt(req.params.id)
  if (!gameID || isNaN(gameID)) {
    res.status(400).json({ error: true, message: 'invalid id' })
    return
  }

  const gameToDelete = games.find((game) => game.id === gameID)

  if (!gameToDelete) {
    res.status(404).json({ error: true, message: 'game not found' })
  }
  else {
    games = games.filter((game) => game.id !== gameID)
    summarizedGames = summarizedGames.filter((game) => game.id !== gameID)
    res.status(200).json({
      success: true,
      id: gameID,
      message: `"${gameToDelete.title}" deleted`
    })
  }
})

export default gameRouter
