const mongoose = require("mongoose");
const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONOGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit();
  }
};
module.exports = ConnectDB;
