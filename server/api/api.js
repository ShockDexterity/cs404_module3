import Express, { Router } from 'express'

import validateGame from './apiutils.js'

import * as DB from '../controller/mongodb.js'

// Connect to the database
const dbHandle = DB.connect('Module3-3')
const dbCollection = dbHandle.collection('games')

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
gameRouter.get('/', async (req, res) => {
  const gameSummaries = await DB.getAllGameSummaries(dbCollection)
  if (!gameSummaries) {
    res
      .status(500)
      .json({ error: true, message: 'Unable to get list of games' })
  }
  else {
    res.status(200).json(gameSummaries)
  }
})

// get all GET requests from /games/:id
gameRouter.get('/:id', async (req, res) => {
  const gameID = parseInt(req.params.id)

  if (!gameID || isNaN(gameID)) {
    res.status(400).json({ error: true, message: 'invalid id' })
    return
  }

  // const specificGame = games.find((game) => game.id === gameID)
  const specificGame = await DB.getSpecificGame(dbCollection, gameID)

  if (!specificGame) {
    res.status(404).json({ error: true, message: 'game not found' })
    return
  }

  res.status(200).json(specificGame)
})

// get all PUT requests from /games
gameRouter.put('/', (req, res) => {
  validateGame(req.body, async (err, gameToSubmit) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
    }
    else {
      const shouldNotExist = await DB.getSpecificGame(
        dbCollection,
        gameToSubmit.id
      )

      if (shouldNotExist) {
        res.status(400).json({ error: true, message: 'Game already exists' })
      }
      else {
        try {
          await DB.insertGame(dbCollection, gameToSubmit)

          res.status(200).json({
            success: true,
            id: gameToSubmit.id,
            message: `"${gameToSubmit.title}" successfully added`
          })
        }
        catch (err) {
          res.status(500).json({ error: true, message: 'Unable to add game' })
        }
      }
    }
  })
})

// get all PUT requests from /games/edit
gameRouter.put('/edit', (req, res) => {
  validateGame(req.body, async (err, gameToSubmit) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
    }
    else {
      Object.keys(gameToSubmit).forEach((key) => {
        if (gameToSubmit[key] === null || gameToSubmit[key] === undefined) {
          delete gameToSubmit[key]
        }
      })

      // const index = games.findIndex((game) => game.id === gameToSubmit.id)
      const oldGame = await DB.getSpecificGame(dbCollection, gameToSubmit.id)
      if (oldGame) {
        const updatedGame = { ...oldGame, ...gameToSubmit }

        const result = await DB.updateGame(
          dbCollection,
          oldGame.id,
          updatedGame
        )

        if (result.modifiedCount === 0) {
          res
            .status(500)
            .json({ error: true, message: 'Unable to update game' })
          return
        }

        res.status(200).json({
          success: true,
          id: updatedGame.id,
          message: `"${updatedGame.title}" successfully updated`
        })
      }
      else {
        res.status(404).json({ error: true, message: 'Game does not exist' })
      }
    }
  })
})

// get all DELETE requests from /games/id
gameRouter.delete('/:id', async (req, res) => {
  const gameID = parseInt(req.params.id)
  if (!gameID || isNaN(gameID)) {
    res.status(400).json({ error: true, message: 'invalid id' })
    return
  }

  const deletedGame = await DB.deleteGame(dbCollection, gameID)

  if (!deletedGame) {
    res.status(500).json({ error: true, message: 'Unable to delete game' })
    return
  }

  res.status(200).json({
    success: true,
    id: gameID,
    message: `"${deletedGame.title}" deleted`
  })
})

export default gameRouter
