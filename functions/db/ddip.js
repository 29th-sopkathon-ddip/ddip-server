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
module.exports = { getAllDdips };
