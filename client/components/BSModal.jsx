import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Modal from 'bootstrap/js/dist/modal'

export default function BSModal ({ title, isOpen, onClose, children }) {
  const [modalObj, setModalObj] = useState(null)

  // maybe ???
  const myRef = useRef(null)

  useEffect(() => {
    if (modalObj === null) {
      // maybe ???
      setModalObj(new Modal(myRef.current))
    }
  }, [modalObj])

  return (
    <div
      className="modal fade"
      id="detailModal"
      tabIndex="-1"
      aria-labelledby="detailModalLabel"
      aria-hidden="true"
      // maybe ???
      ref={myRef}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="detailModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ marginLeft: '15px' }}
            ></button>
          </div>

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Prop types
BSModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
}

BSModal.defaultProps = {
  title: 'N/A',
  children: null
}
