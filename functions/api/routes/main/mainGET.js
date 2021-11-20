const functions = require('firebase-functions');
const _ = require('lodash');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const { userSQL, postSQL, ddipSQL } = require('../../../db');
const db = require('../../../db/db');
const util = require('../../../lib/util');

module.exports = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'Not enough parameters.' ))

  let client;

  try {
    client = await db.connect(req);
    const user = await userSQL.getUser(client,userId)
    const posts = await postSQL.getAllPosts(client)
    
    const ddips = await ddipSQL.getAllDdips(client)


    
    let cards = posts.map(post=>{
        let currentCount=ddips.filter(ddip => ddip.postId === post.id).length
        return {...post, currentCount}
    })

    res.status(statusCode.OK).send(util.success(statusCode.OK, "조회 성공", {user,cards}))
 
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(500).json({ err: error, userMessage: error.message });
  } finally {
    client.release();
  }
};
