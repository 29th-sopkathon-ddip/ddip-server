// .env파일에서 선언한 변수를 가지고 올 수 있도록 함
// .env는 깃허브에 업로드 x 
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
};