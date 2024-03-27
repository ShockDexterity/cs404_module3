import React from 'react'
import PropTypes from 'prop-types'

export default function SummaryInfo ({ title, thumbnail }) {
  return (
    <div className="summaryInfo">
      <img
        className="img-thumbnail"
        src={thumbnail ?? './unknown.png'}
        alt={thumbnail ? `Image for ${title}` : 'No image provided'}
        style={{ height: '100px' }}
      />
    </div>
  )
}

// validate game properties
SummaryInfo.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
}
