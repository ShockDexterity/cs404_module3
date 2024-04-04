import React, { useState } from 'react'

import Header from './components/Header.jsx'
import GameGrid from './components/GameGrid.jsx'
import BSModal from './components/BSModal.jsx'
import GameDetails from './components/GameDetails.jsx'

export default function App () {
  // State to manage whether the modal is open or not
  const [modalOpen, setModalOpen] = useState(false)

  // State to manage the ID of the game to show details for
  const [details, setDetailsID] = useState({ id: null, title: '' })

  return (
    <div className="container">
      <Header
        title="Tabletop Game Browser"
        subtitle="Click on a game below for more information."
      />
      <GameGrid
        requestGameDetails={setDetailsID}
        showGameDetails={() => setModalOpen(true)}
      />
      <BSModal
        title={details.title}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <GameDetails detailsID={details.id} />
      </BSModal>
    </div>
  )
}
