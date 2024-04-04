import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import DetailItem from './DetailItem.jsx'

import { retrieveSpecificGame } from '../dataHelper'
import charRefReplacer from '../utils.js'

export default function GameDetails ({ detailsID }) {
  const [game, setGame] = useState(null)

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

  return (
    <div className="container">
      <div className="row pb-2 mb-2 border-bottom border-secondary-subtle border-2">
        <div className="col-lg-6 col-xl-5 d-flex justify-content-center">
          <img
            className="w-100"
            id="details-image"
            alt={`Cover art for ${game.title}`}
            src={game.image}
          />
        </div>
        <div className="col">
          <ul className="list-group list-group-flush">
            <DetailItem label="Age" value={game.min_age} />
            <DetailItem
              label="Players"
              value={`${game.min_players}-${game.max_players} players`}
            />
            <DetailItem
              label="Playtime"
              value={`${game.min_playtime}-${game.max_playtime} minutes`}
            />
            <DetailItem label="Designer(s)" value={game.designers.join(', ')} />
            <DetailItem label="Artist(s)" value={game.artists.join(', ')} />
            <DetailItem
              label="Publisher(s)"
              value={game.publishers.join(', ')}
            />
            <DetailItem label="Rating" value={game.rating} />
            <DetailItem label="Weighted" value={game.weight} />
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>{charRefReplacer(game.description)}</p>
        </div>
      </div>
    </div>
  )
}

// Prop validation
GameDetails.propTypes = {
  detailsID: PropTypes.number
}
