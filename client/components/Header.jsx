import React from 'react'
import PropTypes from 'prop-types'

export default function Header ({ title, subtitle }) {
  return (
    <div className="row">
      <div className="pb-2 mt-4 mb-2 border-bottom" style={{ width: '100%' }}>
        <h1>{title}</h1>
        {subtitle}
      </div>
    </div>
  )
}

// Validate props
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}
