import React, { useReducer, useState } from 'react'

import Header from './components/Header.jsx'
import GameGrid from './components/GameGrid.jsx'
import BSModal from './components/BSModal.jsx'
import GameDetails from './components/GameDetails.jsx'
import {
  GameDetailsContext,
  DetailsDispatchContext
} from './contexts/GameDetailsContext.jsx'

export default function App () {
  // State to manage whether the modal is open or not
  const [modalOpen, setModalOpen] = useState(false)

  // Reducer to manage the details of the game to show
  const [details, dispatch] = useReducer(detailsReducer, {
    id: null,
    title: ''
  })

  return (
    <div className="container">
      <Header
        title="Tabletop Game Browser"
        subtitle="Click on a game below for more information."
      />
      <DetailsDispatchContext.Provider value={dispatch}>
        <GameGrid showGameDetails={() => setModalOpen(true)} />
      </DetailsDispatchContext.Provider>

      <GameDetailsContext.Provider value={details}>
        <BSModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <GameDetailsContext.Provider value={details}>
            <GameDetails />
          </GameDetailsContext.Provider>
        </BSModal>
      </GameDetailsContext.Provider>
    </div>
  )
}

function detailsReducer (state, action) {
  switch (action.type) {
    case 'SET_DETAILS':
      return { id: action.id, title: action.title }
    default:
      return state
  }
}
