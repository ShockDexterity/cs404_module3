import React from 'react'
import PropTypes from 'prop-types'

export default function EditButton ({ gameID, title, dispatch }) {
  const handleClick = (event) => {
    event.preventDefault()
    dispatch({ type: 'REQUEST', id: gameID })
    dispatch({ type: 'EDIT', title: `Editing ${title}` })
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
  dispatch: PropTypes.func.isRequired
}
