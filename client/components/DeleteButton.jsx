import React from 'react'
import PropTypes from 'prop-types'

export default function DeleteButton ({ id: gameID, title }) {
  return (
    <button
      className="btn btn-danger"
      data-game-id={gameID}
      data-game-title={title}
      onClick={() => {}}
    >
      Delete Game
    </button>
  )
}

// validate game properties
DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}
