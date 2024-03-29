import React from 'react'
import PropTypes from 'prop-types'

import DeleteButton from './DeleteButton.jsx'
import DetailsButton from './DetailsButton.jsx'

const gameSummaryStyle = {
  border: '1px solid black',
  borderRadius: '10px',
  textAlign: 'center',
  fontSize: 'medium',
  padding: '5px',
  verticalAlign: 'bottom',
  height: '250px'
}

export default function GameCard ({ game }) {
  return (
    <div className="col-md-6 col-lg-3" id={game.id}>
      <div style={gameSummaryStyle}>
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
