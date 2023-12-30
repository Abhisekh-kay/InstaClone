const express = require('express')
const { getUser, getUserFriends,addRemoveFriends} = require('../controllers/users.js')
const {verifyToken} = require('../middleware/auth.js')

const router = express.Router();

// Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriends)

// Read
router.get("/:id", verifyToken,getUser)
router.get("/:id/friends", verifyToken,getUserFriends)

module.exports = router;