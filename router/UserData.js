const express = require('express');
const route = express.Router();
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const SECRET_KEY = "sshvs";
// const {body,validationResult}=require("express-validator");
const jwtSecret=process.env.JWT_SECRET;


const User = require("../models/Restaurant");


// const errors = validationResult(req);

// if (!errors.isEmpty()) {
//   console.log(errors);
//   return res.status(400).json({ errors: errors.array() });
// }




route.post("/createuser", async (req, res) => {
  try {
    // Check if the required fields are present in the request body
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const {username,email,password}=req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password:hashedPassword
    });

    const createuser = await newUser.save();
    console.log("Successfully saved!");
    res.status(201).send(createuser);
  } catch (err) {
    console.log(err);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).json({ error: "Internal server error" });
  }
});



route.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email: email });

    if (!userData) {
      return res.status(401).json({ errors: "Invalid login credentials" });
    }

    // Now that you have found a user, you can proceed to check the password.
    const pwdCompare = await bcrypt.compare(password, userData.password);

    const data = {
      User: {
        id: userData._id
      }
    };

    if (pwdCompare) {
    const authToken = jwt.sign({email:userData.email,password:userData.password}, jwtSecret);
    return res.json({ success: true, authToken: authToken });
    }
    else{
      return res.status(401).json({ errors: "Invalid login credentials due to password" });
    }

    
  } catch (err) {
    console.error(err);
    res.status(500).json(err, { success: false });
  }
});


module.exports = route;
