const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()
const path = require("path") ;
const { fileURLToPath } = require("url");

const authRoutes = require("./routes/auth.js")
const {register} = require("./controllers/auth.js")
const userRoutes = require("./routes/users.js")
const postRoutes = require("./routes/post.js");
const { verifyToken } = require('./middleware/auth.js');
const {createPost} = require("./controllers/posts.js")
const User = require("./models/user.js")
const Post = require("./models/Post.js")
const {users, posts} = require("./data/index.js")

// Middleware Configuration
// const __filename = fileURLToPath(import.meta.url);
const currentFilePath = __filename;
const currentDirectory = path.dirname(currentFilePath)
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"));
app.use(bodyparser.json({limit: "30mb", extended: true}))
app.use(bodyparser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets",express.static(path.join(currentDirectory, 'public/assetss')))

// File Storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

// Routes with Files
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)

// Routes
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

// MONGODB Setup
mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`Server Port: ${process.env.PORT}`));

    // Add Data one time
    // User.insertMany(users);
    // Post.insertMany(posts)
})
.catch((error) => console.log(`${error} did not connect`));

// app.listen(process.env.PORT, () => console.log("Server is running on port ", + process.env.PORT))
