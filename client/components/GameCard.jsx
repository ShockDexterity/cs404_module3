import React from 'react'
import PropTypes from 'prop-types'

const gameSummaryStyle = {
  border: '1px solid black',
  borderRadius: '10px',
  textAlign: 'center',
  fontSize: 'medium',
  padding: '5px',
  verticalAlign: 'bottom'
}

export default function GameCard ({ gameID, children }) {
  return (
    <div className="col-md-6 col-lg-3" id={gameID}>
      <div style={gameSummaryStyle}>{children}</div>
    </div>
  )
}

// Prop validation
GameCard.propTypes = {
  gameID: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}
