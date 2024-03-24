export async function retrieveGameSummaries () {
  const response = await fetch('./games', { method: 'GET' })
  const summaries = await response.json()
  return summaries
}

export async function retrieveSpecificGame (gameID) {
  const response = await fetch(`./games/${gameID}`, { method: 'GET' })
  const game = await response.json()
  return game
}

export async function addGame (gameData) {
  const response = await fetch('./games', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: gameData
  })
  const respJSON = await response.json()
  return respJSON
}

export async function deleteGame (gameID) {
  const response = await fetch(`./games/${gameID}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const respJSON = await response.json()
  return respJSON
}
