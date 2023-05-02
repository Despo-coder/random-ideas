const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(conn.connection.host);
};

// To be used if you get a StrictQuery Warning
//mongoose.set('strictQuery', true)

module.exports = connectDB;
