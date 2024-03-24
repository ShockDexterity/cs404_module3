import { addGame, deleteGame } from './dataHelper'

export async function submitGameInfo (event) {
  event.preventDefault()

  const fieldTypes = {
    gameID: { intendedType: 'number', dbName: 'id' },
    gameTitle: { intendedType: 'string', dbName: 'title' },
    gameYear: { intendedType: 'number', dbName: 'year' },
    gameRating: { intendedType: 'number', dbName: 'rating' },
    gameDescription: { intendedType: 'string', dbName: 'description' },
    minAge: { intendedType: 'number', dbName: 'min_age' },
    minPlayers: { intendedType: 'number', dbName: 'min_players' },
    maxPlayers: { intendedType: 'number', dbName: 'max_players' },
    minPlaytime: { intendedType: 'number', dbName: 'min_playtime' },
    maxPlaytime: { intendedType: 'number', dbName: 'max_playtime' },
    gameWeight: { intendedType: 'number', dbName: 'weight' },
    gameDesigner: { intendedType: 'array', dbName: 'designers' },
    gameArtist: { intendedType: 'array', dbName: 'artists' },
    gamePublisher: { intendedType: 'array', dbName: 'publishers' },
    gameImage: { intendedType: 'string', dbName: 'image' },
    gameThumbnail: { intendedType: 'string', dbName: 'thumbnail' }
  }

  const submission = {}

  const form = document.forms[0]
  const formElements = Array.from(form.elements).slice(0, -1)

  for (const element of formElements) {
    let value = element.value

    if (!value) {
      continue
    }

    const name = element.name
    const intendedType = fieldTypes[name].intendedType

    if (typeof value !== intendedType) {
      if (intendedType === 'array') {
        value = value.split(/, |,/)
      }
      else if (intendedType === 'number' && !isNaN(value)) {
        value = Number(value)
      }
    }
    submission[fieldTypes[name].dbName] = value
  }

  try {
    const response = await addGame(JSON.stringify(submission))

    window.alert(response.message)
    if (!response.error) {
      // add card
    }
  }
  catch (error) {
    console.error(error)
  }
}

export async function makeDeleteRequest (event) {
  event.preventDefault()

  const title = this.getAttribute('data-game-title')
  const gameID = this.getAttribute('data-game-id')

  if (window.confirm(`Delete "${title}"?`)) {
    try {
      const deletion = await deleteGame(gameID)
      if (deletion.error) {
        window.alert(deletion.message)
      }
      else {
        const elemToDelete = document.getElementById(gameID)
        elemToDelete.textContent = ''
        elemToDelete.remove()
        window.alert(`"${title}" successfully deleted`)
      }
    }
    catch (error) {
      window.alert(error)
    }
  }
}
