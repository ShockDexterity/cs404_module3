import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import DetailsButton from './DetailsButton.jsx'
import DeleteButton from './DeleteButton.jsx'
import EditButton from './EditButton.jsx'
import GameCard from './GameCard.jsx'

import { retrieveGameSummaries } from '../dataHelper.js'

export default function GameGrid ({ refreshGames, setRefreshGames, ...props }) {
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

    if (refreshGames) {
      console.log('fetching data')
      fetchData()
      setRefreshGames(false)
    }
  }, [refreshGames, setRefreshGames])

  const gameCards = summarizedGames.map((game) => (
    <GameCard key={game.id} gameID={game.id}>
      <DetailsButton game={game} {...props} />
      <div className="btn-group" role="group">
        <EditButton gameID={game.id} title={game.title} {...props} />
        <DeleteButton
          gameID={game.id}
          title={game.title}
          refreshGames={() => setRefreshGames(true)}
        />
      </div>
    </GameCard>
  ))

  return (
    <div className="row gy-4 pt-4 pb-4" id="gameRow">
      {gameCards}
    </div>
  )
}

GameGrid.propTypes = {
  refreshGames: PropTypes.bool,
  setRefreshGames: PropTypes.func
}
