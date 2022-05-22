const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    subCategories: [
      {
        type: String,
        unique: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
