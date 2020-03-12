const Like = require('../models/Like'); 
const Post = require('../models/Post'); 
const User = require('../models/User'); 

exports.like = (req, res, next) => {
  let canLike = true;
  
  Post.findOne({_id: req.body.postId})
  .then(post => {
    console.log(post.likes)
    console.log(post.likes.indexOf(req.body.userId))
    if(post.likes && post.likes.length) {
      if(post.likes.indexOf(req.body.userId) > -1) {
        canLike = false;
      }
    }

    const updateQuery = (user) => {
      return canLike ? { $push: {likes: user._id} } : { $pop: {likes: -1 } }
    } 

    User.findOne({_id: req.body.userId})
    .then(user => {
      Post.update({_id: req.body.postId}, updateQuery(user))
      .then(post => {
        res.json({
          message: 'Success'
        })
      }, err => {
        res.json({
          message: err
        })
      })
      .catch(error => {
        res.json({
          message: error
        })
      })
    }, err => {
      res.json({
        message: err
      })
    })
    .catch(error => {
      res.json({
        message: error
      })
    })
  })
}

exports.disLike = (req, res, next) => {
  Like.find({$and: [{userId: req.body.userId}, {postId: req.body.postId}] })
  .then(like => {
    Like.delete({_id: like._id})
    .then(response => {
      res.json({
        message: 'Disliked',
        success: true
      })
    }, err => {
      res.json({
        message: err,
        success: false
      })
    }).catch(error =>  {
      res.json({
        message: error,
        success: false
      })
    })
  }, err => {
    res.json({
      message: err,
      success: false
    })
  })
  .catch(error => {
    res.json({
      message: error,
      success: false
    })
  })
}