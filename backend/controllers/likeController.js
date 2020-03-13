const Like = require('../models/Like'); 
const Post = require('../models/Post'); 
const User = require('../models/User'); 

exports.like = (req, res, next) => {
  let canLike = true;
  // .remove()
  Like.find({$and: [{userId: req.body.userId}, {postId: req.body.postId}] })
  .then(likes => {
    if(likes && likes.length) {
      Like.deleteMany({$and: [{userId: req.body.userId}, {postId: req.body.postId}] }) 
      .then(deletedLikes => {
        res.json({
          message: 'likes removed',
          added: false,
          success: true
        })
      })
    } else {
      const like = new Like({postId: req.body.postId, userId: req.body.userId})    
      like.save()
      .then(like => {
        res.json({
          success: true,
          message: 'liked',
          added: true,
          like: like
        })
      }, err => {
        res.json({
          success: false,
          added: false,
          error: err
        })
      })
      .catch(error => {
        res.json({
          success: false,
          added: false,
          error: error
        })
      })
    }
  })
}