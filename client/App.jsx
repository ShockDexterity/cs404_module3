import React, { useEffect, useReducer, useState } from 'react'

import BSModal from './components/BSModal.jsx'
import GameDetails from './components/GameDetails.jsx'
import GameGrid from './components/GameGrid.jsx'
import GameForm from './components/GameForm.jsx'
import Header from './components/Header.jsx'

import {
  GameDetailsContext,
  DetailsDispatchContext,
  gameReducer,
  getDetails
} from './state/GameDetailsContext.js'

export default function App (props) {
  // Let React know to re-render the GameGrid when a game is added
  const [refreshGames, setRefreshGames] = useState(true)

  const [reducer, dispatch] = useReducer(gameReducer, {
    func: '',
    requestedID: '',
    title: '',
    show: false,
    game: null
  })

  useEffect(() => {
    if (reducer.requestedID !== '') {
      if (reducer.game?.id !== reducer.requestedID) {
        getDetails(reducer.requestedID, dispatch)
      }
      else {
        dispatch({ type: 'SHOW' })
      }
    }
  }, [reducer.requestedID, reducer.game?.id])

  return (
    <div className="container">
      <Header
        title="Tabletop Game Browser"
        subtitle="Click on a game below for more information"
        onOpenForm={(event) => {
          event.preventDefault()
          dispatch({ type: 'ADD' })
        }}
      />

      <DetailsDispatchContext.Provider value={dispatch}>
        <GameGrid
          refreshGames={refreshGames}
          setRefreshGames={setRefreshGames}
        />
      </DetailsDispatchContext.Provider>

      <GameDetailsContext.Provider value={reducer}>
        <BSModal
          onClose={() => {
            dispatch({ type: 'HIDE' })
          }}
        >
          {reducer.func === 'details'
            ? (
            <GameDetails />
              )
            : (
            <GameForm addGame={() => setRefreshGames(true)} />
              )}
        </BSModal>
      </GameDetailsContext.Provider>
    </div>
  )
}
