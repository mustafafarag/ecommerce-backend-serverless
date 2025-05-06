// Importing the Cloudinary library
const cloudinary = require('cloudinary');



// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name from environment variables
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key from environment variables
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret from environment variables
  secure: true, // Use secure URLs
});

const cloudinaryUploadImage = async (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, (error, result) => {
      if (error) {
        reject(error); // Reject the promise if an error occurs
      } else {
        resolve({ url: result.secure_url, ressource_type: "auto" }); // Resolve the promise with the uploaded image URL
      }
    });
  });
};

module.exports = { cloudinaryUploadImage }; // Export the cloudinaryUploadImage function
