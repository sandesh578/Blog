const MongoClient = require('mongoose');
const util = require('util');
const log4js = require('log4js');
const dotenv = require('dotenv');
const { decrypt } = require('../crypto/fileCrypto');

const logger = log4js.getLogger('connect2db');

dotenv.config({ path: '../.env.dev' });

const MONGO_DB_PROTOCOL = decrypt(process.env.MONGO_DB_PROTOCOL);
const MONGO_DB_HOST = decrypt(process.env.MONGO_DB_HOST);
const MONGO_DB_PORT = decrypt(process.env.MONGO_DB_PORT);

const dbUrl = `${MONGO_DB_PROTOCOL}://${MONGO_DB_HOST}:${MONGO_DB_PORT}`;

let client;

async function connectDb() {
  await MongoClient.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then((result) => {
      client = result;
      logger.info('Connected to database');
    })
    .catch((err) => {
      logger.error(
        `Unable to connect to database \n${util.inspect(err, null, null)}`
      );
      throw new Error(err);
    });

  return client;
}

async function getDb() {
  if (client) {
    return client;
  }
  return connectDb();
}

async function closeDB() {
  if (client) {
    return client.close();
  }
  return;
}

module.exports = {
  getDb,
  connectDb,
  closeDB
};
