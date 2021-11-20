const functions = require('firebase-functions');
const _ = require('lodash');
const { userSQL } = require('../../../db');
const db = require('../../../db/db');

module.exports = async (req, res) => {
  const { name } = req.body;
  const {  } = req.query;

  let client;

  try {
    client = await db.connect(req);
    const user = await userSQL.addUser(client,name)
    
    res.status(200).json({
      err: false,
      name
    });
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(500).json({ err: error, userMessage: error.message });
  } finally {
    client.release();
  }
};
