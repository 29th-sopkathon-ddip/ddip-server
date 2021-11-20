const functions = require('firebase-functions');
const _ = require('lodash');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const { userSQL, postSQL, ddipSQL } = require('../../../db');
const db = require('../../../db/db');
const util = require('../../../lib/util');

module.exports = async (req, res) => {
  const { postId,userId } = req.body;
  if (!postId||!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'Not enough parameters.' ))

  let client;

  try {
    client = await db.connect(req);
    await client.query('BEGIN');

    const user = await userSQL.getUser(client,userId)
    let post = await postSQL.getPostById(client,postId)
    const ddips = await ddipSQL.getDdipsByPostId(client,postId)
    let currentDdips  =ddips?ddips.length:0
    if(currentDdips>=post.maxCount){
        res.status(statusCode.FORBIDDEN).send(util.fail(statusCode.FORBIDDEN, "모든 띱이 완료되었어요 ㅠㅠ\n다음 띱을 노려보세요 !", user))
    }else if(ddips.find(o=>o.userId===userId)){
        res.status(statusCode.FORBIDDEN).send(util.fail(statusCode.FORBIDDEN, "이미 참여한 띱이예요!!", user))
    }else{
        let ddip = await ddipSQL.addDdip(client, postId,userId)
        res.status(statusCode.OK).send(util.success(statusCode.OK, "띱 성공!\n우리 사이 띱한 사이", {ddip}))
        await client.query('COMMIT');

    }


  } catch (error) {
    await client.query('ROLLBACK');

    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(500).json({ err: error, userMessage: error.message });
  } finally {
    client.release();
  }
};
