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
    destination: function(req,res,cb){
        cb(null, "public/assets");
    },
    filename: function(req,res,cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

// Routes with Files
app.post("/auth/register", upload.single("picture"), register)

// Routes
app.use("/auth", authRoutes)

// MONGODB Setup
mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`Server Port: ${process.env.PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

// app.listen(process.env.PORT, () => console.log("Server is running on port ", + process.env.PORT))
