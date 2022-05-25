const mongoose = require('mongoose');
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
          unique: true,
        },
        city: [
          {
            type: String,
            unique: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
