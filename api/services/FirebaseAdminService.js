const admin = require('firebase-admin');

const serviceAccount = require('../../config/abandono-zero-c27b0-firebase-adminsdk-qm5au-190f00fd01.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https:1:537894418550:web:8b559db756d68868c80757.firebaseio.com"
});

module.exports = admin;
