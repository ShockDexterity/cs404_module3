import React, { useContext, useEffect, useState } from 'react'

import DetailsButton from './DetailsButton.jsx'
import DeleteButton from './DeleteButton.jsx'
import EditButton from './EditButton.jsx'
import GameCard from './GameCard.jsx'

import { retrieveGameSummaries } from '../dataHelper.js'
import {
  DetailsDispatchContext,
  GameDetailsContext
} from '../state/GameDetailsContext.js'

export default function GameGrid (props) {
  const { refresh } = useContext(GameDetailsContext)
  const dispatch = useContext(DetailsDispatchContext)

  const [summarizedGames, setSummarizedGames] = useState([])

  useEffect(() => {
    async function fetchData () {
      try {
        const newData = await retrieveGameSummaries()
        setSummarizedGames(newData)
      }
      catch (error) {
        console.log(error)
      }
    }

    if (refresh) {
      fetchData()
      dispatch({ type: 'STOP_REFRESH' })
    }
  }, [refresh, dispatch])

  if (summarizedGames.length === 0) {
    return null
  }

  return (
    <div className="row gy-4 pt-4 pb-4">
      {summarizedGames.map((game) => (
        <GameCard key={game.id}>
          <DetailsButton game={game} />
          <div className="btn-group" role="group">
            <EditButton gameID={game.id} title={game.title} />
            <DeleteButton
              gameID={game.id}
              title={game.title}
              refreshGames={() => dispatch({ type: 'REFRESH' })}
            />
          </div>
        </GameCard>
      ))}
    </div>
  )
}

GameGrid.propTypes = {}
