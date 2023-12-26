const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()
import path from "path";
import { fileURLToPath } from "url";

// Middleware Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"));
app.use(bodyparser.json({limit: "30mb", extended: true}))
app.use(bodyparser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname, 'public/assetss')))

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
