require("dotenv").config();
const mongoose = require("mongoose");
const connect = async () => {
  await mongoose.connect(process.env.MONGO_LINK);
};
module.exports = {
  connect,
};
