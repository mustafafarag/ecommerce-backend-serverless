
// Importing the required modules
const express = require("express");
const router = express.Router();
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrands } = require("../controller/brandCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");


// Defining the routes for brand operations
router.post("/", authmiddleware, isAdmin , createBrand); // Route to create a new beand
router.put("/:id", authmiddleware, isAdmin , updateBrand); // Route to update an existing beand
router.delete("/:id", authmiddleware, isAdmin ,deleteBrand ); // Route to delete a beand
router.get("/:id", authmiddleware, isAdmin , getBrand); // Route to get a specific beand
router.get("/", authmiddleware, isAdmin , getAllBrands); // Route to get all beand



// Exporting the router
module.exports = router;