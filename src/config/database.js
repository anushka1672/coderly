const mongoose = require("mongoose");


async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log("Database connected");
  } catch (err) {
    console.log("DB connection failed", err);
    process.exit(1);
  }
}

module.exports = connectDB;