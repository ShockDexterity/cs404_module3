import React, { useEffect, useState } from 'react'

import GameCard from './GameCard.jsx'
import DetailsButton from './DetailsButton.jsx'
// import DeleteButton from './DeleteButton.jsx'

import { retrieveGameSummaries } from '../dataHelper.js'

export default function GameGrid (props) {
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

    fetchData()
  }, [])

  const gameCards = summarizedGames.map((game) => (
    <GameCard key={game.id} gameID={game.id}>
      <DetailsButton game={game} {...props} />
      {/* <DeleteButton gameID={game.id} title={game.title} /> */}
    </GameCard>
  ))

  return (
    <div className="row gy-4 pb-4" id="gameRow">
      {gameCards}
    </div>
  )
}
