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

const getPostById = async (client, postId) => {
    const { rows } = await client.query(
        /*sql*/`
        SELECT * FROM post
        WHERE id = $1
            AND is_deleted = false
        `,
        [postId]
    );

    return convertSnakeToCamel.keysToCamel(rows[0])
};

module.exports = { addPost, getAllPosts, getPostById };
