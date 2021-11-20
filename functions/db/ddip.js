const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllDdips = async (client) => {
    const { rows } = await client.query(
      /*sql*/`
      SELECT * FROM ddip
      WHERE is_deleted = false
      `,
    );
  
    return convertSnakeToCamel.keysToCamel(rows);
  };

const getDdipsByPostId = async (client,postId) => {
    const { rows } = await client.query(
      /*sql*/`
      SELECT * FROM ddip
      WHERE is_deleted = false
      AND ddip.post_id = ${postId}
      `,
    );
  
    return convertSnakeToCamel.keysToCamel(rows);
  };


const addDdip = async (client, postId,userId) => {
    const { rows } = await client.query(
      /*sql*/`
      INSERT INTO ddip(post_id,user_id)
      VALUES ($1,$2)
      RETURNING *
      `,[postId,userId]
    );
  
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };
module.exports = { getAllDdips ,getDdipsByPostId,addDdip};
