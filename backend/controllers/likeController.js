const Like = require('../models/Like'); 
const Post = require('../models/Post'); 
const User = require('../models/User'); 

exports.like = (req, res, next) => {
  User.findOne({_id: req.body.userId})
  .then(user => {
    Post.update({_id: req.body.postId}, {$push: {likes: user._id}})
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
        message: err
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
  // const like = new Like(req.body)

  // like.save()
  // .then(like => {
  //   res.json({
  //     message: 'Liked',
  //     success: true
  //   })
  // }, err => {
  //   res.json({
  //     message: err,
  //     success: false
  //   })
  // })
  // .catch(error => {
  //   res.json({
  //     message: error,
  //     success: false
  //   })
  // })
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