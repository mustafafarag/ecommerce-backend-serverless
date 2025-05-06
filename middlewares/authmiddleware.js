// Description: This file contains the middleware to check if the user is authenticated and if the user is an admin.
// The middleware functions are exported and used in the userCtrl.js file. 




// Import the required modules  
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');



// Middleware to check if the user is authenticated
const authmiddleware = asyncHandler(async (req, res, next) => {
    // Initialize token variable
    let token;

    // Check if the authorization header starts with 'Bearer'
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        // Extract the token from the authorization header
        token = req.headers.authorization.split(' ')[1];

        try {
            // If token exists, verify it
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Find the user by decoded token id and attach user to request object
                const user = await User.findById(decoded?.id);
                req.user = user;
                // Proceed to the next middleware
                next();
            }
        } catch (error) {
            // If token verification fails, throw an error
            throw new Error('Not authorized token expired, Please login again');
        }
    } else {
        // If no token is attached to the header, throw an error
        throw new Error('There is no token attached to the Header');
    }
});




// Middleware to check if the user is an admin
const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email: email });

    if (adminUser.role !== "admin") {
      throw new Error("Not authorized as an admin");
    } else {
      next();
    }
  });



// Export the authmiddleware
module.exports = { authmiddleware, isAdmin };