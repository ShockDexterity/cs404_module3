export default function validateGame (possibleGame, callback) {
  // set up a clean game for submission
  const cleanGame = {}

  // set up error object
  const err = {}

  // check if the game has an id
  // if it doesn't, callback with an error
  // if it does, it must be an integer
  // if it's not an integer, try to convert it
  // if it can't be converted, callback with an error
  if (!possibleGame.id) {
    err.message = 'Game must have an id'
    err.status = 400
    callback(err)
    return
  }
  else {
    const id = parseInt(possibleGame.id)
    if (isNaN(id)) {
      err.message = 'Game id must be an integer'
      err.status = 400
      callback(err)
      return
    }
    cleanGame.id = id
  }

  // check if the game has a title
  // if it doesn't, callback with an error
  // we don't need to check if it's a string because html forms only submit strings
  if (!possibleGame.title) {
    err.message = 'Game must have a title'
    err.status = 400
    callback(err)
    return
  }
  else {
    cleanGame.title = possibleGame.title
  }

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
    if (key in possibleGame && possibleGame[key] !== '') {
      // grab the value into a variable
      const gameProp = possibleGame[key]

      if (typeof gameProp === targetType) {
        // the game property is good, so just add it
        cleanGame[key] = gameProp
      }
      else {
        if (targetType === 'integer') {
          // the property is a string, so we'll try to convert it to an integer
          const intProp = parseInt(gameProp)
          if (isNaN(intProp)) {
            errorMessages.push(`Field '${key}' must be an integer`)
          }
          else {
            cleanGame[key] = intProp
          }
        }
        else if (targetType === 'float') {
          // the property is a string, so we'll try to convert it to a float
          const floatProp = parseFloat(gameProp)
          if (isNaN(floatProp)) {
            errorMessages.push(`Field '${key}' must be a float`)
          }
          else {
            cleanGame[key] = floatProp
          }
        }
        else if (targetType === 'array') {
          // typeof [1, 2] returns 'object', so we check if it's an array
          cleanGame[key] = gameProp.split(',').map((item) => item.trim())
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
