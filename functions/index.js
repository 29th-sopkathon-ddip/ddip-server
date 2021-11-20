const admin = require("firebase-admin");
const serviceAccount = require("./sopkathon-ddip-firebase-adminsdk-ihf3b-a84c58dffc");
const dotenv = require("dotenv");

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require("./api"),
};