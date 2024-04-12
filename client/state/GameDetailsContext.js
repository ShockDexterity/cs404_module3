import { createContext } from 'react'

import { retrieveSpecificGame } from '../dataHelper.js'

export const GameDetailsContext = createContext(null)
export const DetailsDispatchContext = createContext(null)

export function gameReducer (state, action) {
  switch (action.type) {
    // Show the modal
    case 'SHOW':
      return { ...state, show: true }

    // Hide the modal
    case 'HIDE':
      return { ...state, show: false }

    // Set the modal to display the game details
    case 'DETAILS':
      return {
        ...state,
        title: action.title,
        func: 'details',
        show: true
      }

    // Set the modal to display the form for adding a game
    case 'ADD':
      return {
        ...state,
        func: 'adding',
        title: 'Add Game',
        show: true
      }

    // Set the modal to display the form for editing a game
    case 'EDIT':
      return {
        ...state,
        title: action.title,
        func: 'editing',
        show: true
      }

    // Request the game details
    case 'REQUEST':
      return { ...state, requestedID: action.id }

    // Receive the game details
    case 'RECEIVE':
      return { ...state, game: action.game, show: true }

    default:
      return state
  }
}

export async function getDetails (id, dispatch) {
  try {
    const newDetails = await retrieveSpecificGame(id)
    dispatch({ type: 'RECEIVE', game: newDetails })
  }
  catch (error) {
    console.error(error)
  }
}
