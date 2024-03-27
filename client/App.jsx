import React from 'react'
import Header from './components/Header.jsx'

import GameGrid from './components/GameGrid.jsx'

export default function App () {
  return (
    <div className="container">
      <Header
        title="Tabletop Game Browser"
        subtitle="Click on a game below for more information."
      />
      <GameGrid />
    </div>
  )
}
