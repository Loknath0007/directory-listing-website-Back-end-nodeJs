const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.daqqt.mongodb.net/listing_siteDB?retryWrites=true&w=majority`;

const connectDB = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

  console.log("MongoDB Connected...");
};

module.exports = connectDB;
