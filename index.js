// Description: This file is the entry point of the application. 
// It connects to the database and starts the server. It also uses the middlewares and routes.   


// Importing the required modules
const express = require ("express")
const app = express()
const swaggerDocs = require('./swagger')
const dotenv = require ("dotenv").config()
const PORT = process.env.PORT || 4000
const authRouter = require("./routes/authRoute")
const bodyParser = require("body-parser")
const {notFound, errorHandler} = require("./middlewares/errorHandler")
const cookieParser = require("cookie-parser")
const productRouter = require("./routes/productRoute");
const morgan = require("morgan");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/productcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");


// Using the middlewares and routes
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev")); 
swaggerDocs(app)


app.use("/api/user", authRouter)
app.use("/api/product", productRouter); 
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory",blogcategoryRouter )
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);



// Error handling middlewares
app.use(notFound)
app.use(errorHandler)


module.exports = app