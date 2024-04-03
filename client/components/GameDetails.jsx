import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { retrieveSpecificGame } from '../dataHelper'

export default function GameDetails ({ activeGame }) {
  const [game, setGame] = useState({})

  useEffect(() => {
    async function fetchGame () {
      if (activeGame) {
        try {
          const data = await retrieveSpecificGame(activeGame)
          setGame(data)
        }
        catch (error) {
          console.log(error)
        }
      }
    }

    fetchGame()
  }, [activeGame])

  return (
    <div className="container">
      <div className="row pb-2 mb-2 border-bottom border-secondary-subtle border-2">
        <div className="col-lg-6 col-xl-5 d-flex justify-content-center">
          <img className="w-100" id="details-image" alt="image goes here" />
        </div>
        <div className="col">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="emphasis">Age:</span>
              <span id="details-age"></span>
            </li>
            <li className="list-group-item">
              <span className="emphasis">Players:</span>
              <span id="details-players"></span>
            </li>
            <li className="list-group-item">
              <span className="emphasis">Playtime:</span>
              <span id="details-playtime"></span>
            </li>
            <li className="list-group-item">
              <span className="emphasis">Designer(s):</span>
              <span id="details-designer"></span>
            </li>
            <li className="list-group-item">
              <span className="emphasis">Artist(s):</span>
              <span id="details-artist"></span>
            </li>
            <li className="list-group-item">
              <span className="emphasis">Publisher(s):</span>
              <span id="details-publisher"></span>
            </li>
            <li className="list-group-item">
              <span className="emphasis">Rating:</span>
              <span id="details-rating"></span>
            </li>
            <li className="list-group-item">
              <span className="emphasis">Weighted:</span>
              <span id="details-weight"></span>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p id="details-description"></p>
        </div>
      </div>
    </div>
  )
}

// Prop validation
GameDetails.propTypes = {
  activeGame: PropTypes.number.isRequired
}
