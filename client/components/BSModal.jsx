import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Modal from 'bootstrap/js/dist/modal'

import { GameDetailsContext } from '../state/GameDetailsContext.js'

export default function BSModal ({ onClose, children }) {
  const { title = 'N/A', show } = useContext(GameDetailsContext)

  // Create a reference for the modal
  const modalRef = useRef(null)
  const [modalObj, setModalObj] = useState(null)

  useEffect(() => {
    if (modalRef.current && !modalObj) {
      setModalObj(new Modal(modalRef.current))
      modalRef.current.addEventListener('hidden.bs.modal', onClose)
    }
  }, [modalObj, onClose])

  // Show or hide the modal based on isOpen
  useEffect(() => {
    if (modalObj) {
      if (show) {
        modalObj.show()
      }
      else {
        modalObj.hide()
      }
    }
  }, [show, modalObj])

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="detailModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{title}</h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
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
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
}

BSModal.defaultProps = {
  // title: 'N/A',
  children: null
}
