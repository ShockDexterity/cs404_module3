import React, { useReducer, useState } from 'react'

import BSModal from './components/BSModal.jsx'
import GameDetails from './components/GameDetails.jsx'
import GameGrid from './components/GameGrid.jsx'
import GameForm from './components/GameForm.jsx'
import Header from './components/Header.jsx'

import {
  GameDetailsContext,
  DetailsDispatchContext
} from './state/GameDetailsContext.jsx'

export default function App (props) {
  // State to manage whether the modal is open or not
  const [modalOpen, setModalOpen] = useState(false)

  // State to manage which modal to show
  const [showDetails, setShowDetails] = useState(true)
  const [editing, setEditing] = useState(false)

  // Let React know to re-render the GameGrid when a game is added
  const [refreshGames, setRefreshGames] = useState(true)

  // Reducer to manage the details of the game to show
  const [details, dispatch] = useReducer(detailsReducer, {
    id: null,
    title: null,
    modalTitle: null
  })

  return (
    <div className="container">
      <Header
        title="Tabletop Game Browser"
        subtitle="Click on a game below for more information"
        onOpenForm={(event) => {
          event.preventDefault()
          setModalOpen(true)
          setShowDetails(false)
          setEditing(false)
          dispatch({ type: 'SET_MODAL_TITLE', modalTitle: 'Add Game' })
        }}
      />

      <DetailsDispatchContext.Provider value={dispatch}>
        <GameGrid
          showGameDetails={() => {
            setModalOpen(true)
            setShowDetails(true)
          }}
          showEditForm={() => {
            setEditing(true)
            setModalOpen(true)
            setShowDetails(false)
          }}
          refreshGames={refreshGames}
          setRefreshGames={setRefreshGames}
        />
      </DetailsDispatchContext.Provider>

      <GameDetailsContext.Provider value={details}>
        <BSModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setShowDetails(true)
          }}
        >
          {showDetails
            ? (
            <GameDetails />
              )
            : (
            <GameForm addGame={() => setRefreshGames(true)} editing={editing} />
              )}
        </BSModal>
      </GameDetailsContext.Provider>
    </div>
  )
}

function detailsReducer (state, action) {
  switch (action.type) {
    case 'SET_DETAILS':
      return { id: action.id, title: action.title, modalTitle: action.title }
    case 'SET_MODAL_TITLE':
      return { ...state, modalTitle: action.modalTitle }
    default:
      return state
  }
}

function gameReducer (state, action) {
  switch (action.type) {
    // Show the modal
    case 'SHOW':
      return { ...state, showModal: true }

    // Hide the modal
    case 'HIDE':
      return { ...state, showModal: false }

    // Set the modal to display the game details
    case 'DISPLAY':
      return { ...state, func: 'display', title: action.title }

    // Set the modal to display the form for adding a game
    case 'ADD':
      return { ...state, func: 'adding' }

    // Set the modal to display the form for editing a game
    case 'EDIT':
      return { ...state, func: 'editing', title: action.title }

    // Request the game details
    case 'REQUEST':
      return { ...state, requestID: action.requestID }

    // Receive the game details
    case 'RECEIVE':
      return { ...state, game: action.game }

    default:
      return state
  }
}
