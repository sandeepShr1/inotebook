const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "hero@123";
// Route 1 Create a user using: POST "/api/auth/createuser" . Doesn't required auth
router.post('/createuser', [
   body('password', 'Password must be at least 6!').isLength({ min: 5 }),
   body('email', 'Enter a valid email!').isEmail(),
   body('name', 'Enter valid name!').isLength({ min: 5 })

], async (req, res) => {
   let success = false
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
   }
   try {
      // Check whether user exist already!
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({success, error: "User already exist!" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      // creating user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      })
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success =true;
      res.json({success, authToken})
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send( "Something went wrong!")
   }
})

// Route 2s Login using: POST "/api/auth/login" . Doesn't required auth
router.post('/login', [
   body('email', 'Enter a valid email!').isEmail(),
   body('password', 'Password cannot be empty!').exists(),
], async (req, res) => {
   // Finds the validation errors in this request and wraps them in an object with handy functions
   let success= false
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
   }

   const { email, password } = req.body;
   try {
      let user = await User.findOne({ email });
      if (!user) {
         
         return res.status(400).json({success,  error: "Please enter valid email!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         
         return res.status(400).json({ success, error: "Please enter valid email/password!" });
      }

      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success, authToken})
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong!")
   }
})

// Route 3 Get logged in User Details using: POST "/api/auth/getuser". Login required!
router.post('/getuser', fetchuser, async (req, res) => {

   try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong!")
   }
})

module.exports = router