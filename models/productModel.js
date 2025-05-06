// Description: This file defines the schema for the product model and exports the model for use in other files.
// It defines the fields for the product model, including title, slug, description, price, category, brand, quantity, images, color, tags, ratings, and totalrating.
// The schema is exported as "Product" using the defined schema.



// Import Mongoose library for MongoDB and create a new schema.
const mongoose = require("mongoose");

// Define the schema for the product model, which includes fields for title, slug, description, price, category, brand, quantity, images, color, tags, ratings and totalrating.
var productSchema = new mongoose.Schema(
  {
    title: {
      // The title of the product.
      type: String,
      required: true, // The title field is required.
      trim: true,
    },
    slug: {
      // The slug of the product.
      type: String,
      // required: true,
      unique: true, // The slug should be unique.
      lowercase: true, // Convert to lowercase.
    },
    description: {
      // The description of the product.
      type: String,
      required: true, // The description field is required.
      unique: true, // The description should be unique.
    },
    price: {
      type: Number,
      required: true, // The price field is required.
    },
    category: {
      // Category field - Under which category does this product belong.
      type: String,
      required: true, // Category field is required.
    },
    brand: {
      type: String,
      required: true, // Brand field is required.
    },
    quantity: {
      type: Number,
      required: true, // Quantity field is required.
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    images: [],
    color: {
      // Color field - The color of the product.
        type: String,
        required: true,
    },
    ratings: [
    // Ratings field - An array of objects representing the ratings given by users.
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who posted this rating.
      },
    ],
    totalrating: {
      // Total rating field - The total rating given to the product.
      type: String,
      default: 0,
    },
  },
  { timestamps: true } // Add timestamp fields createdAt and updatedAt to the schema
);

// Export the product model as "Product" using the defined schema.
module.exports = mongoose.model("Product", productSchema);