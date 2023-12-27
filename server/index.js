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

// MONGODB Setup
// const mongooseOptions = {
//     useCreateIndex: true, // Use the new option to opt-in for index creation
//     useFindAndModify: false, // Use the new option to opt-out from using deprecated methods
//     useNewUrlParser: true, // This is no longer needed, but you can keep it until the next major version
//     useUnifiedTopology: true // This is no longer needed, but you can keep it until the next major version
//   };

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`Server Port: ${process.env.PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

// app.listen(process.env.PORT, () => console.log("Server is running on port ", + process.env.PORT))
