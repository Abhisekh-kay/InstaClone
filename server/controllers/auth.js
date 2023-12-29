const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Register user
exports.register = async(req,res)=>{
    // try{
    //     const {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         picturePath,
    //         friends,
    //         location,
    //         occupation
    //     }= req.body;

    //     const salt = await bcrypt.genSalt();
    //     const passwordHash = await bcrypt.hash(password, salt);

    //     const newUser = new User({
    //         firstName,
    //         lastName,
    //         email,
    //         password: passwordHash,
    //         picturePath,
    //         friends,
    //         location,
    //         occupation,
    //         viewedProfile: Math.floor(Math.random()*100),
    //         impressions: Math.floor(Math.random()*100),
    //     });
    //      const savedUser = await newUser.save();
    //      console.log(savedUser.email)
    //      res.status(201).json({message: savedUser});
    // }
    // catch(err){
    //     res.status(500).json({error: err.message})
    // }
    // const firstName = req.body;
    // res.send(firstName)
}

// Loggin In
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};