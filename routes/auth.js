const router = require("express").Router();
const User = require("../models/User");
const { registervalidation, loginvalidation } = require("../validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async(req, res) => {
    //Validating
    const { error } = registervalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Cheking the existence og the email
    const checkemail = await User.findOne({ email: req.body.email });
    if (checkemail) return res.status(400).send("User Already Existing");

    //hashing password
    const salt = await bcrypt.genSaltSync(10);
    const hashpasswd = await bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashpasswd
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async(req, res) => {
    //Validating
    const { error } = loginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Cheking the existence og the email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User Doesnt Existing");

    //Check password
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass) return res.status(400).send("Password not correct");

    //Get token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});
module.exports = router;