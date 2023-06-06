const mongoose = require("mongoose");

const initDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

const disconnectDB = () => {
  mongoose.disconnect();
  console.log("Database disconnected");
};

module.exports = { initDB,disconnectDB};