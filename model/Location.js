const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    state: [
      {
        name: {
          type: String,
        },
        city: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
