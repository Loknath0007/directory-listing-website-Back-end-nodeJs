const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title must be less than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description must be less than 5000 characters"],
    },
    category: {
      category: {
        type: String,
        // required: [true, 'Category is required'],
      },
      subcategories: [String],
    },
    brand: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    condition: {
      type: String,
      trim: true,
    },
    priceType: {
      type: String,
      trim: true,
    },
    locations: [
      {
        country: {
          type: String,
          required: [true, "Country is required"],
        },
        states: [
          {
            state: {
              type: String,
              required: [true, "State is required"],
            },
            cities: [String],
          },
        ],
      },
    ],
    images: [
      {
        type: String,
        required: [true, "Image is required"],
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
