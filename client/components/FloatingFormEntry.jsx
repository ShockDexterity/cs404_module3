import React from 'react'
import PropTypes from 'prop-types'

export default function FloatingFormEntry ({ cols, children }) {
  return (
    <div className={cols ? `col-${cols} mb-3` : 'col mb-3'}>
      <div className="form-floating">{children}</div>
    </div>
  )
}

// Prop validation
FloatingFormEntry.propTypes = {
  cols: PropTypes.number,
  children: PropTypes.node.isRequired
}
