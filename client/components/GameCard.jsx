import React from 'react'
import PropTypes from 'prop-types'

import DeleteButton from './DeleteButton.jsx'
import DetailsButton from './DetailsButton.jsx'
// import GameSummary from './GameSummary.jsx'

export default function GameCard ({ game }) {
  return (
    <div className="col-sm-6 col-md-6 col-lg-3" id={game.id}>
      <div className="gameSummary">
        <DetailsButton game={game} />
        <DeleteButton gameID={game.id} title={game.title} />
      </div>
    </div>
  )
}

// validate game properties
GameCard.propTypes = {
  game: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired
}
