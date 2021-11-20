const functions = require('firebase-functions');
const _ = require('lodash');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const { postSQL, userSQL, ddipSQL } = require('../../../db');
const db = require('../../../db/db');
const util = require('../../../lib/util');

module.exports = async (req, res) => {
  const { postId } = req.query;
  
  if (!postId) { // 파라미터 값이 비어있을 때
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, 'Not enough params.' ))
    };

  let client;

  try {
    client = await db.connect(req);
    const post = await postSQL.getPostByIdWithUser(client, postId);
    const users = await ddipSQL.getDdipsByPostIdWithUser(client,postId)

    console.log(post);

    if (post === undefined) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, "해당 아이디의 게시글 없음"))
    };

    res.status(statusCode.OK).send(util.success(statusCode.OK, "게시글 조회 성공", {post,dippedUser:users}));

    // 일치하는 게시글이 없을 때 fail 날리기

  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(500).json({ err: error, userMessage: error.message });
  } finally {
    client.release();
  }
};
