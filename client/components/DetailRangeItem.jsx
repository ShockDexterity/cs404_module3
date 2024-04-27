import React from 'react'
import PropTypes from 'prop-types'

const emphasis = {
  fontWeight: 'bold'
}

export default function DetailItem ({ header, min = 0, max = 0, label = '' }) {
  const text =
    min === 0 && max === 0
      ? 'N/A'
      : min === max || min > max
        ? `${min} ${label}`
        : `${min}-${max} ${label}`

  return (
    <li className="list-group-item">
      <span style={emphasis}>{header}: </span>
      {text}
    </li>
  )
}

// Prop types
DetailItem.propTypes = {
  header: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string
}
