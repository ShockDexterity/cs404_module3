import React from 'react'
import PropTypes from 'prop-types'

import { deleteGame } from '../dataHelper.js'

export default function DeleteButton ({ gameID, title, refreshGames }) {
  async function handleDelete (event) {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const response = await deleteGame(gameID)
        if (response.error) {
          window.alert(response.error)
          return
        }
        refreshGames()
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  )
}

// validate game properties
DeleteButton.propTypes = {
  gameID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  refreshGames: PropTypes.func.isRequired
}
