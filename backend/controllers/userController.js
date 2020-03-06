const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).
  then((user) => {
    console.log(user)
    if(!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).
  then((result) => {
    console.log(result)
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
  let session = null;
  let dueDate;
  var d = new Date(req.body.feesSubmissionDate);
  if(req.body.admissionType === 'quarterly') {
    dueDate = d.setMonth((d.getMonth() + 3))
  } else if(req.body.admissionType === 'annually') {
    dueDate = d.setMonth((d.getMonth() + 12))
  } else if(req.body.admissionType === 'monthly') {
    dueDate = d.setMonth((d.getMonth() + 1))
  }
  mongoose.startSession()
  .then(_session => {
    session = _session;
    session.startTransaction();
    const url = req.protocol + '://' + req.get('host');
    User.find({}).sort({_id: -1}).limit(1).then(lastUser => {    
      bcrypt.hash(req.body.password, 10).then(hashedPassword => {
        let userReqBody = {
          "name":req.body.name,
          'userId': req.body.userId,
          "membershipNumber": (lastUser && lastUser.length) ? (lastUser[0].membershipNumber + 1) : 1000,
          "email":req.body.email,
          "password":hashedPassword,
          "admissionType":req.body.admissionType,
          "feesSubmissionDate": new Date(req.body.feesSubmissionDate),
          "phone":req.body.phone,
          "address":req.body.address,
          "dueDate": new Date(dueDate)
        }
        if(req.file) {
          userReqBody['imagePath'] = url + '/images/' + req.file.filename
        }
        else {
          userReqBody['imagePath'] = req.body.imagePath
        }
        const user = new User(userReqBody)
    
        user.save()
        .then(newUser => {
          session.commitTransaction();
          res.status(201).json({
            message: 'Register successfully',
            user: newUser
          })
        }).catch(err => {
          session.abortTransaction();
          res.status(401).json({
            error: err
          })
        })
      })
    })
    .catch(err => {
      session.abortTransaction();
    })
  })  
}

exports.getAllUsers = (req, res, next) => {
  console.log(JSON.parse(req.query.page))
  User.find({}).
  then((users) => {
    // console.log(users.skip((req.body.page - 1) * 10))
    res.json({
      users: users.skip((JSON.parse(req.query.page) - 1) * 10).limit(10),
      totalPages: Math.ceil(users.length/10)
    })
  })
  .catch(err => {
    res.json({
      message: err.response
    })
  })
}

function skip(c){
  return this.filter((x,i)=>{
    if(i>(c-1)) {return true}
  })
}
function limit(c){
  return this.filter((x,i)=>{
    if(i<=(c-1)) {return true}
  })
}
  
Array.prototype.limit=limit;
Array.prototype.skip=skip;

exports.getUser = (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(user => {
    console.log(user)
    res.json({
      message: 'Success',
      user: user
    })
  })
  .catch(err => {
    res.json({message: 'Error', error: err})
  })
}

exports.updateUser = (req, res, next) => {
  const {password, ...rest} = req.body;
  const dataToUpdate = rest
  const url = req.protocol + '://' + req.get('host');

  if(req.file) {
    dataToUpdate['imagePath'] = url + '/images/' + req.file.filename
  }
  else {
    dataToUpdate['imagePath'] = req.body.imagePath
  }
  User.update({_id: req.params.id}, dataToUpdate)
  .then(user => {
    res.json({
      message: 'success',
      user: user
    })
  })
  .catch(err => {
    res.json({
      message: 'error',
      error: err
    })
  })
}

exports.updateProfilePicture = (req, res, next) => {
  var reqBody = req.body;
  const url = req.protocol + '://' + req.get('host');

  if(req.file) {
    reqBody['imagePath'] = url + '/images/' + req.file.filename
  }
  else {
    reqBody['imagePath'] = req.body.imagePath
  }
  // User.find({_id: req.params.id})
  // .then(response => {
  //   if(response.imagePath && response.imagePath.length) {

  //   }
  // })
  User.update({_id: res.params.id}, reqBody)
  .then(response => {
    res.json({
      message: 'Success',
      result: true
    })
  })
  .catch(err => {
    res.json({
      message: err,
      result: false
    })
  })
}

exports.changeUserPassword = (req, res, next) => {
  let fetchedUser;
  User.find({_id: req.body.id})
  .then(user => {
    if(!user) {
      return res.status(401).json({
        message: 'User not found for the id.'
      })
    }

    fetchedUser = user;
  }).
  then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'User not found for the id.'
      })
    }

    bcrypt.compare(req.body.oldPassword, fetchedUser.password).then((password) => {
      if(!password) {
        return res.status(401).json({
          message: 'Password Mismatch'
        })
      }
      
      bcrypt.hash(req.body.newPassword, 10).then(hashedPassword => {
        User.update({_id: req.body.id}, {password: hashedPassword})
        .then(updatedUser => {
          return res.json({
            status: 'Success'
          })
        }, err => {
          return res.json({message: err})
        })
        .catch(err => {
          return res.json({message: err})
        })
      })
    })
  })
}