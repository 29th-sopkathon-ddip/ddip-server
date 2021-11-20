const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addUser = async (client,name) => {
  const { rows } = await client.query(
    /*sql*/`
    INSERT INTO "user"(name)
    VALUES ($1)
    RETURNING *
    `,[name]
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getUser = async (client,userId) => {
    const { rows } = await client.query(
      /*sql*/`
      SELECT * FROM "user"
      WHERE "user".id = ${userId}
      AND "user".is_deleted = false
      `,
    );
  
    return convertSnakeToCamel.keysToCamel(rows[0]);
  };

module.exports = { addUser,getUser };
