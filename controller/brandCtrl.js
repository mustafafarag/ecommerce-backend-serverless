// Import the necessary modules
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const validateMangoDbId  = require("../utils/validatemangodbid")




// Function to create a new brand
const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json({
            status: "Brand Created Successfully",
            newBrand,
        });
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});


//update brand
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMangoDbId(id);
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.json(updatedBrand);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});



//delete a brand
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMangoDbId(id);
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});



//get a brand
const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMangoDbId(id);
    try {
        const brand = await Brand.findById(id);
        res.json(brand);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});

// get all brands
const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const Brands = await Brand.find();
        res.json(Brands);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});



// Export the functions to be used in the routes
module.exports = { createBrand, updateBrand, deleteBrand, getBrand, getAllBrands };