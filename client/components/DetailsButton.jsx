import React from 'react'
import PropTypes from 'prop-types'

import SummaryInfo from './SummaryInfo.jsx'

export default function DetailsButton ({
  game: { id: gameID, title, year, thumbnail }
}) {
  return (
    <button
      className="btn detailsLink"
      data-game-id={gameID}
      onClick={() => {}}
    >
      <div className="gameHeader">
        <span className="gameTitle">{title}</span>
        <span> ({year ?? 'unknown'})</span>
      </div>
      <SummaryInfo title={title} thumbnail={thumbnail} />
    </button>
  )
}

// validate game properties
DetailsButton.propTypes = {
  game: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired
}
