const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });
  console.log("MongoDB Connected...");
};

module.exports = connectDB;
