const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addUser = async (client,name) => {
  const { rows } = await client.query(
    /*sql*/`
    INSERT INTO "user"(name)
    VALUES ($1)
    RETURNING *
    `,[name]
  );

  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { addUser };
