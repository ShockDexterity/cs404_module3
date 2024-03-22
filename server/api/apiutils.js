export default function validateGame (possibleGame, callback) {
  // set up a clean game for submission
  const cleanGame = {}

  // set up error object
  const err = {}

  // check if game id exists
  if (!possibleGame.id) {
    err.message = 'Missing ID field'
    err.status = 400
    callback(err)
    return
  }

  // check if the game id is a number
  if (!Number.isInteger(possibleGame.id)) {
    err.message = "Field 'id' must be an integer"
    err.status = 400
    callback(err)
    return
  }

  // check if the game has a title
  if (!possibleGame.title) {
    err.message = 'Game must have a title'
    err.status = 400
    callback(err)
    return
  }

  // add id and title to clean game
  cleanGame.id = possibleGame.id
  cleanGame.title = possibleGame.title

  // optional fields to check
  const optionalFields = {
    description: 'string',
    year: 'integer',
    min_age: 'integer',
    min_players: 'integer',
    max_players: 'integer',
    min_playtime: 'integer',
    max_playtime: 'integer',
    thumbnail: 'string',
    image: 'string',
    rating: 'float',
    weight: 'float',
    designers: 'array',
    artists: 'array',
    publishers: 'array'
  }

  // a list to hold any error messages
  const errorMessages = []

  // iterate through each optional property
  Object.entries(optionalFields).forEach(([key, targetType]) => {
    // skips anything in the possible game that we don't care about
    if (key in possibleGame) {
      // grab the value into a variable
      const gameProp = possibleGame[key]

      if (typeof gameProp === targetType) {
        // the game property is good, so just add it
        cleanGame[key] = gameProp
      }
      else {
        if (targetType === 'integer' && typeof gameProp === 'number') {
          // the property is a number, so we'll ensure it's an integer
          cleanGame[key] = parseInt(gameProp)
        }
        else if (targetType === 'float' && typeof gameProp === 'number') {
          // the property is a number, so we'll ensure it's a float
          cleanGame[key] = parseFloat(gameProp)
        }
        else if (targetType === 'array' && Array.isArray(gameProp)) {
          // typeof [1, 2] returns 'object', so we check if it's an array
          cleanGame[key] = gameProp
        }
        else {
          // the property wasn't valid or couldn't be converted
          errorMessages.push(`Field '${key}' must be of type '${targetType}'`)
        }
      }
    }
    else {
      // if the optional entry isn't present, we'll set it to null
      // the client will process null property values when rendering
      cleanGame[key] = null
    }
  })

  if (errorMessages.length) {
    err.message = errorMessages.join('\n')
    err.status = 400
    callback(err)
    return
  }

  callback(null, cleanGame)
}
