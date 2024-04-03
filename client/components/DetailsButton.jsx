import React from 'react'
import PropTypes from 'prop-types'

import SummaryInfo from './SummaryInfo.jsx'

const gameHeaderStyle = {
  display: 'block',
  fontSize: 'medium',
  height: '4.5em'
}

const gameTitleStyle = {
  fontSize: 'medium',
  fontWeight: 'bold',
  fontStyle: 'italic'
}

export default function DetailsButton ({
  game: { id: gameID, title, year, thumbnail },
  setActiveGame
}) {
  function handleDetailsClick (event) {
    event.preventDefault()
    setActiveGame(gameID)
  }

  return (
    <button
      className="btn"
      style={{ width: '100%' }}
      data-game-id={gameID}
      onClick={handleDetailsClick}
    >
      <div style={gameHeaderStyle}>
        <span style={gameTitleStyle}>{title}</span>
        <span> ({year ?? 'unknown'})</span>
      </div>
      <SummaryInfo title={title} thumbnail={thumbnail} />
    </button>
  )
}

// Prop validation
DetailsButton.propTypes = {
  game: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired
}
