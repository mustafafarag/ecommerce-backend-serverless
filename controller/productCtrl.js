// Description: This file contains the logic for the product routes.
// It contains the logic for creating a product, fetching a product, fetching all products, updating a product, and deleting a product
// The functions are exported and used in the productRoute.js file.


// Import the necessary modules
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const validateMangoDbId = require("../utils/validatemangodbid");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const fs = require("fs");



// Create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
    req.body.slug = slugify(req.body.title);}
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      newProduct,});
  } catch (error) {
    throw new Error(error);
  }
});




// Get product
const getProduct = asyncHandler(async (req, res) => {
  // Get the id from the request params
  const { id } = req.params;
  // Validate the mongoDB id
  try {
    // Find the product by its id
    const getProduct = await Product.findById(id);
    // Return a 201 status code with success message and the fetched product
    res.status(201).json({
      success: true,
      message: "Product fetched successfully",
      getProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});



// Get all products

const getAllProduct = asyncHandler(async (req, res) => {
  try {


    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));


    //Sorting
    if (req.query.sort) {
      console.log(req.query);
      console.log(req.query.sort);
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }


    // limiting fields to be displayed
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else { 
      query = query.select("-__v"); 
    }


    // Pagination
    const page = req.query.page 
    const limit = req.query.limit 
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exist");
    }
    console.log(page, limit, skip);


    

    const product = await query;
    res.json(product);

  } catch (error) {
    throw new Error(error);
  }
});






// Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate({ _id : id }, req.body, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: "Product updated successfully",
            updateProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});


// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const {id }= req.params;
    try {
        const deleteProduct = await Product.findOneAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Product deleted successfully",
            deleteProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});


const addToWishlist = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {prodId} = req.body;
    try{

      const user = await User.findById(_id);
      const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

      if (alreadyAdded) {
        let user = await User.findByIdAndUpdate(_id, {
          $pull: { wishlist: prodId },
        }, { new: true });
        res.status(201).json({
          success: true,
          message: "Product removed from wishlist",
          user,
        });
      } else {
        let user = await User.findByIdAndUpdate(_id, {
          $push: { wishlist: prodId },
        }, { new: true });
        res.status(201).json({
          success: true,
          message: "Product added to wishlist",
          user,
        });
      }
    }
    catch (error) {
        throw new Error(error);
    }
});





const rating = asyncHandler(async (req, res) =>{


    const { _id } = req.user;
    const { star, prodId, comment} = req.body;
    const product = await Product.findById(prodId);


    try {
      // Check if the product already has a rating from the user
      let alreadyRated = product.ratings.find((userId) => userId.postedBy.toString() === _id.toString());
      // If the product has already been rated by the user, update the rating
      if (alreadyRated) {
          const updateRating =  await Product.updateOne(
              {
                  ratings: { $elemMatch: alreadyRated },
              },
              {
                  $set: { "ratings.$.star": star,"ratings.$.comment": comment },
              },
              { new: true }
          );
          res.status(201).json({
              success: true,
              message: "Rating updated successfully",
              updateRating,
          });
      } else {
          // If the product has not been rated by the user, add a new rating
          await Product.findByIdAndUpdate(prodId, {
              $push: {
                  ratings: { star:star, comment: comment , postedBy: _id },
              },
          }, { new: true });
      }

    // get the total ratings
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingSum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    // update the total rating
    let finalprodcut = await Product.findByIdAndUpdate(
        prodId,
        {
            totalrating: actualRating,
        },
        { new: true }
    
    )
    res.json(finalprodcut);
    }
  catch (error) {
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
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Export the functions
module.exports = {  createProduct,  getProduct, getAllProduct , updateProduct, deleteProduct, addToWishlist , rating,
  uploadImages
};