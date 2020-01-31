const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).
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
    return res.json({
      message: "Login Successfully",
      user: fetchedUser,
      token: token,
      expiresIn: 3600
    })
  })
} 


exports.createUser = (req, res, next) => {
  console.log("TCL: exports.createUser -> req", req.body)
  bcrypt.hash(req.body.password, 10).then(hashedPassword => {
    const user = new User({
      "name":req.body.name,
      "membershipNumber":req.body.membershipNumber,
      "email":req.body.email,
      "password":hashedPassword,
      "admissionType":req.body.admissionType,
      "feesSubmissionDate": new Date(req.body.feesSubmissionDate),
      "phone":req.body.phone,
      "address":req.body.address
    })

    user.save()
    .then(newUser => {
      res.status(201).json({
        message: 'Register successfully',
        user: newUser
      })
    }).catch(err => {
      res.status(401).json({
        error: err
      })
    })
  })
}