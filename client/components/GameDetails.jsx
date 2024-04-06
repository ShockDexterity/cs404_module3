import React, { useContext, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'

import DetailItem from './DetailItem.jsx'

import { retrieveSpecificGame } from '../dataHelper'
import { GameDetailsContext } from '../contexts/GameDetailsContext.jsx'
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
          console.log(
            Object.keys(gameToShow).sort((a, b) => a.localeCompare(b))
          )
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
            src={game.image}
          />
        </div>
        <div className="col">
          <ul className="list-group list-group-flush">
            <DetailItem label="Age" value={game.age} />
            <DetailItem
              label="Players"
              value={
                game.min_players === 0 && game.max_players === 0
                  ? 'N/A'
                  : game.min_players === game.max_players
                    ? game.min_players
                    : `${game.min_players}-${game.max_players}`
              }
            />
            <DetailItem
              label="Playtime"
              value={
                game.min_playtime === 0 && game.max_playtime === 0
                  ? 'N/A'
                  : game.min_playtime === game.max_playtime
                    ? `${game.min_playtime} minutes`
                    : `${game.min_playtime}-${game.max_playtime} minutes`
              }
            />
            <DetailItem
              label="Designer(s)"
              value={
                game.designers.length <= 5
                  ? game.designers.join(', ')
                  : `${game.designers[0]} (+${game.designers.length - 1})`
              }
            />
            <DetailItem
              label="Artist(s)"
              value={
                game.artists.length <= 5
                  ? game.artists.join(', ')
                  : `${game.artists[0]} (+${game.artists.length - 1})`
              }
            />
            <DetailItem
              label="Publisher(s)"
              value={
                game.publishers.length <= 5
                  ? game.publishers.join(', ')
                  : `${game.publishers[0]} (+${game.publishers.length - 1})`
              }
            />
            <DetailItem
              label="Rating"
              value={`${game.rating.toFixed(2)} / 10`}
            />
            <DetailItem
              label="Weighted"
              value={`${game.weight.toFixed(1)} / 5`}
            />
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>{htmlRefReplacer(game.description)}</p>
        </div>
      </div>
    </div>
  )
}

// Prop validation
GameDetails.propTypes = {
  // detailsID: PropTypes.number
}
