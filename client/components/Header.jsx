import React from 'react'
import PropTypes from 'prop-types'

export default function Header ({ title, subtitle, onOpenForm }) {
  return (
    <>
      <div className="row">
        <div className=" pb-2 mt-4 mb-2 border-bottom">
          <h1>{title}</h1>
          {subtitle}, or click{' '}
          <a href="" onClick={onOpenForm}>
            here
          </a>{' '}
          to add a new game.
        </div>
      </div>
    </>
  )
}

// Prop types
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onOpenForm: PropTypes.func.isRequired
}

// Default props
Header.defaultProps = {
  subtitle: ''
}
