const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const validateMangoDbId  = require("../utils/validatemangodbid")
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const fs = require("fs");


const createBlog = asyncHandler(async (req, res) => {

    try{
        const newBlog = await Blog.create(req.body);
        res.json({
        status: "success",
        newBlog,}
    )}
    catch(error){
        res.status(500);
        throw new Error(error);
    }

});

const updateBlog = asyncHandler(async (req, res) => {

    const {id} = req.params;
    try{
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true});
        res.json({
            status: "success",
            updateBlog,}
        )
    }
    catch(error){
        res.status(500);
        throw new Error(error);
    }
});



const getBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const getBlog = await Blog.findById(id); await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });
        res.json({
            status: "success",
            getBlog,}
        )
    }
    catch(error){
        res.status(500);
        throw new Error(error);
    }
});


const getAllBlogs = asyncHandler(async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.json({
            status: "success",
            blogs,}
        )
    }
    catch(error){
        res.status(500);
        throw new Error(error);
    }
});


const deleteBlog = asyncHandler(async (req, res) => {
    const {id }= req.params;
    try {
        const deletedBlog = await Blog.findOneAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Blog deleted successfully",
            deletedBlog,
        });
    } catch (error) {
        throw new Error(error);
    }
});





// Like a blog: Put /api/blog/likes
const likeBlog = asyncHandler(async (req, res) => {
    // Get the Blog ID to like/dislike from the request body.
    const { blogId } = req.body;
  
    // Validate the blogId is a valid MongoDB ObjectId or not.
    validateMangoDbId(blogId);
  
    try {
      // Find a blog by Id using the findById() method of the Blog Model.
      const blog = await Blog.findById(blogId);
  
      // Find a user by id using the req?.user?._id
      // "?" mean optional chaining
      const user = await User.findById(req?.user?._id);
  
      // Check whether the blog is already disliked by this user.
      const alreadyDisliked = blog?.dislikes.find(
        (userId) => userId?.toString() === user?._id?.toString()
      );
  
      // If the blog is already disliked by this user, remove the dislike and set the value of "isDisliked" field to false.
      if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { dislikes: user?._id },
            isDisliked: false,
          },
          { new: true } // Returns the updated document after modification.
        );
        res.status(201).json({
          success: true,
          message: "Blog liked successfully",
          blog,
        });
      }
  
      // Check whether the blog is already liked by this user.
      const isLiked = blog?.isLiked;
  
      // If the blog is already liked by this user, remove the like and set the value of "isLiked" field to false.
      if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: user?._id },
            isLiked: false,
          },
          { new: true } // Returns the updated document after modification.
        );
        res.status(201).json({
          success: true,
          message: "Blog unliked successfully",
          blog,
        });
      } else {
        // If the blog is not liked by this user yet, add the like and set the value of "isLiked" field to true.
        const blog = await Blog.findByIdAndUpdate(
          blogId,
          {
            $push: { likes: user?._id },
            isLiked: true,
          },
          { new: true } // Returns the updated document after modification.
        );
        res.status(201).json({
          success: true,
          message: "Blog liked successfully",
          blog,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  });







// Dislike a blog: Put /api/blog/dislikes/
// This function handles the logic for disliking a blog post
const dislikeBlog = asyncHandler(async (req, res) => {
  // Get the blogId from the request body
  const { blogId } = req.body;

  // Validate the blogId
  validateMangoDbId(blogId);

  try {
    // Find the blog by its Id
    const blog = await Blog.findById(blogId);

    // Find the user who is making the request
    const user = await User.findById(req?.user?._id);

    // Check if the blog has already been disliked
    const isDisliked = blog?.isDisliked;

    // Check if the user has already liked the blog
    const alreadyLiked = blog?.likes.find(
      (userId) => userId?.toString() === user?._id?.toString()
    );

    // If the user has already liked the blog, remove the like
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: user?._id },
          isLiked: false,
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Blog disliked successfully",
        blog,
      });
    }






    // If the blog has already been disliked, remove the dislike
    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: user?._id },
          isDisliked: false,
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Blog dislike removed successfully",
        blog,
      });
    } else {
      // Otherwise, add a dislike to the blog
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: user?._id },
          isDisliked: true,
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Blog disliked successfully",
        blog,
      });
    }
  } catch (error) {
    // Throw an error if something goes wrong
    throw new Error(error);
  }
});




const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMangoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImage(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});



module.exports = {createBlog , updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog ,dislikeBlog, uploadImages};