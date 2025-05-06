// Import Mongoose library for MongoDB and create a new Schema.
const mongoose = require("mongoose");

// Define the schema for the blog model.
var blogSchema = new mongoose.Schema(
  {
    // Title and description are required fields that must be strings.
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Category is a required string field for categorizing blogs.
    category: {
      type: String,
      required: true,
    },
    // NumViews is a number that keeps track of how many times a blog post has been viewed.
    numViews: {
      type: Number,
      default: 0,
    },
    // isLiked and isDisliked are boolean fields indicating whether a user has liked or disliked the blog.
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    // likes and dislikes are arrays of user IDs who have liked or disliked the blog.
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // images is an array of image URLs associated with the blog post.
    images: [],
    // author is the name of the user who created the blog post.
    author: {
      type: String,
      default: "admin",
    },
  },
  // Set options for the schema: virtuals, timestamps show when the post was created and updated.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Export the blog model as "Blog" using the defined schema.
module.exports = mongoose.model("Blog", blogSchema);