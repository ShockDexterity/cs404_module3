import React from 'react'
import PropTypes from 'prop-types'

export default function FloatingFormEntry ({ cols, children }) {
  let colsClass = 'col mb-3'
  if (cols) {
    if (cols <= 3) {
      colsClass = `col-lg-${cols} col-md-${cols * 2} mb-3`
    }
    else {
      colsClass = `col-${cols} mb-3`
    }
  }

  return (
    <div className={colsClass}>
      <div className="form-floating">{children}</div>
    </div>
  )
}

// Prop validation
FloatingFormEntry.propTypes = {
  cols: PropTypes.number,
  children: PropTypes.node.isRequired
}
