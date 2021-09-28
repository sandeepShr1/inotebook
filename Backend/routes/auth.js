const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "hero@123";
// Create a user using: POST "/api/auth/createuser" . Doesn't required auth
router.post('/createuser', [
   body('password', 'Password must be at least 6!').isLength({ min: 5 }),
   body('email', 'Enter a valid email!').isEmail(),
   body('name', 'Enter valid name!').isLength({ min: 5 })

], async (req, res) => {
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      // Check whether user exist already!
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ error: "User already exist!" });
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
      console.log(authToken)
      res.json(authToken)
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("Something went wrong!")
   }
})

module.exports = router