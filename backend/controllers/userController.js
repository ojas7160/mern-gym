const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({membershipNumber: req.body.membershipNumber}).
  then((user) => {
    if(!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).
  then((result) => {
    if(!result) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    const token = jwt.sign({membershipNumber: req.body.membershipNumber, _id: fetchedUser._id}, "secretLongEnough", {expiresIn: '1h'})
    return res.status(201).json({
      message: "Success",
      user: fetchedUser,
      token: token,
      expiresIn: 3600
    })
  })
} 

module.exports = userLogin;