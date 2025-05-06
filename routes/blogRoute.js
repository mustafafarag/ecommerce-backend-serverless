const express = require("express");
const router = express.Router();
const { createBlog, updateBlog ,getBlog , getAllBlogs, deleteBlog, likeBlog , dislikeBlog, uploadImages} = require("../controller/blogCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");
const { uploadPhoto, blogsImgResize } = require("../middlewares/uploadImages");


router.post("/", authmiddleware, isAdmin, createBlog);
router.put("/upload/:id", authmiddleware, isAdmin , uploadPhoto.array("images", 10), blogsImgResize, uploadImages);
router.put("/likes", authmiddleware,isAdmin, likeBlog);
router.put("/dislikes", authmiddleware,isAdmin, dislikeBlog);
router.put("/:id", authmiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authmiddleware, isAdmin, deleteBlog);



module.exports = router;