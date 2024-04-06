import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { DetailsDispatchContext } from '../contexts/GameDetailsContext'

export default function EditButton ({ gameID, title, showEditForm }) {
  const dispatch = useContext(DetailsDispatchContext)

  function handleClick (event) {
    event.preventDefault()
    dispatch({
      type: 'SET_DETAILS',
      id: gameID,
      title,
      modalTitle: `Editing "${title}"`
    })
    showEditForm(gameID)
  }

  return (
    <button className="btn btn-warning" onClick={handleClick}>
      Edit
    </button>
  )
}

// validate game properties
EditButton.propTypes = {
  gameID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  showEditForm: PropTypes.func.isRequired
}
