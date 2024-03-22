import React from 'react'

export default function GameRow (props) {
  const { listOfSummarizedGames } = props
  const gameCards = listOfSummarizedGames.map((game, index) => (
    <li key={index}>{game.id}</li>
  ))
  return (
    <div className="row gy-4" id="gameRow">
      <ul>gameCards</ul>
    </div>
  )
}
