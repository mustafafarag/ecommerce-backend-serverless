
// Importing the required modules
const express = require("express");
const router = express.Router();
const { createCategory, updateCategory , deleteCategory, getCategory, getAllCategory} = require("../controller/blogCatCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");





router.post("/", authmiddleware, isAdmin , createCategory); // Route to create a new category
router.put("/:id", authmiddleware, isAdmin , updateCategory); // Route to update an existing category
router.delete("/:id", authmiddleware, isAdmin , deleteCategory); // Route to delete a category
router.get("/:id", authmiddleware, isAdmin , getCategory); // Route to get a specific category
router.get("/", authmiddleware, isAdmin , getAllCategory); // Route to get all categories



// Exporting the router
module.exports = router;