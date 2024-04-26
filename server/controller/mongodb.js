import { MongoClient, ServerApiVersion } from 'mongodb'

import dotenv from 'dotenv'

// Reads .env file into process.env
dotenv.config()

const DB_USER = process.env.DB_USER ?? 'bad_user'
const DB_PASS = process.env.DB_PASS ?? 'bad_password'
const DB_SERVER = process.env.DB_SERVER ?? 'unknown'

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_SERVER}/?retryWrites=true&w=majority&appName=shockdexterityCluster`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export function connect (dbName) {
  try {
    return client.db(dbName)
  }
  catch (err) {
    console.error(err)
    return null
  }
}

export async function getAllGameSummaries (collection) {
  const query = {}
  const projection = { _id: 0, id: 1, title: 1, year: 1, thumbnail: 1 }

  const data = await collection.find(query).project(projection).toArray()

  return data
}

export async function getSpecificGame (collection, gameID) {
  const query = { id: gameID }
  const projection = { _id: 0 }

  const data = await collection.findOne(query, projection)

  return data
}

export async function insertGame (collection, game) {
  const response = await collection.insertOne(game)
  return response
}

export async function updateGame (collection, idToReplace, replacementData) {
  const query = { id: idToReplace }

  const dataWithoutId = { ...replacementData }
  delete dataWithoutId.id

  const replacer = { $set: dataWithoutId }

  const response = await collection.updateOne(query, replacer)
  return response
}

export async function deleteGame (collection, gameID) {
  const query = { id: gameID }

  const data = await collection.findOneAndDelete(query)

  return data
}
