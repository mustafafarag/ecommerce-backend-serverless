// Description: This file contains the routes for the user.
// It contains the routes for creating a user, fetching a user, fetching all users, updating a user, and deleting a user.
// The routes are exported and used in the index.js file.


//Import the necessary modules
const express = require("express");
const router = express.Router();
const { createUser,loginUserControl , getalluser, getaUser, deleteaUser,updateduser, blockUser , unblockUser , handleRefreshToken , 
    logout ,updatepassword , forgetPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress,
    userCart, getUserCart} = require("../controller/userCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");
const rateLimiter = require('../middlewares/redisRateLimiter')


// Define the routes for the user.
router.post("/register", createUser);
router.post("/forget-password-token",forgetPasswordToken );
router.put("/reset-password/:token",rateLimiter('reset-password-token'), resetPassword);
router.put("/password",authmiddleware, updatepassword)
router.post("/login", rateLimiter('login') , loginUserControl);
router.post("/admin-login",rateLimiter('admin-login'), loginAdmin);
router.post("/cart", authmiddleware, userCart);
router.get("/cart", authmiddleware, getUserCart);
router.get("/all-users" , getalluser)
router.get("/refresh" , handleRefreshToken) 
router.post("/logout" , logout)
router.get("/wishlist" , authmiddleware , getWishlist)
router.put("/save-address" , authmiddleware , saveAddress)
router.get("/:id" , authmiddleware, isAdmin, getaUser)
router.delete("/:id" , authmiddleware,isAdmin, deleteaUser)
router.put("/edit-user" ,authmiddleware, updateduser)
router.put("/block-user/:id" ,authmiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id" ,authmiddleware, isAdmin, unblockUser)


// Handle undefined routes
router.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


router.post("/login", (req, res) => {});



// Export the router object.
module.exports = router;