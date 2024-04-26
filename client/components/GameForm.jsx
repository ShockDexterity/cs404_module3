import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import FloatingFormEntry from './FloatingFormEntry.jsx'

import { GameDetailsContext } from '../state/GameDetailsContext.js'

import { editGame, insertGame } from '../dataHelper.js'
import htmlRefReplacer from '../utils.js'

export default function GameForm ({ addGame }) {
  const {
    // id: gameID = null,
    func,
    game: gameToEdit
  } = useContext(GameDetailsContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    const data = Object.fromEntries(formData.entries())

    if (func === 'adding') {
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
    else if (func === 'editing') {
      const editedData = { ...data, id }
      const response = await editGame(editedData)

      window.alert(response.message)
      if (!response.error) {
        addGame()
      }
      else {
        console.error(response.message)
      }
      console.log(editedData)
    }
  }

  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [rating, setRating] = useState('')
  const [description, setDescription] = useState('')
  const [minAge, setMinAge] = useState('')
  const [minPlayers, setMinPlayers] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('')
  const [minPlaytime, setMinPlaytime] = useState('')
  const [maxPlaytime, setMaxPlaytime] = useState('')
  const [weight, setWeight] = useState('')
  const [designers, setDesigners] = useState('')
  const [artists, setArtists] = useState('')
  const [publishers, setPublishers] = useState('')
  const [image, setImage] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  useEffect(() => {
    if (func === 'editing') {
      if (gameToEdit) {
        try {
          setID(gameToEdit.id)
          setTitle(gameToEdit.title)
          setYear(gameToEdit.year ? gameToEdit.year : '')
          setRating(gameToEdit.rating ? gameToEdit.rating : '')
          setDescription(
            gameToEdit.description
              ? htmlRefReplacer(gameToEdit.description)
              : ''
          )
          setMinAge(gameToEdit.min_age ? gameToEdit.min_age : '')
          setMinPlayers(gameToEdit.min_players ? gameToEdit.min_players : '')
          setMaxPlayers(gameToEdit.max_players ? gameToEdit.max_players : '')
          setMinPlaytime(gameToEdit.min_playtime ? gameToEdit.min_playtime : '')
          setMaxPlaytime(gameToEdit.max_playtime ? gameToEdit.max_playtime : '')
          setWeight(gameToEdit.weight ? gameToEdit.weight : '')
          setDesigners(
            gameToEdit.designers ? gameToEdit.designers.join(', ') : ''
          )
          setArtists(gameToEdit.artists ? gameToEdit.artists.join(', ') : '')
          setPublishers(
            gameToEdit.publishers ? gameToEdit.publishers.join(', ') : ''
          )
          setImage(gameToEdit.image ? gameToEdit.image : '')
          setThumbnail(gameToEdit.thumbnail ? gameToEdit.thumbnail : '')
        }
        catch (error) {
          console.error(error)
        }
      }
    }
    else if (func === 'adding') {
      setID('')
      setTitle('')
      setYear('')
      setRating('')
      setDescription('')
      setMinAge('')
      setMinPlayers('')
      setMaxPlayers('')
      setMinPlaytime('')
      setMaxPlaytime('')
      setWeight('')
      setDesigners('')
      setArtists('')
      setPublishers('')
      setImage('')
      setThumbnail('')
    }
  }, [func, gameToEdit])

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <FloatingFormEntry cols={3}>
          <input
            type="text"
            className="form-control"
            name="id"
            placeholder=""
            value={id}
            onChange={(event) => setID(event.target.value)}
            disabled={func === 'editing'}
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
            value={year}
            onChange={(event) => setYear(event.target.value)}
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
            value={rating}
            onChange={(event) => setRating(event.target.value)}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
            value={minAge}
            onChange={(event) => setMinAge(event.target.value)}
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
            value={minPlayers}
            onChange={(event) => setMinPlayers(event.target.value)}
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
            value={maxPlayers}
            onChange={(event) => setMaxPlayers(event.target.value)}
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
            value={minPlaytime}
            onChange={(event) => setMinPlaytime(event.target.value)}
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
            value={maxPlaytime}
            onChange={(event) => setMaxPlaytime(event.target.value)}
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
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
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
            value={designers}
            onChange={(event) => setDesigners(event.target.value)}
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
            value={artists}
            onChange={(event) => setArtists(event.target.value)}
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
            value={publishers}
            onChange={(event) => setPublishers(event.target.value)}
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
            value={image}
            onChange={(event) => setImage(event.target.value)}
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
            value={thumbnail}
            onChange={(event) => setThumbnail(event.target.value)}
          />
          <label htmlFor="thumbnail" style={{ opacity: '65%' }}>
            Thumbnail Link
          </label>
        </FloatingFormEntry>
      </div>

      <button type="submit" className="btn btn-primary">
        {func === 'editing' ? 'Edit' : 'Submit'} Game
      </button>
    </form>
  )
}

// Prop validation
GameForm.propTypes = {
  addGame: PropTypes.func.isRequired
}
