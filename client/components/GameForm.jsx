import React from 'react'
import PropTypes from 'prop-types'

import FloatingFormEntry from './FloatingFormEntry.jsx'
import { insertGame } from '../dataHelper.js'

// import { GameDetailsContext } from '../contexts/GameDetailsContext'

export default function GameForm ({ addGame }) {
  // const { id = 'N/A', title = 'N/A' } = React.useContext(GameDetailsContext)

  async function handleSubmit (event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    const data = Object.fromEntries(formData.entries())

    try {
      const response = await insertGame(data)

      window.alert(response.message)
      if (!response.error) {
        addGame()
      }
      else {
        console.error(response.message)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <FloatingFormEntry cols={3}>
          <input
            type="text"
            className="form-control"
            name="id"
            placeholder=""
            required
          />
          <label htmlFor="id">ID</label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={3}>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder=""
            required
          />
          <label htmlFor="title">Title</label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={3}>
          <input
            type="text"
            className="form-control"
            name="year"
            placeholder=""
            style={{ height: '100%' }}
          />
          <label htmlFor="year" style={{ opacity: '65%' }}>
            Year
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={3}>
          <input
            type="text"
            className="form-control"
            name="rating"
            placeholder=""
          />
          <label htmlFor="rating" style={{ opacity: '65%' }}>
            Rating
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={12}>
          <textarea
            className="form-control"
            name="description"
            placeholder=""
          />
          <label htmlFor="description" style={{ opacity: '65%' }}>
            Description
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={2}>
          <input
            type="text"
            className="form-control"
            name="min_age"
            placeholder=""
          />
          <label htmlFor="min_age" style={{ opacity: '65%' }}>
            Age
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={2}>
          <input
            type="text"
            className="form-control"
            name="min_players"
            placeholder=""
          />
          <label htmlFor="min_players" style={{ opacity: '65%' }}>
            Min Players
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={2}>
          <input
            type="text"
            className="form-control"
            name="max_players"
            placeholder=""
          />
          <label htmlFor="max_players" style={{ opacity: '65%' }}>
            Max Players
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={2}>
          <input
            type="text"
            className="form-control"
            name="min_playtime"
            placeholder=""
          />
          <label htmlFor="min_playtime" style={{ opacity: '65%' }}>
            Min Playtime
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={2}>
          <input
            type="text"
            className="form-control"
            name="max_playtime"
            placeholder=""
          />
          <label htmlFor="max_playtime" style={{ opacity: '65%' }}>
            Max Playtime
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={2}>
          <input
            type="text"
            className="form-control"
            name="weight"
            placeholder=""
          />
          <label htmlFor="weight" style={{ opacity: '65%' }}>
            Weight
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={4}>
          <input
            type="text"
            className="form-control"
            name="designers"
            placeholder=""
          />
          <label htmlFor="designer" style={{ opacity: '65%' }}>
            Designers
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={4}>
          <input
            type="text"
            className="form-control"
            name="artists"
            placeholder=""
          />
          <label htmlFor="artists" style={{ opacity: '65%' }}>
            Artists
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={4}>
          <input
            type="text"
            className="form-control"
            name="publishers"
            placeholder=""
          />
          <label htmlFor="publishers" style={{ opacity: '65%' }}>
            Publishers
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={6}>
          <input
            type="text"
            className="form-control"
            name="image"
            placeholder=""
          />
          <label htmlFor="image" style={{ opacity: '65%' }}>
            Image Link
          </label>
        </FloatingFormEntry>

        <FloatingFormEntry cols={6}>
          <input
            type="text"
            className="form-control"
            name="thumbnail"
            placeholder=""
          />
          <label htmlFor="thumbnail" style={{ opacity: '65%' }}>
            Thumbnail Link
          </label>
        </FloatingFormEntry>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Game
      </button>
    </form>
  )
}

// Prop validation
GameForm.propTypes = {
  addGame: PropTypes.func.isRequired
}
