// Import the necessary modules
const asyncHandler = require("express-async-handler");
const Category = require("../models/blogCatModel");
const validateMangoDbId  = require("../utils/validatemangodbid")






// Function to create a new category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json({
            status: "Category Created Successfully",
            newCategory,
        });
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


//update category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMangoDbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.json(updatedCategory);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});



//delete a category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMangoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});



//get a category
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMangoDbId(id);
    try {
        const category = await Category.findById(id);
        res.json(category);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});

// getall category
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


module.exports = { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory};