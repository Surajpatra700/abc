const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const {body,validationResult}=require("express-validator");
const jwtSecret=process.env.JWT_SECRET;


const Register=require('../models/Restaurant');


router.post("/createuser",[
    body('email','incorrect email').isEmail(),
    body('username').isLength({min:5}),
    body('password','incorrect password').isLength({min:5})],
    
    async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    }
    
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)
    
        try{
        await Register.create({
            username: req.body.username,
            password: secPassword,
            email: req.body.email,
        }).then(res.send({success:true}));
    }catch(err){
        console.log(err);
        res.send({success:false});
    }
    });


    router.post("/loginuser", async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const userData = await Register.findOne({ email });
      
          if (!userData) {
            return res.status(401).json({ errors: "Invalid login credentials" });
          }
      
          // Now that you have found a user, you can proceed to check the password.
          const pwdCompare = await bcrypt.compare(password, userData.password);
      
          if (!pwdCompare) {
            return res.status(401).json({ errors: "Invalid login credentials" });
          }
      
          const data = {
            user: {
              id: userData.id
            }
          };
      
          const authToken = jwt.sign(data, jwtSecret);
          return res.json({ success: true, authToken: authToken });
        } catch (err) {
          console.error(err);
          res.status(500).json(err,{ success: false });
        }
      });
      

    module.exports=router;
    