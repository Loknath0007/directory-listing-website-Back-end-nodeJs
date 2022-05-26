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
    subCategories: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
