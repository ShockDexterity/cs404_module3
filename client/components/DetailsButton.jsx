import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import SummaryInfo from './SummaryInfo.jsx'

import { DetailsDispatchContext } from '../state/GameDetailsContext.jsx'

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
  game: { id, title, year, thumbnail },
  showGameDetails // will be replaced by dispatch
}) {
  const dispatch = useContext(DetailsDispatchContext)

  function handleDetailsClick (event) {
    event.preventDefault()
    dispatch({ type: 'SET_DETAILS', id, title })
    showGameDetails() // setModalOpen(true) and setShowDetails(true)

    // case: 'DISPLAY'
    // return {
    //   ...state,
    //   func: 'display',
    //   id: action.id,
    //   title: action.title,
    //   showModal: true
    // }
    // dispatch({ type: 'DISPLAY', id, title })
  }

  return (
    <button
      className="btn"
      style={{ width: '100%' }}
      data-game-id={id}
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
    year: PropTypes.number,
    thumbnail: PropTypes.string
  }).isRequired,
  showGameDetails: PropTypes.func.isRequired
}
