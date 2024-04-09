import React, { useContext, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'

import DetailSingleItem from './DetailSingleItem.jsx'
import DetailRangeItem from './DetailRangeItem.jsx'

import { retrieveSpecificGame } from '../dataHelper'
import { GameDetailsContext } from '../state/GameDetailsContext.jsx'
import htmlRefReplacer from '../utils.js'

export default function GameDetails (props) {
  const [game, setGame] = useState(null)

  const { id: detailsID = null } = useContext(GameDetailsContext)

  useEffect(() => {
    async function fetchGame () {
      if (detailsID) {
        try {
          const gameToShow = await retrieveSpecificGame(detailsID)
          setGame(gameToShow)
        }
        catch (error) {
          console.error(error)
        }
      }
    }

    fetchGame()
  }, [detailsID])

  if (!game) {
    return null
  }

  if (!detailsID) {
    return null
  }

  return (
    <div className="container">
      <div className="row pb-2 mb-2 border-bottom border-secondary-subtle border-2">
        <div className="col-lg-6 col-xl-5 d-flex justify-content-center">
          <img
            className="w-100"
            id="details-image"
            alt={`Cover art for ${game.title}`}
            src={game.image ?? './unknown.png'}
          />
        </div>
        <div className="col">
          <ul className="list-group list-group-flush">
            <DetailSingleItem header="Age" value={game.min_age} label="years" />

            <DetailRangeItem
              header="Players"
              min={game.min_players}
              max={game.max_players}
              label="player(s)"
            />
            <DetailRangeItem
              header="Playtime"
              min={game.min_playtime}
              max={game.max_playtime}
              label="minutes"
            />

            <DetailSingleItem header="Designer(s)" value={game.designers} />
            <DetailSingleItem header="Artist(s)" value={game.artists} />
            <DetailSingleItem header="Publisher(s)" value={game.publishers} />

            <DetailSingleItem
              header="Rating"
              value={game.rating ? game.rating.toFixed(2) : null}
              label="/ 10"
            />
            <DetailSingleItem
              header="Weighted"
              value={game.weight ? game.weight.toFixed(1) : null}
              label="/ 5"
            />
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>
            {game.description
              ? htmlRefReplacer(game.description)
              : 'Not available'}
          </p>
        </div>
      </div>
    </div>
  )
}

// Prop validation
GameDetails.propTypes = {
  // detailsID: PropTypes.number
}
