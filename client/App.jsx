import React, { useState } from 'react'

import Header from './components/Header.jsx'
import GameGrid from './components/GameGrid.jsx'
import BSModal from './components/BSModal.jsx'
import GameDetails from './components/GameDetails.jsx'

export default function App () {
  const [activeGame, setActiveGame] = useState(null)

  return (
    <div className="container">
      <Header
        title="Tabletop Game Browser"
        subtitle="Click on a game below for more information."
      />
      <GameGrid setActiveGame={setActiveGame} />
      <BSModal title="GameTitle">
        <GameDetails activeGame={activeGame} />
      </BSModal>
    </div>
  )
}
