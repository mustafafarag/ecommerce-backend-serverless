//// Description: This file defines the schema for the user model and exports the model for use in other files.
// // It defines the fields for the user model, including firstname, lastname, email, mobile, password, role, isBlocked, cart, address, wishlist, and refreshToken.
// // The schema is exported as "User" using the defined schema.


// Import Mongoose library for MongoDB and create a new schema.
const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require("crypto");


// Define the schema for the user model, which includes fields for firstname, lastname, email, mobile, password, role, isBlocked, cart, address, wishlist, and refreshToken.
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    isBloked:{
        type:Boolean,
        default:false,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
      },
    address: {
        type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {type: String,},

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,




}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){ 
    next()}


    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


// Check if the entered password is matched with the password in the database
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}



userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
    passwordResetToken = this.passwordResetToken;
    
    this.passwordResetExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    passwordResetExpire = this.passwordResetExpire;
//    return resettoken , this.passwordResetToken;
    return { resettoken , passwordResetToken, passwordResetExpire };
};




//Export the model
module.exports = mongoose.model('User', userSchema);