import React from 'react'
import PropTypes from 'prop-types'

const emphasis = {
  fontWeight: 'bold'
}

export default function DetailItem ({ header, value, label }) {
  let text = `${value ?? 'Not available'} ${value ? label : ''}`
  if (Array.isArray(value)) {
    if (value.length > 5) {
      text = `${value[0]} (+${value.length - 1})`
    }
    else {
      text = value.join(', ')
    }
  }

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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  label: PropTypes.string
}

// Default props
DetailItem.defaultProps = {
  label: ''
}
