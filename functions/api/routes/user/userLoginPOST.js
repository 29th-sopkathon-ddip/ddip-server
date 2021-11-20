const functions = require('firebase-functions');
const _ = require('lodash');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const { userSQL } = require('../../../db');
const db = require('../../../db/db');
const util = require('../../../lib/util');

module.exports = async (req, res) => {
  const { name } = req.body;
  const {  } = req.query;
  if (!name) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'Not enough parameters.' ))

  let client;

  try {
    client = await db.connect(req);
    const user = await userSQL.addUser(client,name)
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ALL_USERS_SUCCESS, {user}))

  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(500).json({ err: error, userMessage: error.message });
  } finally {
    client.release();
  }
};
