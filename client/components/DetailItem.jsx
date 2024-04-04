import React from 'react'
import PropTypes from 'prop-types'

const emphasis = {
  fontWeight: 'bold'
}

export default function DetailItem ({ label, value }) {
  return (
    <li className="list-group-item">
      <span style={emphasis}>{label}: </span>
      {value}
    </li>
  )
}

// Prop types
DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

// Default props
DetailItem.defaultProps = {
  value: 'Not available'
}
