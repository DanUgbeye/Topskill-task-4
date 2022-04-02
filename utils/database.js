const mongoose = require('mongoose');

//connects with the database
const dbConnection = async () => {
  return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
}

module.exports = { dbConnection };