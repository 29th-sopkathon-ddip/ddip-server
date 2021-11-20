const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addPost = async (client, userId, title, hashtagLocation, hashtagTime, maxCount, description, imageUrl) => {
  const { rows } = await client.query(
    /*sql*/`
    INSERT INTO post 
    (user_id, title, hashtag_location, hashtag_time, max_count, "description", image_url)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,[userId, title, hashtagLocation, hashtagTime, maxCount, description, imageUrl]
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { addPost };
