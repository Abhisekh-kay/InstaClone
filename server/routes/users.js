const express = require('express')
const { getUser, getUserFriends,addremoveFriend} = require('../controllers/users.js')
const {verifyToken} = require('../middleware/auth.js')

const router = express.Router();

// Read
router.get("/:id", verifyToken,getUser)
router.get("/:id/friends", verifyToken,getUserFriends)

// Update
router.patch("/:id/:friends", verifyToken, addremoveFriend)

module.exports = router;