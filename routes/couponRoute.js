// Importing the required modules
const express = require("express");
const router = express.Router();
const {createCoupon , getAllCoupons, updateCoupon, deleteCoupon} = require("../controller/couponCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");




// endpoints for coupon routes
router.post("/", authmiddleware, isAdmin, createCoupon);
router.get("/", authmiddleware, isAdmin, getAllCoupons);
router.put("/:id", authmiddleware, isAdmin, updateCoupon);
router.delete("/:id", authmiddleware, isAdmin, deleteCoupon);


// Exporting the router
module.exports = router;