const functions = require('firebase-functions');
const _ = require('lodash');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const { postSQL } = require('../../../db');
const db = require('../../../db/db');
const util = require('../../../lib/util');

module.exports = async (req, res) => {
  const { userId, title, hashtagLocation, hashtagTime, maxCount, description, imageUrl } = req.body;
  const {  } = req.query;
  if (!userId || !maxCount) { // userId와 maxCount가 빈 값인 경우에만 fail
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, 'Not enough body.' ))
    };

  let client;

  try {
    client = await db.connect(req);
    const post = await postSQL.addPost(client, userId, title, hashtagLocation, hashtagTime, maxCount, description, imageUrl)
    res.status(statusCode.OK).send(util.success(statusCode.OK, "게시글 등록 성공", {post}))

  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(500).json({ err: error, userMessage: error.message });
  } finally {
    client.release();
  }
};
