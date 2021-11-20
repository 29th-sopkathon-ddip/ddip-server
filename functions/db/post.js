const convertSnakeToCamel = require('../lib/convertSnakeToCamel');


const getAllPosts = async (client) => {
    const { rows } = await client.query(
      /*sql*/`
      SELECT * FROM post
      WHERE is_deleted = false
      ORDER BY created_at DESC
      `,
    );
  
    return convertSnakeToCamel.keysToCamel(rows);
  };

module.exports = { getAllPosts };
