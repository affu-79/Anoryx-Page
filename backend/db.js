/**
 * MongoDB connection for Anoryx backend.
 * Requires MONGODB_URI in .env.
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
const dbName = process.env.MONGODB_DB_NAME || 'Anoryx_userBase';
let client = null;
let db = null;

async function connect() {
  if (db) return db;
  if (!uri) {
    console.warn('MONGODB_URI is not set. Auth and user features will be disabled.');
    return null;
  }
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

function getDb() {
  return db;
}

async function close() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connect, getDb, close };
