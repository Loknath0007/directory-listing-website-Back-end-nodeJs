const mongoose = require('mongoose');
const { Schema } = mongoose;

const settingSchema = new Schema(
  {
    logo: [
      {
        type: String,
        required: [true, 'Logo is required'],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
