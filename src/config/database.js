const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://anushkakhewadia_db_user:bQ1zXJb1KaCCItQ9@cluster0.exvvcap.mongodb.net/mycoderly?appName=Cluster0"
    );
    console.log("Database connected");
  } catch (err) {
    console.log("DB connection failed", err);
    process.exit(1);
  }
}

module.exports = connectDB;